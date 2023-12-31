var qaData =

[
  {
    "label": "System Design",
    "title": "How to Design Tinyurl",
    "description": "",
    "subsections": [
      {
        "index": "0",
        "question": "Why do we need URL shortening",
        "min_words": "50",
        "question_details": "What is tinyurl? Specify the use case and top level basic requirements.",
        "ideal_answer": "Shortened aliases, known as \"short links,\" redirect users to the original URL, saving space and reducing the likelihood of mistyping. For instance, the TinyURL shortening of a lengthy link results in a URL nearly one-third of the original size. URL shortening optimizes links for various devices, enables tracking for audience and campaign analysis, and conceals affiliated original URLs. Exploring the options of services like TinyURL enhances understanding of this chapter on URL shortening.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "1",
        "question": "Requirements and Goals of the System for tinyurl system",
        "min_words": "50",
        "question_details": "Can you expland on short links, redirection, expiry, latency, non guessable, security, TTL, API",
        "ideal_answer": "The URL shortening system must generate unique short links for given URLs, redirect users to the original link, and allow custom short links. Links should expire, with adjustable time spans. Non-functional requirements include high availability for uninterrupted URL redirection and real-time redirection with minimal latency. Shortened links must be non-guessable. Extended features encompass analytics on redirection occurrences and accessibility through REST APIs for inter-service communication.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "2",
        "question": "Capacity Estimation and Constraints for tiny url system",
        "min_words": "50",
        "question_details": "Can you estimate the traffic, storage, bandwidth, memory and other numbers",
        "ideal_answer": "\nOur read-heavy system anticipates a 100:1 ratio between redirection requests and new URL shortenings, yielding an estimated 50 billion redirections per month for 500 million new URL shortenings. For a write QPS (Queries Per Second) of approximately 200 URLs/s and a 100:1 read/write ratio, the redirection QPS is expected to be 20K/s. With a storage duration of 5 years for each of the 30 billion anticipated objects (500 bytes each), we require 15TB of storage. Bandwidth estimates suggest incoming data at 100 KB/s for write requests and outgoing data at ~10 MB/s for read requests. To cache 20% of hot URLs, necessitating 170GB of memory, actual usage will be less due to duplicate requests.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "3",
        "question": " System APIs for tinyurl",
        "min_words": "50",
        "question_details": "What are the apis for the system that you put like to design",
        "ideal_answer": "The service can offer SOAP or REST APIs, defining functionalities for creating and deleting URLs. Parameters include api_dev_key for throttling users, original_url for the URL to shorten, custom_alias for an optional custom key, user_name for an optional user name, and expire_date for an optional expiration date. A successful insertion returns the shortened URL; otherwise, it returns an error code. Deletion is confirmed with 'URL Removed' on success. To prevent abuse, users are limited based on their api_dev_key with restrictions on the number of URL creations and redirections within specified time periods.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "4",
        "question": "DataBase Design for tinyurl",
        "min_words": "50",
        "question_details": "Can you expland on SQL vs NoSQL, which one can be used and why?",
        "ideal_answer": "A few observations about the nature of the data we will store:\n1. We need to store billions of records.\n2. Each object we store is small (less than 1K).\n17\n3. There are no relationships between records\u2014other than storing which user \ncreated a URL.\n4. Our service is read-heavy.\nDatabase Schema:\nWe would need two tables: one for storing information about the URL mappings, \nand one for the user\u2019s data who created the short link.\nWhat kind of database should we use? Since we anticipate storing billions of \nrows, and we don\u2019t need to use relationships between objects \u2013 a NoSQL key-value \nstore like DynamoDB, Cassandra or Riak is a better choice. A NoSQL choice would \nalso be easier to scale. Please see SQL vs NoSQL for more details.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "5",
        "question": "encoding url using base64 for tinyurl keys",
        "min_words": "100",
        "question_details": "How will you do the encoding for tinyurls? Which one to use in counter, hashing, offline genertion of keys or other schemes and pros and cons of each.",
        "ideal_answer": "We can compute a unique hash (e.g., MD5 or SHA256, etc.) of the given URL. The \nhash can then be encoded for displaying. This encoding could be base36 ([a-z ,0-9]) \nor base62 ([A-Z, a-z, 0-9]) and if we add \u2018-\u2019 and \u2018.\u2019 we can use base64 encoding. A \nreasonable question would be, what should be the length of the short key? 6, 8 or 10 \ncharacters.\nUsing base64 encoding, a 6 letter long key would result in 64^6 = ~68.7 billion \npossible strings\n18\nUsing base64 encoding, an 8 letter long key would result in 64^8 = ~281 trillion \npossible strings\nWith 68.7B unique strings, let\u2019s assume six letter keys would suffice for our system.\nIf we use the MD5 algorithm as our hash function, it\u2019ll produce a 128-bit hash value. \nAfter base64 encoding, we\u2019ll get a string having more than 21 characters (since each \nbase64 character encodes 6 bits of the hash value). Since we only have space for 8 \ncharacters per short key, how will we choose our key then? We can take the first 6 \n(or 8) letters for the key. This could result in key duplication though, upon which we \ncan choose some other characters out of the encoding string or swap some \ncharacters.\nWhat are different issues with our solution? We have the following couple of \nproblems with our encoding scheme:\n1. If multiple users enter the same URL, they can get the same shortened URL, \nwhich is not acceptable.\n2. What if parts of the URL are URL-encoded? \ne.g., http://www.educative.io/distributed.php?id=design, \nand http://www.educative.io/distributed.php%3Fid%3Ddesign are identical \nexcept for the URL encoding.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "6",
        "question": "Generating keys offline for tinyurl",
        "min_words": "100",
        "question_details": "Explain the details about the offline key generations. What happens to url which are already been shortened?",
        "ideal_answer": "We can have a standalone Key Generation Service (KGS) that generates random six \nletter strings beforehand and stores them in a database (let\u2019s call it key-DB). \nWhenever we want to shorten a URL, we will just take one of the already-generated \nkeys and use it. This approach will make things quite simple and fast. Not only are \nwe not encoding the URL, but we won\u2019t have to worry about duplications or \ncollisions. KGS will make sure all the keys inserted into key-DB are unique\nCan concurrency cause problems? As soon as a key is used, it should be marked \nin the database to ensure it doesn\u2019t get used again. If there are multiple servers \nreading keys concurrently, we might get a scenario where two or more servers try to \nread the same key from the database. How can we solve this concurrency problem?\nServers can use KGS to read/mark keys in the database. KGS can use two tables to \nstore keys: one for keys that are not used yet, and one for all the used keys. As soon \nas KGS gives keys to one of the servers, it can move them to the used keys table. KGS \ncan always keep some keys in memory so that it can quickly provide them whenever \na server needs them.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "7",
        "question": "how will do  Data Partitioning and Replication for tinyurl",
        "min_words": "100",
        "question_details": "How will you manage big data across geogrphic areas? Explain with concepts on paritioning and replication for tinyurl.",
        "ideal_answer": "a. Range Based Partitioning: We can store URLs in separate partitions based on \nthe first letter of the URL or the hash key. Hence we save all the URLs starting with \nletter \u2018A\u2019 in one partition, save those that start with letter \u2018B\u2019 in another partition and \nso on. This approach is called range-based partitioning. We can even combine \ncertain less frequently occurring letters into one database partition. We should come \nup with a static partitioning scheme so that we can always store/find a file in a \npredictable manner.\nThe main problem with this approach is that it can lead to unbalanced servers. For \nexample: we decide to put all URLs starting with letter \u2018E\u2019 into a DB partition, but \nlater we realize that we have too many URLs that start with letter \u2018E\u2019.\nb. Hash-Based Partitioning: In this scheme, we take a hash of the object we are \nstoring. We then calculate which partition to use based upon the hash. In our case, \nwe can take the hash of the \u2018key\u2019 or the actual URL to determine the partition in \nwhich we store the data object.\nOur hashing function will randomly distribute URLs into different partitions (e.g., \nour hashing function can always map any key to a number between [1\u2026256]), and \nthis number would represent the partition in which we store our object.\nThis approach can still lead to overloaded partitions, which can be solved by \nusing Consistent Hashing.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "8",
        "question": "How will you do caching for tinyurl",
        "min_words": "100",
        "question_details": "How will cachinng work for tinyurl? ",
        "ideal_answer": "We can cache URLs that are frequently accessed. We can use some off-the-shelf \nsolution like Memcache, which can store full URLs with their respective hashes. The \napplication servers, before hitting backend storage, can quickly check if the cache \nhas the desired URL.\nHow much cache should we have? We can start with 20% of daily traffic and, \nbased on clients\u2019 usage pattern, we can adjust how many cache servers we need. As \nestimated above, we need 170GB memory to cache 20% of daily traffic. Since a \nmodern-day server can have 256GB memory, we can easily fit all the cache into one \n24\nmachine. Alternatively, we can use a couple of smaller servers to store all these hot \nURLs.\nWhich cache eviction policy would best fit our needs? When the cache is full, \nand we want to replace a link with a newer/hotter URL, how would we choose? Least \nRecently Used (LRU) can be a reasonable policy for our system. Under this policy, \nwe discard the least recently used URL first. We can use a Linked Hash Map or a \nsimilar data structure to store our URLs and Hashes, which will also keep track of \nthe URLs that have been accessed recently.\nTo further increase the efficiency, we can replicate our caching servers to distribute \nload between them.\nHow can each cache replica be updated? Whenever there is a cache miss, our \nservers would be hitting a backend database. Whenever this happens, we can update \nthe cache and pass the new entry to all the cache replicas. Each replica can update \ntheir cache by adding the new entry. If a replica already has that entry, it can simply \nignore it",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      },
      {
        "index": "9",
        "question": "What statistics for ech tinyurl will you keep",
        "min_words": "100",
        "question_details": "What kind of statistics will you keep, in form of number of hit, browsers etc?",
        "ideal_answer": "How many times a short URL has been used, what were user locations, etc.? How \nwould we store these statistics? If it is part of a DB row that gets updated on each \nview, what will happen when a popular URL is slammed with a large number of \nconcurrent requests?\nSome statistics worth tracking: country of the visitor, date and time of access, web \npage that refers the click, browser, or platform from where the page was accessed.",
        "grading": "grade on scale of 1-10",
        "request": "Analyze the reponse. Give three seperate sections. one on what is good, second on what needs to be improved and third Write a good answer in 100 words."
      }
    ]
  }
]
