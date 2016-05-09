import riot from 'riot';
import * as redux from 'redux';
import thunk,{middleware} from 'redux-thunk';
import './assets/css/main.scss';

const appMiddleware = redux.compose(
  redux.applyMiddleware(thunk)
)(redux.createStore);


const routes = (path, second, third) => {
  let page = null;
  if (page) {
     page.unmount(true);
   }

  switch (path) {
    case 'blog':
      var paginate = 0;
      var post = null;
      if(second=='post'&& third){
        path = 'post';
        post = third;
      }else if(parseInt(second)>0){
        paginate = parseInt(second);
      }
      require.ensure(['./tags/blog.tag'], (require) => {
        let reducer = require('./reducers/blog.js');
        let reduxStore = appMiddleware(reducer);
        require('./tags/blog.tag');
        page = riot.mount('app', path, {store:reduxStore, paginate:paginate, post:post});
      }, 'blog');
      break;
    case '':
    default:
      require.ensure(['./tags/home.tag'], (require) => {
        let reducer = require('./reducers/home.js');
        let reduxStore = appMiddleware(reducer);
        require('./tags/home.tag');
        page = riot.mount('app', 'home', {store:reduxStore});
      }, 'home');
  }
};

riot.route.stop(); // clear all the old router callbacks
riot.route.start(); // start again
riot.route(routes);
riot.route.exec(routes);

function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

// function getPath(pathName, cb) {
//     require.ensure([], require => cb(require(`./tags/${pathName}.tag`).default));
// }

//     require.ensure([], function(require) {
//       require('./tags/home.tag');
//         // ...
//     }, "home");
//     break;
//   case 'blog':
//       // console.log(path);
//       // let reducer = require(`./reducers/${path}.js`);
//       // let reduxStore = appMiddleware(reducer);
//       // page = riot.mount('app', 'home', {store:reduxStore});
//
//     break;
//   default:
//     page = riot.mount(path);
//   }
// };
