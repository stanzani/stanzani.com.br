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

export function loadLinks(){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    fetch('assets/json/db.json')
      .then(checkStatus)
      .then(parseJSON)
      .then( data => dispatch(linksLoaded(data)) )
      .catch( error => dispatch(tempErrorMessage(`Bad response from server: ${error}`)) );
    dispatch(toggleLoading(false));
  };
}

function linksLoaded(tasks){
  return {type:'LINKS_LOADED', data:tasks};
}

export function loadCubieStatus(){
  return (dispatch, getState) => {
    dispatch(toggleLoadingCubie(true));
    fetch('http://cubie.stanzani.com.br:8800/ping/')
      .then(checkStatus)
      .then(parseJSON)
      .then( pong => {
        dispatch(toggleLoadingCubie(false))
        dispatch(cubieStatusLoaded(pong))
      })
      .catch( error => {
        dispatch(cubieStatusLoaded({"pong":"Offline"}));
        dispatch(toggleLoadingCubie(false))
      });
  };
}

function cubieStatusLoaded(pong){
  return {type:'CUBIE_STATUS', data:pong};
}

function toggleLoading(isLoading){
  return {type:'TOGGLE_LOADING', data:isLoading};
}
function toggleLoadingCubie(isLoadingCubie){
  return {type:'TOGGLE_LOADING_CUBIE', data:isLoadingCubie};
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
    setTimeout( ( t => dispatch(hideError()) ), 3000);
  };
}
