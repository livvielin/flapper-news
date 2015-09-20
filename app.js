var app = angular.module('flapperNews', []);

app.factory('posts', [function () {
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', function ($scope, posts) {
    $scope.test = 'Hello world!';

    $scope.posts = posts.posts;

    $scope.addPost = function () {
      // prevents user from submitting a blank post
      if (!$scope.title || $scope.title === '') {
        return;
      }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0});
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function (post) {
      post.upvotes += 1;
    };
});
