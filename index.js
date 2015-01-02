var fs = require('fs');
var request = require('request');
var mboxparser = require('mbox-stream')
var stringify = require('streaming-json-stringify');
var BATCH_SIZE = 500;

var esURL = 'http://localhost:9200/email';
var SCHEMAPATH = './schema.json';

function deleteIndex() {
  request.del(esURL);
}

function createIndex() {
  fs.createReadStream(SCHEMAPATH)
    .pipe(stringify())
    .pipe(request.put(esURL));
}

function uploadBatch(uploadData) {
  var cmd = {'index': {'_index': 'gmail', '_type': 'email'}};
  var uploadDataTxt = '';
  uploadData.forEach(function (msg) {
    cmd.index['_id'] = msg['message-id'];
    uploadDataTxt += JSON.stringify(cmd) +'\n';
    uploadDataTxt += JSON.stringify(msg) +'\n';
  });

  request.post({
    url: 'http://localhost:9200/_bulk',
    body: uploadDataTxt
  }, function(err, response, body) {
       if (err) console.error(err);
     });
}

function loadFromFile(filename) {
  deleteIndex()
  createIndex()

  var currentUploads = [];
  var stream = fs.createReadStream(filename).pipe(mboxparser());

  stream.on('data', function(msg) {
    if (currentUploads.length === BATCH_SIZE) {
      uploadBatch(currentUploads);
      currentUploads = [];
    } else {
      currentUploads.push(msg);
    }
  });

  stream.on('end', function() {
    uploadBatch(currentUploads);
    console.log('done uploading emails');
  })
}

loadFromFile('dat/allgmail.mbox');