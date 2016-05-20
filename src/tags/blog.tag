import '../assets/css/blog.scss';
import * as actions from '../actions/blog.js';
import * as showdown from 'showdown';

<raw>
  <script>
    this.updateContent = function () {
        this.root.innerHTML = opts.content;
    };

    this.on('update', function() {
        this.updateContent();
    });

    this.updateContent();
  </script>
</raw>

<blog>
  <link href='https://fonts.googleapis.com/css?family=Poppins:400,500' rel='stylesheet' type='text/css'>
  <div class="blog mdl-layout mdl-js-layout has-drawer is-upgraded">
    <div class="back">
     <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" href="#" title="voltar" role="button">
       <i class="zmdi zmdi-arrow-left" role="presentation"></i>
     </a>
   </div>
    <main class="mdl-layout__content">
      <posts-list profile={this.state.profile}
                  posts={this.state.posts["blogPosts"]}
                  loading="{this.state.isLoading}"
                  profloading="{this.state.isProfileLoading}"
                  more={loadMore}
                  showmore={this.state.btnMorePosts}
                  class="blog__posts mdl-grid"></posts-list>
    </main>
  </div>
  <error-message message={this.state.errorMessage} iserror={this.state.isError} hide={hideErrorMessage}></error-message>
  <script>
    let store = this.opts.store
    let paginate = this.opts.paginate

    this.on('mount', () => {
      store.dispatch(actions.loadProfile())
      store.dispatch(actions.loadPosts(0,paginate))
    })

    store.subscribe( (() => {
        this.state = store.getState()
        this.update()
    }).bind());


    this.loadMore = () => {
      store.dispatch(actions.loadPosts(this.state.page,this.state.page))
    }

    let hideErrorMessage = () => {
      store.dispatch(actions.hideError())
    }
  </script>
</blog>

<posts-list>
  <profile data={this.opts.profile} loading="{this.opts.profloading}" class="mdl-card profile mdl-cell mdl-cell--8-col mdl-cell--4-col-desktop"></profile>
  <div class="mdl-card mdl-cell mdl-cell--8-col post__desc_first">
    <div onclick={ goToURL } class="mdl-card__media mdl-color-text--grey-50" style="background-image: url('{setURL(this.opts.posts[0]['image']['url'])}')">
      <h3><a href="{setURL(this.opts.posts[0]['url'])}">{this.opts.posts[0]['headline']}</a></h3>
    </div>
    <div class="mdl-card__supporting-text meta mdl-color-text--grey-600">
      <div class="minilogo">
        <i class="zmdi zmdi-fire zmdi-hc-2x animated infinite pulse mdl-color-text--red-600"></i>
      </div>
      <div class="post_date">
        <strong>Mais recente</strong>
        <span>{daysBefore(this.opts.posts[0]['datePublished']).dateText}</span>
        <loading-indicator loading={this.opts.loading}></loading-indicator>
      </div>
    </div>
  </div>

  <div each={ post, i in this.opts.posts } if='{i>0}' class="mdl-card mdl-cell mdl-cell--12-col post__desc">
    <div onclick={ goToURL } class="mdl-card__media mdl-color-text--grey-50" style="background-image: url('{setURL(post['image']['url'])}')">
      <h3><a href="{setURL(post['url'])}">{post['headline']}</a></h3>
    </div>
    <div class="mdl-color-text--grey-600 mdl-card__supporting-text">
      {post['description']}
    </div>
    <div class="mdl-card__supporting-text meta mdl-color-text--grey-600">
      <div class="minilogo"><i class="zmdi zmdi-calendar-alt zmdi-hc-2x mdl-color-text--blue-600"></i></div>
      <div class="post_date">
        <strong>Postado em</strong>
        <span>{daysBefore(post['datePublished']).dateText}</span>
      </div>
    </div>
  </div>

  <nav class="nav nav_more mdl-cell mdl-cell--12-col">
    <div class="section-spacer"></div>
    <a href="#blog" class="nav__button" title="exibir mais" show={this.opts.showmore}>
      Mais
      <button onclick={ this.opts.more } class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
        <i class="zmdi zmdi-long-arrow-down"></i>
      </button>
    </a>
  </nav>
  <script>
  this.goToURL = (e) => {
    if(e.target.firstElementChild!=null)
      location.href = e.target.firstElementChild.firstElementChild.hash
    else
      location.href = e.target.hash
  }
  this.daysBefore = (date) => actions.daysBefore(date)
  this.setURL = (url) => url.substring(url.split('/', 3).join('/').length)
  </script>
