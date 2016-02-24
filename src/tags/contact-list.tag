<contact-list>
  <h1>Contacts</h1>
  <ul>
    <li each={p in opts.people}>{p.first} {p.last}</li>
  </ul>
  <script>

    this.on('mount', () => {
      console.log('Fired')
      opts.callback(this)
    })

    this.on('data_loaded',  people => {
      opts.people = people
      this.update()
    })

  </script>
</contact-list>


// old example

<hey>
  <h3>Hey {opts.greet}</h3>
</hey>

<hey-form>
  <form onsubmit="{sayHey}">
    <input type="text" name="name">
    <button>Say Hey!</button>
  </form>
  <hey show={this.hey} greet={this.hey}></hey>

  <script>
    sayHey(){
      this.hey = this.name.value
      this.name.value = ''
    }
  </script>
</hey-form>
