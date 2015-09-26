var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/flapper';
// Connect to mongo database
mongoose.connect(mongoURI);

// Define schemas
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  link: String,
  upvotes: Number
});

// Use schema to register mongooose model with mongoDB
// mongoose.model('Comment', CommentSchema);
// var Wiki = mongoose.model('Comment');
var Comment = mongoose.model('Comment', CommentSchema);

var app = express();
// Serve up client files
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// // ROUTES

// // Set up GET and POST functions
var getComment = function (req, res) {
  // Set up headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control');

  if ('OPTIONS' === req.method) {
    res.send(203, 'OK');
  }

  console.log('mongodbServer getComment');

  Comment.find(function (err, data) {
    res.send(data);
  });
};

var postComment = function (req, res) {
  // Set up headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control');

  if ('OPTIONS' === req.method) {
    res.send(203, 'OK');
  }

  console.log('mongoDBServer postComment');

  // Create new comment model, fill it, and save it to mongoDB
  var comment = new Comment(req.body);
  // comment.title = req.body.title;
  // comment.link = req.body.link;
  // comment.upvotes = req.body.upvotes;
  comment.save(function (err, result) {
    if (err) {
      console.error(err);
    }
    res.send(result);
  });

};

// Create route for GET request
app.get('/flapper', getComment);

// Create route for POST request
app.post('/flapper', postComment);

// Set up port
var port = 8080;
// Have app listen on port specified above
app.listen(port);
console.log('Listening on port ' + port);
