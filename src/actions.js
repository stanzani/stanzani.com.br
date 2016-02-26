export function loadTasks(){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/tasks', true);
    request.onload = o => {
      if (request.status >= 200 && request.status < 400 ){
        var data = JSON.parse(request.responseText);
        dispatch(tasksLoaded(data));
      }
      dispatch(toggleLoading(false));
    };
    request.send();
  };
}

function tasksLoaded(tasks){
  return {type:'TASKS_LOADED', data:tasks};
}

function toggleLoading(isLoading){
  return {type:'TOGGLE_LOADING', data:isLoading};

}
