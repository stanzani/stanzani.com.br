import riot from 'riot';
import * as redux from 'redux';
import thunk,{middleware} from 'redux-thunk';
import './tags/todo-app.tag';

let reducer = (state,action) => {
  switch (action.type) {
    case 'TASKS_LOADED':
      return Object.assign({}, state, {tasks:action.data});
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, {isLoading:action.data});
    case 'TASK_ADDED':
      return Object.assign({}, state, {tasks:state.tasks.concat(action.data)});
    default:
      state = {tasks:[]};
      return state;
  }
};
// let reduxStore = redux.createStore(reducer);

let createStoreWhitMiddleware = redux.compose(
  redux.applyMiddleware(thunk)
)(redux.createStore);
let reduxStore = createStoreWhitMiddleware(reducer);

document.addEventListener('DOMContentLoaded',
  () => riot.mount('todo-app', {store:reduxStore})
);
