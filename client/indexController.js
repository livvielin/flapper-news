angular.module('flapperNews', ['ui.router'])
  .controller('indexController', indexController);

indexController.$inject = ['postsService'];

function indexController (postsService) {
  var vm = this;
  vm.test = 'Hello world';

  vm.getPosts = postsService.getPosts;
  vm.addPost = postsService.addPost(vm.title, vm.link);
  vm.incrementUpvotesForPost = postsService.incrementUpvotesForPost;
}