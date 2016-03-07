import fetch from 'isomorphic-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}

function parseJSON(response) {
  return response.json();
}

export function loadTasks(){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    fetch('http://localhost:3000/tasks')
      .then(checkStatus)
      .then(parseJSON)
      .then( data => dispatch(tasksLoaded(data)) )
      .catch( error => dispatch(tempErrorMessage(`Bad response from server: ${error}`)) );
    dispatch(toggleLoading(false));
  };
}

function tasksLoaded(tasks){
  return {type:'TASKS_LOADED', data:tasks};
}

function toggleLoading(isLoading){
  return {type:'TOGGLE_LOADING', data:isLoading};

}

export function addTask(newTask){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    fetch('http://localhost:3000/tasks',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:newTask})
    }).then(checkStatus)
      .then(parseJSON)
      .then( data => dispatch(newTaskAdded(data.id, data.name)) )
      .catch( error => dispatch(tempErrorMessage(`Bad response from server: ${error}`)) );
    dispatch(toggleLoading(false));
  };
}

function newTaskAdded(id, name){
  return {type:'TASK_ADDED', data:{id:id, name:name}};
}

export function toggleComplete(id, isComplete){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    fetch(`http://localhost:3000/tasks/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isComplete:isComplete})
    }).then(checkStatus)
      .then(dispatch(completeChanged(id,isComplete)))
      .catch( error => {
        dispatch(completeChanged(id,!isComplete));
        dispatch(tempErrorMessage(`Bad response from server: ${error}`));
      });
    dispatch(toggleLoading(false));
  };
}

function completeChanged(id, isComplete){
  return {type:'TASK_COMPLETION_CHANGED', data:{id:id, isComplete:isComplete}};
}

function showError(message){
  return {type:'SHOW_ERROR', data:message};
}

export function hideError(){
  return {type:'HIDE_ERROR'};
}

function tempErrorMessage(message){
  return (dispatch, getState) => {
    dispatch(showError(message));
    setTimeout( ( t => dispatch(hideError()) ), 1000);
  };
}
