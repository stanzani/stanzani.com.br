<todo-app>
  <loading-indicator loading={this.state.isLoading}></loading-indicator>
  <task-form addtask={this.handleNewTask}></task-form>
  <task-list tasks={this.state.tasks}></task-list>
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
  </script>
</todo-app>


<task-list>
  <ul>
    <li each={task in this.opts.tasks}>
      {task.name}
    </li>
  </ul>
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
