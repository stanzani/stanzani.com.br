<home>
  <div class="base-layout mdl-layout mdl-layout--fixed-header mdl-js-layout">
    <div class="base-ribbon"></div>
    <main class="base-main mdl-layout__content">
      <div class="base-container mdl-grid">
        <div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
        <div class="base-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
          <div class="base-crumbs mdl-color-text--grey-500">
            About
          </div>
          <h3>Daniel Stanzani</h3>
          <loading-indicator loading={this.state.isLoading}></loading-indicator>
          <link-list links={this.state.links}></link-list>
          <cubieboard status={this.state.cubieStatus} loading={this.state.isLoadingCubie}></cubieboard>
        </div>
      </div>
    </main>
  </div>
  <error-message message={this.state.errorMessage} iserror={this.state.isError} hide={hideErrorMessage}></error-message>
  <script>
    let actions = require('../actions/home.js')
    let store = this.opts.store

    this.on('mount', () => {
      store.dispatch(actions.loadLinks())
      store.dispatch(actions.loadCubieStatus())
    })

    store.subscribe( (() => {
        this.state = store.getState()
        this.update()
    }).bind());

    let hideErrorMessage = () => {
      store.dispatch(actions.hideError())
    }
  </script>
</home>

<link-list>
  <span each={link in this.opts.links}>
    <a href={link.url} title={link.name} target="{(link.hasOwnProperty('target'))?link.target:'_blank'}" class="mdl-button mdl-js-button mdl-js-ripple-effect"><i class="zmdi zmdi-hc-3x zmdi-{link.icon} animated zoomIn"></i></a>
  </span>
  <script>
    let handleCheck = (evt) => {
      this.opts.handlecheck(evt.target.id, evt.target.checked)
    }
  </script>
</link-list>

<cubieboard>
  <div>
    <h6><i class="zmdi zmdi-cloud-outline"></i> My Cubieboard Status: {this.opts.status.pong} <span show={this.opts.loading} class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></span>
</h6>
  </div>
  <script>
  </script>
</cubieboard>

<loading-indicator>
  <div show={this.opts.loading} class="mdl-spinner mdl-js-spinner is-active"></div>
</loading-indicator>

<error-message>
  <div id="demo-snackbar-example" class="mdl-js-snackbar mdl-snackbar mdl-snackbar--active" show={this.opts.iserror}>
    <div class="mdl-snackbar__text">{this.opts.message}</div>
    <button class="mdl-snackbar__action" type="button"></button>
  </div>

  <script>
    let hideMessage = () => {
      this.opts.hide();
    }
  </script>
</error-message>