</posts-list>

<loading-indicator>
  <span show={this.opts.loading} class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></span>
</loading-indicator>

<profile-loading-indicator>
  <div show={this.opts.loading} class="mdl-spinner mdl-js-spinner is-active"></div>
</profile-loading-indicator>


<profile>
    <div onclick={goHome} class="mdl-card__media mdl-color--white mdl-color-text--grey-600" style="background-image: url({setURL(this.opts.data['image'])})">
      <profile-loading-indicator loading="{this.opts.loading}"></profile-loading-indicator>
    </div>
    <div class="mdl-card__supporting-text meta meta--fill mdl-color-text--grey-600">
      <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-left mdl-js-ripple-effect" for="menu">
        <li class="mdl-menu__item">About</li>
        <li class="mdl-menu__item">Message</li>
        <li class="mdl-menu__item">Favorite</li>
      </ul>
      <button show={false} id="menu" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
        <i class="zmdi zmdi-more-vert zmdi-hc-lg"></i>
        <span class="visuallyhidden">menu</span>
      </button>
      <div>
        <strong>{this.opts.data['name']}</strong>
      </div>
    </div>
    <script>
      this.goHome = () => location.href = "/#"
      this.setURL = (url) => url.substring(url.split('/', 3).join('/').length)
    </script>
</profile>

<error-message>
  <div class="mdl-js-snackbar mdl-snackbar mdl-snackbar--active" show={this.opts.iserror}>
    <div class="mdl-snackbar__text">{this.opts.message}</div>
    <button class="mdl-snackbar__action" type="button"></button>
  </div>

  <script>
    let hideMessage = () => {
      this.opts.hide();
    }
  </script>
</error-message>

