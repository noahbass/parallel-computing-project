import sparknlp
from pyspark import SparkContext, SparkConf
from pyspark.sql import SQLContext
from pyspark.sql.functions import udf, col
from pyspark.sql.types import IntegerType, StringType
from sparknlp.pretrained import PretrainedPipeline

# 1. Setup
sparknlp.start()
conf = SparkConf().setAppName('parallel-project')
sc = SparkContext.getOrCreate()
spark = SQLContext(sc)

pipeline = PretrainedPipeline('analyze_sentiment', 'en')


# 2. Data Cleansing
# read in data to a DataFrame
comments = spark.read.json('RC_2019-02-28-one-day')
# dummy_data = [["Hello, world!", "/r/soccer"], ["Wow. Simply wow. What an unbelievable pass, inch perfect.", "/r/nba"]]
# comments = sc.parallelize(dummy_data).toDF(['body', 'subreddit'])
comments.printSchema

# Rename 'body' to 'text' for spark-nlp
comments = comments.withColumnRenamed('body', 'text')

# keep only the columns we're interested in
commentsCleaned = comments.select('subreddit', 'text')

# Filter out bad comment data
commentsCleaned = commentsCleaned.filter(commentsCleaned.text != '[deleted]')\
                                 .filter(commentsCleaned.text != '[removed]')\
                                 .filter(commentsCleaned.text != '') # filter empty comments

print('Cleaned comments')

# Convert comment text to use ascii text only (this drops some characters from user comments, including international characters)
def ascii_user_text(text):
    return text.encode('ascii', 'ignore').decode('ascii')

udf_ascii_user_text = udf(ascii_user_text, StringType())
commentsCleaned = commentsCleaned.withColumn('text', udf_ascii_user_text(col('text')))

commentsCleaned.show()

# TODO: reddit comments can be written in markdown, should we convert the markdown to plain text before analyzing?

# TODO: our pipeline is trained for the english language. find a way to filter out comments that are not in english?

# TODO: fix that weird encoding error https://stackoverflow.com/questions/39662384/pyspark-unicodeencodeerror-ascii-codec-cant-encode-character


# 3. Perform Analysis in Parallel
result = pipeline.transform(commentsCleaned)
result = result.select('subreddit', 'sentiment')

# UDF (user defined function) to get sentiment summary from the full sentiment Array (returns 1, 0, or -1)
def sentiment_sum(in_array):
    if in_array != None and len(in_array) != 0:
        if len(in_array) == 0:
            # only one sentance exists, so take result from first sentance
            result = in_array[0]['result']
            
            if result == 'na':
                return None
            elif result == 'positive':
                return 1
            else:
                return -1
        else:
            # sum results from all sentances (sum > 0 == positive, sum < 0 == negative, sum == 0 == na)
            sentiment_sum = 0
            for sentance in in_array:
                result = sentance['result']
            
                if result == 'positive':
                    sentiment_sum += 1
                elif result == 'negative':
                    sentiment_sum -= 1
            if sentiment_sum == 0:
                return None
            elif sentiment_sum > 0:
                return 1
            else:
                return -1
    return None
# Modify the sentiment column to be an integer type of either 1, 0, or -1
udf_sentiment_sum = udf(sentiment_sum, IntegerType())
result = result.withColumn('sentiment', udf_sentiment_sum(col('sentiment')))

print('Ran UDF')

# If analysis could not be performed on a row (sentiment column marked as None/Null), drop that row
result = result.filter(col('sentiment').isNotNull())

result.printSchema()
# result.show()


# 4. Write to a single csv file
# Analysis has been done in parallel. Repartition (so we can write to one file), then write the DataFrame to disk.
# Result is written inside of the `out.csv/` directory.
# result.repartition(1).write.option('header', 'true').csv('out.csv', mode='overwrite')
