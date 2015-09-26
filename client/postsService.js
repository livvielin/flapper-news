angular.module('flapperNews')
.factory('postsService', postsService);

function postsService() {
    var serv = this;
    var posts = [
      {title: 'post 1', upvotes: 5},
      {title: 'post 2', upvotes: 2},
      {title: 'post 3', upvotes: 15},
      {title: 'post 4', upvotes: 9},
      {title: 'post 5', upvotes: 4}
    ];
    function getPosts() {
        return posts;
    }
    function addPost(title, link) {
        if(!title || title === '') { return; }
        posts.push({
            title: vm.title,
            link: vm.link,
            upvotes: 0
        });
        vm.title = '';
        vm.link = '';
    }
    function incrementUpvotesForPost(post) {
        post.upvotes ++;
    }
    return {
        getPosts: getPosts,
        addPost: addPost,
        incrementUpvotesForPost: incrementUpvotesForPost
    };
}