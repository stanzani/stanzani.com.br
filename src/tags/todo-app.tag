<todo-app>
  <loading-indicator loading={this.state.isLoading}></loading-indicator>
  <task-list tasks={this.state.tasks}></task-list>
  <script>
    let actions = require('../actions.js')
    let store = this.opts.store

    this.on('mount', () => { store.dispatch(actions.loadTasks()) } )

    store.subscribe( (() => {
        this.state = store.getState()
        this.update()
    }).bind())
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
