import riot from 'riot';
import * as redux from 'redux';
import thunk,{middleware} from 'redux-thunk';
import './assets/css/main.scss';

const appMiddleware = redux.compose(
  redux.applyMiddleware(thunk)
)(redux.createStore);

if(typeof ga != 'function'){
   window.ga = function(a,b,c){
     console.log("Implement Google analytics function inside index.html");
   };
}

const routes = (path, second, third) => {
  let page = null;
  if (page) {
     page.unmount(true);
   }

  switch (path) {
    case 'blog':
      var paginate = 0;
      var post = null;
      ga('set', 'page', '/'+path);
      if(second=='post'&& third){
        path = 'post';
        post = third;
        ga('set', 'page', '/'+path+'/post/'+post);
      }else if(parseInt(second)>0){
        paginate = parseInt(second);
        ga('set', 'page', '/'+path+'/'+paginate);
      }
      require.ensure(['./tags/blog.tag'], (require) => {
        let reducer = require('./reducers/blog.js');
        let reduxStore = appMiddleware(reducer);
        require('./tags/blog.tag');
        page = riot.mount('app', path, {store:reduxStore, paginate:paginate, post:post});
      }, 'blog');
      break;
    case '':
      require.ensure(['./tags/home.tag'], (require) => {
        let reducer = require('./reducers/home.js');
        let reduxStore = appMiddleware(reducer);
        require('./tags/home.tag');
        page = riot.mount('app', 'home', {store:reduxStore});
      }, 'home');
      ga('set', 'page', '/');
      break;
    default:
      window.location.href = "/404";
  }
};

riot.route.base('/'); //base hash bang
riot.route.stop(); // clear all the old router callbacks
riot.route.start(); // start again
riot.route(routes);
riot.route.exec(routes);


ga('send', 'pageview');
