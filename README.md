# elasticsearch-email

This is a port of [@oliver00f's excellent tutorial](https://github.com/oliver006/elasticsearch-gmail) from
python to Node.js.

Why? Because I have been wanting to set up elasticsearch for a project of mine, but had
no experience thus far. This was simply a quick endeavor to get more familiar with
elasticsearch. It ended up being delightfully short and easy to read code, thanks to
streams.

* download an mbox file (you can download your gmail inbox or find one by searching "filetype:mbox" in a search engine)
* save that file as `dat/emails.mbox`
* install java
* install elasticsearch
* start elasticsearch and make sure it's running at [http://localhost:9200](http://localhost:9200)
* npm install
* node index.js

now you can query elasticsearch.
