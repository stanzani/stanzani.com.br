module.exports = function(state,action) {
  switch (action.type) {
    case 'LINKS_LOADED':
      return Object.assign({}, state, {links:action.data});
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, {isLoading:action.data});
    case 'TOGGLE_LOADING_CUBIE':
      return Object.assign({}, state, {isLoadingCubie:action.data});
    case 'SHOW_ERROR':
      return Object.assign({}, state, {isError:true, errorMessage:action.data});
    case 'HIDE_ERROR':
      return Object.assign({}, state, {isError:false, errorMessage:''});
    case 'CUBIE_STATUS':
      return Object.assign({}, state, {cubieStatus:action.data});
    default:
      state = {links:[], isLoading: false};
      return state;
  }
};
