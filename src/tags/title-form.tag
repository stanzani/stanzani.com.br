<title-form>
  <form onsubmit="{changeTitle}">
    <input type="text" name="newTitle">
    <input type="submit" value="change title">
  </form>
  <script>
    let actions = require('../actions.js')
    changeTitle(){
      this.opts.store.dispatch(actions.changeTitle(this.newTitle.value))
    }
  </script>
</title-form>
