# pyspark

# read in data to a DataFrame
comments = spark.read.json("reddit-data/RC_2018-01-01")

# keep only the columns we're interested in
commentsCleaned = comments.select('subreddit', 'body', 'created_utc')

comments.take(2) # or comments.show(2)

comments.count()

