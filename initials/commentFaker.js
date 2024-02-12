const roles = require('./comments');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db('foodino');
  dbo.collection("comments").insertMany(roles, { ordered: true }, function(err, result) {
    if (err) throw err;
    db.close();
  });
});

