import riot from 'riot';
import * as redux from 'redux';
import './tags/sample.tag';

let reducer = (state={title:'Default title'},action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return Object.assign({},state,{title:action.data})
    default:
      return state
  }
};
let reduxStore = redux.createStore(reducer);

document.addEventListener('DOMContentLoaded',
  () => riot.mount('sample', {store:reduxStore})
);
