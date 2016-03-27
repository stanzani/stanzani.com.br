import riot from 'riot';
import * as redux from 'redux';
import thunk,{middleware} from 'redux-thunk';
import './tags/home.tag';
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

const appMiddleware = redux.compose(
  redux.applyMiddleware(thunk)
)(redux.createStore);
const reduxStore = appMiddleware(reducer);

// document.addEventListener('DOMContentLoaded',
//   () => riot.mount('app', {store:reduxStore})
// );

const routes = path => {
  let page = null;
  if (page) {
     page.unmount(true);
   }

  switch (path) {
    case '':
      page = riot.mount('app', 'home', {store:reduxStore});
      break;
    case 'blog':

    require.ensure(['./tags/blog.tag'], (require) => {
      require('./tags/blog.tag');
      page = riot.mount('app', 'blog');
    }, 'blog');
      break;
    default:
      page = riot.mount(path);
  }
};

riot.route.stop(); // clear all the old router callbacks
riot.route.start(); // start again
riot.route(routes);
riot.route.exec(routes);