<post>
  <div class="blog blog--blogpost mdl-layout mdl-js-layout has-drawer is-upgraded">
    <main class="mdl-layout__content" show={!this.state.postError}>
      <div class="back">
       <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" href="#blog" title="voltar" role="button">
         <i class="zmdi zmdi-arrow-left" role="presentation"></i>
       </a>
     </div>
      <div class="blog__posts mdl-grid">
        <div class="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col">
          <div class="mdl-card__media mdl-color-text--grey-50 cursor-default" style="background-image: url('{setURL(this.state.post.image.url)}')">
            <h3>{this.state.post.headline}</h3>
          </div>
          <div class="mdl-color-text--grey-700 mdl-card__supporting-text meta dateDesc">
            <div class="minilogo" show={this.state.post.isRecent}>
              <i class="zmdi zmdi-fire zmdi-hc-2x animated infinite pulse mdl-color-text--red-600"></i>
            </div>
            <div class="minilogo" show={!this.state.post.isRecent}>
              <i class="zmdi zmdi-calendar-alt zmdi-hc-2x mdl-color-text--blue-600"></i>
            </div>
            <div class="dateText">
              <strong>{this.state.post.isRecent?'Mais recente':'Postado em'}</strong>
              <span>{this.state.post.dateText}</span>
            </div>
            <div class="section-spacer"></div>
            <div class="meta__favorites" show={0}>
              425 <i class="zmdi zmdi-hc-2x zmdi-favorite zmdi-hc-fw" role="presentation"></i>
              <span class="visuallyhidden">favorites</span>
            </div>
            <loading-indicator loading={this.state.isLoading}></loading-indicator>
            <div show={0}>
              <i class="zmdi zmdi-hc-2x zmdi-bookmark zmdi-hc-fw" role="presentation"></i>
              <span class="visuallyhidden">bookmark</span>
            </div>
            <div show={0}>
              <i class="zmdi zmdi-hc-2x zmdi-share zmdi-hc-fw" role="presentation"></i>
              <span class="visuallyhidden">share</span>
            </div>
          </div>
          <div class="mdl-color-text--grey-700 mdl-card__supporting-text">
              <raw content="{converter.makeHtml(this.state.post.articleBody)}"></raw>
          </div>
          <div class="mdl-color-text--grey-700 mdl-card__supporting-text meta authorDesc">
            <div class="section-spacer"></div>
            <div class="meta__post">
              {setHashTag(this.state.post.keywords)}
              <i class="zmdi zmdi-hc-lg zmdi-tag animated infinite pulse zmdi-hc-fw" role="presentation"></i>
              <span class="visuallyhidden">tag</span>
            </div>
            <div class="meta__post">
              {this.state.post.author.name}
              <i class="zmdi zmdi-hc-lg zmdi-account zmdi-hc-fw" role="presentation"></i>
              <span class="visuallyhidden">autor</span>
            </div>
          </div>
          <div class="mdl-color-text--primary-contrast mdl-card__supporting-text comments" show={0}>
            <form>
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <textarea rows=1 class="mdl-textfield__input" id="comment"></textarea>
                <label for="comment" class="mdl-textfield__label">Fazer um comentário</label>
              </div>
              <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i class="zmdi zmdi-check" role="presentation"></i>
              </button>
            </form>
            <div class="comment mdl-color-text--grey-700">
              <header class="comment__header">
                <img src="" class="comment__avatar">
                <div class="comment__author">
                  <strong>Name</strong>
                  <span>Date</span>
                </div>
              </header>
              <div class="comment__text">
                Commment text...
              </div>
              <nav class="comment__actions">
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                  <i class="zmdi zmdi-thumb-up" role="presentation"></i>
                </button>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                  <i class="zmdi zmdi-thumb-down" role="presentation"></i>
                </button>
              </nav>
              <div class="comment__answers">
                <div class="comment">
                  <header class="comment__header">
                    <img src="" class="comment__avatar">
                    <div class="comment__author">
                      <strong>Name</strong>
                      <span>Date</span>
                    </div>
                  </header>
                  <div class="comment__text">
                    Reply text...
                  </div>
                  <nav class="comment__actions">
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                      <i class="zmdi zmdi-thumb-up" role="presentation"></i>
                    </button>
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                      <i class="zmdi zmdi-thumb-down" role="presentation"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <main class="mdl-layout__content errorPostMain" show={this.state.postError}>
      <div class="blog__posts mdl-grid">
        <div class="mdl-card amazing mdl-cell mdl-cell--12-col errorPostPage">
          <div class="mdl-card__title mdl-color-text--grey-50">
            <h2><i class="zmdi zmdi-alert-triangle mdl-color-text--orange animated infinite flash"></i> 404 - Página não encontrada</h2>
          </div>
          <p>A página que você está tentando acessar não existe ou está indisponível.</p>
          <a href="#blog" class="nav__button" title="voltar">
            <span class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"></span>
            <i class="zmdi zmdi-caret-left"></i> Voltar
          </a>
        </div>
      </div>
    </main>
    <div class="mdl-layout__obfuscator"></div>
  </div>
  <error-message message={this.state.errorMessage} iserror={this.state.isError} hide={hideErrorMessage}></error-message>
  <script>
    let store = this.opts.store
    let post = this.opts.post
    let isRecent = false;
    this.on('mount', () => {
      store.dispatch(actions.loadPost(post))
    })
    store.subscribe( (() => {
        this.state = store.getState()
        this.update()
    }).bind());

    this.setURL = (url) => url.substring(url.split('/', 3).join('/').length)
    this.setHashTag = (str) => str.split(" ").map( (v) => ` #${v}` ).join(" ")
    //this.textLines = (str) => str.split('\n')
    this.converter = new showdown.Converter();
  </script>
</post>
