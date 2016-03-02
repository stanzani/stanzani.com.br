<todo-app>
  <error-message message={this.state.errorMessage} iserror={this.state.isError} hide={hideErrorMessage}></error-message>
  <loading-indicator loading={this.state.isLoading}></loading-indicator>
  <task-form addtask={this.handleNewTask}></task-form>
  <task-list tasks={this.state.tasks} handlecheck={handleTaskCompletedChange}></task-list>
  <script>
    let actions = require('../actions.js')
    let store = this.opts.store

    this.on('mount', () => { store.dispatch(actions.loadTasks()) } )

    store.subscribe( (() => {
        this.state = store.getState()
        this.update()
    }).bind())

    handleNewTask(task){
      store.dispatch(actions.addTask(task))
    }

    handleTaskCompletedChange(id, isComplete){
      store.dispatch(actions.toggleComplete(id,isComplete))
    }

    hideErrorMessage(){
      store.dispatch(actions.hideError());
    }
  </script>
</todo-app>


<task-list>
  <ul>
    <li each={task in this.opts.tasks}>
      <input type="checkbox" id={task.id} checked={task.isComplete} onchange={handleCheck}>{task.name}
    </li>
  </ul>

  <script>
    handleCheck(evt){
      this.opts.handlecheck(evt.target.id, evt.target.checked)
    }
  </script>
</task-list>


<loading-indicator>
  <img src="loading.gif" alt="Loading..." show={this.opts.loading}/>
</loading-indicator>

<task-form>
  <form onsubmit={handleSubmit}>
    <input type="text" name="newTask">
    <input type="submit" name="submit" value="submit">
  </form>

  <script>
    handleSubmit(){
      this.opts.addtask(this.newTask.value)
      this.newTask.value = '';
    }
  </script>
</task-form>

<error-message>
  <div show={this.opts.iserror}>
    {this.opts.message} <a href="#" onclick={hideMessage}>x</a>
  </div>
  <script>
    hideMessage(){
      this.opts.hide();
    }
  </script>
</error-message>
