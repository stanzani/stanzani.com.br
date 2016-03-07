import riot from 'riot'
import * as redux from 'redux'
import thunk,{middleware} from 'redux-thunk'
import './tags/todo-app.tag'

let reducer = (state,action) => {
  switch (action.type) {
    case 'TASKS_LOADED':
      return Object.assign({}, state, {tasks:action.data});
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, {isLoading:action.data});
    case 'TASK_ADDED':
      return Object.assign({}, state, {tasks:state.tasks.concat(action.data)});
    case 'TASK_COMPLETION_CHANGED':
      let taskIndex = state.tasks.findIndex( t => t.id == action.data.id );
      // let newTasks = state.tasks.slice(0,taskIndex)
      //                           .concat(Object.assign({}, state.tasks[taskIndex],{isComplete:action.data.isComplete}))
      //                           .concat(state.tasks.slice(taskIndex+1));
      let newTasks = [
        ...state.tasks.slice(0,taskIndex),
        Object.assign({}, state.tasks[taskIndex],{isComplete:action.data.isComplete}),
        ...state.tasks.slice(taskIndex+1)
      ];
      return Object.assign({}, state, {tasks:newTasks});
    case 'SHOW_ERROR':
      return Object.assign({}, state, {isError:true, errorMessage:action.data});
    case 'HIDE_ERROR':
      return Object.assign({}, state, {isError:false, errorMessage:''});
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
