var app = angular.module('flapperNews', []);

app.factory('posts', function ($http) {

  var getPosts = function () {
    return $http({
      method: 'GET',
      url: '/flapper'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addPost = function (post) {
    return $http({
      method: 'POST',
      url: '/flapper',
      data: post
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var incrementUpvotes = function (post) {
    return $http({
      method: 'PUT',
      url: '/flapper/' + post._id,
      data: post
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var removePost = function (post) {
    return $http({
      method: 'DELETE',
      url: '/flapper/' + post._id,
      data: post
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getPosts: getPosts,
    addPost: addPost,
    incrementUpvotes: incrementUpvotes,
    removePost: removePost
  };
});

app.controller('MainCtrl', function ($scope, posts) {

  $scope.data = {};
  // $scope.posts = posts.posts.posts;

  // call getPosts function when controller starts up
  $scope.getPosts = function () {
    posts.getPosts()
    .then(function (comments) {
      $scope.data.posts = comments;
    })
    .catch(function (error) {
      console.error(error);
    });
  };
  $scope.getPosts();

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
    })
    .then(function () {
      // reset input boxes
      $scope.title = '';
      $scope.link = '';
      // get posts so that new post will be shown
      $scope.getPosts();
    });
  };

  $scope.incrementUpvotes = function (post) {
    posts.incrementUpvotes(post)
    .then(function () {
      // get posts so that new upvotes value will be shown
      // probably inefficient once there are a lot of posts
      $scope.getPosts();
    });
  };

  $scope.removePost = function (post) {
    posts.removePost(post)
    .then(function () {
      $scope.getPosts();
    });
  };

});
