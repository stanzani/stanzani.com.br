module.exports = function (state,action) {
  switch (action.type) {
    case 'POSTS_LOADED':
      return Object.assign({}, state, {posts:action.data});
    case 'POSTS_MORE_LOADED':
      Array.prototype.push.apply(state.posts.blogPosts,action.data.blogPosts);
      return Object.assign({}, state, {page: state.page + 1});
    case 'UPDATE_PAGE_STATE':
      return Object.assign({}, state, {page:action.data+1});
    case 'PROFILE_LOADED':
      return Object.assign({}, state, {profile:action.data});
    case 'POST_LOADED':
      return Object.assign({}, state, {post:action.data});
    case 'ERROR_POST_PAGE':
      return Object.assign({}, state, {postError:action.data});
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, {isLoading:action.data});
    case 'TOGGLE_PROFILE_LOADING':
      return Object.assign({}, state, {isProfileLoading:action.data});
    case 'SHOW_ERROR':
      return Object.assign({}, state, {isError:true, errorMessage:action.data});
    case 'HIDE_ERROR':
      return Object.assign({}, state, {isError:false, errorMessage:''});
    case 'HIDE_MORE_BTN':
      return Object.assign({}, state, {btnMorePosts:false});
    default:
      state = {page: 0, posts:{}, profile:{}, btnMorePosts:true};
      return state;
  }
};
