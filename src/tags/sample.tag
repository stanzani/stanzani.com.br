<sample>
  <h1>{this.opts.store.getState().title}</h1>
  <form onsubmit="{changeTitle}">
    <input type="text" name="newTitle">
    <input type="submit" value="change title">
  </form>
  <script>
    changeTitle(){
      this.opts.store.dispatch({type:'CHANGE_TITLE', data:this.newTitle.value})
    }
  </script>
</sample>