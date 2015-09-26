var app = angular.module('flapperNews', []);

app.factory('posts', function () {
  var posts = {
    posts: []
  };

  var addPost = function (post) {
    posts.posts.push(post);
  };

  var incrementUpvotes = function (post) {
    post.upvotes += 1;
  };

  return {
    posts: posts,
    addPost: addPost,
    incrementUpvotes: incrementUpvotes
  };
});

app.controller('MainCtrl', function ($scope, posts) {

    $scope.posts = posts.posts.posts;

    $scope.addPost = function () {
      // prevents user from submitting a blank post
      if (!$scope.title || $scope.title === '') {
        return;
      }
      // call factory post function
      posts.addPost({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      });
      // reset input boxes
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function (post) {
      posts.incrementUpvotes(post);
    };
});
