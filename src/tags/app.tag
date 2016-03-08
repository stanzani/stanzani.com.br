<app>
  <div class="base-layout mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
    <div class="base-ribbon"></div>
    <main class="base-main mdl-layout__content">
      <div class="base-container mdl-grid">
        <div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
        <div class="base-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
          <div class="base-crumbs mdl-color-text--grey-500">
            About
          </div>
          <h3>Daniel Stanzani</h3>
          <error-message message={this.state.errorMessage} iserror={this.state.isError} hide={hideErrorMessage}></error-message>
          <loading-indicator loading={this.state.isLoading}></loading-indicator>
          <link-list links={this.state.links}></link-list>
        </div>
      </div>
    </main>
  </div>
  <script>
    let actions = require('../actions.js')
    let store = this.opts.store

    this.on('mount', () => { store.dispatch(actions.loadLinks()) } )

    store.subscribe( (() => {
        this.state = store.getState()
        this.update()
    }).bind())

    hideErrorMessage(){
      store.dispatch(actions.hideError());
    }
  </script>
</app>


<link-list>
  <span each={link in this.opts.links}>
    <a href={link.url} title={link.name} target="_blank" class="mdl-button mdl-js-button mdl-js-ripple-effect"><i class="zmdi zmdi-hc-3x zmdi-{link.icon}"></i></a>
  </span>
  <script>
    handleCheck(evt){
      this.opts.handlecheck(evt.target.id, evt.target.checked)
    }
  </script>
</link-list>

<loading-indicator>
  <img src="assets/img/loading.gif" alt="Loading..." show={this.opts.loading}/>
</loading-indicator>

<error-message>
  <div show={this.opts.iserror}>
    {this.opts.message}
  </div>
  <script>
    hideMessage(){
      this.opts.hide();
    }
  </script>
</error-message>
