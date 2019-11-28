# parallel-computing-project (until we come up with a better name)

## Front-End

See [front-end-visualization/README.md](front-end-visualization/README.md) for getting started with the front-end (`yarn start`).

Useful commands
---

Requesting time on the Owens cluster cli: `qsub -I -l nodes=1:ppn=1 -l walltime=00:20:00` (1 node for 20 minutes)

Installing Spark NLP on OSC: `pip install --user --ignore-installed spark-nlp==2.2.2`

Running python code with `spark-submit` on the CLI (`module load spark`): [https://www.osc.edu/resources/available_software/software_list/spark](https://www.osc.edu/resources/available_software/software_list/spark)

Grabbing some reddit comment data: `wget https://files.pushshift.io/reddit/comments/daily/RC_2018-01-01.xz`

Decompressing `.xz` file: `unxz filename.xz` (Note that Spark can actually read from compressed data, so decompressing the data before importing is actually not needed)

Putting data into Hadoop: `hadoop fs -put <path_to_file_locally> <path_to_hadoop_destination_directory>`

Reading in json data to PySpark (pulls in data as a Spark DataFrame): `comments = spark.read.json("reddit-data/RC_2018-01-01")`

Print DataFrame schema: `comments.printSchema`

Peeking at a few lines of data: `comments.take(3)`

Counting how many lines of data there are: `comments.count()`

