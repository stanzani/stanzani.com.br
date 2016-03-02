export function loadTasks(){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/tasks', true);
    request.onload = e => {
      if (request.status >= 200 && request.status < 400 ){
        var data = JSON.parse(request.responseText);
        dispatch(tasksLoaded(data));
      }
      dispatch(toggleLoading(false));
    };
    //setTimeout(()=>request.send(),3000);
    request.send();
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
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/tasks', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = e => {
      if (request.status >= 200 && request.status < 400 ){
        let data = JSON.parse(request.responseText);
        dispatch(newTaskAdded(data.id, data.name));
      }
      dispatch(toggleLoading(false));
    };
    request.send(JSON.stringify({name:newTask}));
  };
}

function newTaskAdded(id, name){
  return {type:'TASK_ADDED', data:{id:id, name:name}};
}

export function toggleComplete(id, isComplete){
  return (dispatch, getState) => {
    let request = new XMLHttpRequest();
    request.open('PATCH', `http://localhost:3000/tasks/${id}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = e => {
      if (request.status >= 200 && request.status < 400){
        dispatch(completeChanged(id,isComplete));
      }else {
        dispatch(completeChanged(id,!isComplete));
        dispatch(tempErrorMessage("API Error"));
      }
    };
    request.onerror = e => {
      dispatch(completeChanged(id,!isComplete));
      dispatch(tempErrorMessage("Connection Error"));
    };
    request.send(JSON.stringify({isComplete:isComplete}));
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
