import riot from 'riot';
import './tags/contact-list.tag';
document.addEventListener('DOMContentLoaded', () => riot.mount('hey-form'));
document.addEventListener('DOMContentLoaded', () => riot.mount('contact-list', {callback:tagCallback}));

function tagCallback(theTag){
  console.log('callback executed');
  var request = new XMLHttpRequest();
  request.open('GET', 'people.json', true);
  request.onload = ()=> {
    if(request.status == 200){
      var data = JSON.parse(request.responseText);
      theTag.trigger('data_loaded', data.people);
    }
  };
  request.send();
}
