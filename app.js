var app = angular.module('flapperNews', ['ui-router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('/home');

});

app.factory('posts', function () {
  var posts = {
    posts: []
  };
  return posts;
});

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
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function (post) {
      post.upvotes += 1;
    };

    return {
      addPost: addPost,
      incrementUpvotes: incrementUpvotes
    };
});

app.controller('PostsCtrl', function ($scope, $stateParams, posts) {
  $scope.post = posts.posts[$stateParams.id];
});
