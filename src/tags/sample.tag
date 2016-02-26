<sample>
  <h1>{this.opts.store.getState().title}</h1>
  <script>
    this.opts.store.subscribe( (e => this.update()).bind(this) )
  </script>
</sample>
