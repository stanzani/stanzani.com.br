<title-form>
  <form onsubmit="{changeTitle}">
    <input type="text" name="newTitle">
    <input type="button" value="change title" onclick="{changeTitle}">
  </form>
  <script>
    let actions = require('../actions.js')
    changeTitle(){
      this.opts.store.dispatch(actions.changeTitle(this.newTitle.value))
    }
  </script>
</title-form>
