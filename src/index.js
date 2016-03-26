import riot from 'riot';
import * as redux from 'redux';
import thunk,{middleware} from 'redux-thunk';
import './tags/app.tag';
import './assets/css/main.scss';

let reducer = (state,action) => {
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
      state = {links:[]};
      return state;
  }
};
// let reduxStore = redux.createStore(reducer);

let createStoreWhitMiddleware = redux.compose(
  redux.applyMiddleware(thunk)
)(redux.createStore);
let reduxStore = createStoreWhitMiddleware(reducer);

document.addEventListener('DOMContentLoaded',
  () => riot.mount('app', {store:reduxStore})
);
