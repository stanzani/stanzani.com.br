import 'whatwg-fetch';
import 'es6-promise';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 404) {
    throw new Error('404');
  } else {
    throw new Error(response.statusText);
  }
}

function parseJSON(response) {
  return response.json();
}

export function daysBefore (date) {
  let now = new Date();
  let d = date.split(/[: T-]/).map(parseFloat);
  let bfr = new Date(d[0], d[1]-1, d[2]);
  let val = Math.round((now-bfr)/(1000*60*60*24)) -1;
  let recent = false;
  if(val === 0){
    val = "Hoje";
    recent = true;
  }else if(val < 7 ){
    val += " dia" + ((val==1)?"":"s") + " atrás";
    recent = true;
  }else if(val == 7){
    val = "Uma semana atrás";
  }else{
    let month = {1:"janeiro", 2:"fevereiro", 3:"março", 4:"abril", 5:"maio", 6:"junho", 7:"julho", 8:"agosto", 9:"setembro", 10:"outubro", 11:"novembro", 12:"dezembro"};
    val = d[2] + " de " + month[d[1]] + " de " + d[0];
  }
  return {dateText:val, isRecent: recent};
}


export function loadPosts(page,end){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    fetchPosts({}, page, end, (v) => {
      if(page===0){
        dispatch(postsLoaded(v.posts));
        dispatch(updatePage(v.page));
      }else {
        dispatch(postsMoreLoaded(v.posts));
      }
      if(v.error === '404' && v.page > 0){
        dispatch(endOfPosts());
      }else if(v.error !== undefined ){
        dispatch(tempErrorMessage(`Bad response from server: ${v.error}`));
      }
      updateBlogURL(v.page, v.error);
    });
    dispatch(toggleLoading(false));
  };
}

function updateBlogURL(pg, error){
  if (pg !== 0 && history.pushState){
    if(error === '404') pg--;
    var newURL = window.location.protocol + "//" + window.location.host + "/#blog/" + pg;
    history.pushState(document.currentPage, document.title, newURL);
  }
}

function fetchPosts (d, page, end, fn){
  let headers = new Headers();
  let date = new Date();
  let age = 12*60*60; // One day
  date.setTime(date.getTime()+(age*1000)); // One day
  headers.append('Expires', date.toGMTString());
  headers.append('Pragma', 'cache');
  headers.append('Cache-Control', 'max-age='&age);
  headers.append('User-Cache-Control', 'max-age='&age);
  let init = {
    method: 'GET',
    headers: headers,
  };
  fetch('blog/blog'+page+'.json', init)
    .then(checkStatus)
    .then(parseJSON)
    .then( data => {
      Array.prototype.unshift.apply(data.blogPosts,d.blogPosts);
      if(page==end){
        fn({posts:data, page:page});
      }else{
        return fetchPosts(data, page+1, end, fn);
      }
    }).catch( error => fn({posts:d, page:page, error: error.message }) );
}

export function loadProfile(){
  return (dispatch, getState) => {
    dispatch(toggleProfileLoading(true));
    fetch('blog/danielstanzani.json')
      .then(checkStatus)
      .then(parseJSON)
      .then( data => dispatch(profileLoaded(data)) )
      .catch( error => dispatch(tempErrorMessage(`Bad response from server: ${error.message}`)) );
    dispatch(toggleProfileLoading(false));
  };
}

export function loadPost(id){
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    fetch(`blog/posts/${id}.json`)
      .then(checkStatus)
      .then(parseJSON)
      .then( data => dispatch(postLoaded(data)) )
      .catch( error => dispatch(errorPostPage(`Bad response from server: ${error.message}`)) );
    dispatch(toggleLoading(false));
  };
}

function postLoaded(post){
  Object.assign(post, daysBefore(post.datePublished));
  return {type:'POST_LOADED', data:post};
}

function postsLoaded(posts){
  return {type:'POSTS_LOADED', data:posts};
}

function postsMoreLoaded(posts){
  return {type:'POSTS_MORE_LOADED', data:posts};
}

function errorPostPage(error){
  return {type: 'ERROR_POST_PAGE', data:error};
}

function endOfPosts(){
  return (dispatch, getState) => {
    dispatch(hideMoreBtn());
    dispatch(showError(`Acabaram os posts...`));
    setTimeout( ( t => dispatch(hideError()) ), 5000);
  };
}

function hideMoreBtn(){
  return {type:'HIDE_MORE_BTN'};
}

function updatePage(page){
  return {type:'UPDATE_PAGE_STATE', data:page};
}

function profileLoaded(profile){
  return {type:'PROFILE_LOADED', data:profile};
}

function toggleLoading(isLoading){
  return {type:'TOGGLE_LOADING', data:isLoading};
}

function toggleProfileLoading(isProfileLoading){
  return {type:'TOGGLE_PROFILE_LOADING', data:isProfileLoading};
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
