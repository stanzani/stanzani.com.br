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
  <div class="blog mdl-layout mdl-js-layout has-drawer is-upgraded">
    <div class="back">
     <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onClick={home} title="voltar" role="button">
       <i class="zmdi zmdi-arrow-left" role="presentation"></i>
     </button>
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
      componentHandler.upgradeAllRegistered()
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

    this.home = (e) => riot.route('', 'Stanzani.com.br')
  </script>
</blog>

<posts-list>
  <profile data={this.opts.profile} loading="{this.opts.profloading}" class="mdl-card profile mdl-cell mdl-cell--8-col mdl-cell--4-col-desktop"></profile>
  <div class="mdl-card mdl-cell mdl-cell--8-col post__desc_first">
    <post-header
      imgurl={setURL(this.opts.posts[0]['image']['url'])}
      headline={this.opts.posts[0]['headline']}
      posturl={setURL(this.opts.posts[0]['url'])}
    ></post-header>
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
    <post-header
      imgurl={setURL(post['image']['url'])}
      headline={post['headline']}
      posturl={setURL(post['url'])}
    ></post-header>
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
    <span onclick={ this.opts.more } class="nav__button cursor-pointer" title="exibir mais" show={this.opts.showmore}>
      Mais
      <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
        <i class="zmdi zmdi-long-arrow-down"></i>
      </button>
    </span>
  </nav>
  <script>
  this.daysBefore = (date) => actions.daysBefore(date)
  this.setURL = (url) => url.substring(url.split('/', 3).join('/').length)
  </script>
</posts-list>

<post-header onclick={ goToURL } class="mdl-card__media mdl-color-text--grey-50" style="background-image: url('{this.opts.imgurl}')">
    <h3>{this.opts.headline}</h3>
    <script>
      this.goToURL = (e) => riot.route(this.opts.posturl, 'Stanzani.com.br :: Blog :: ' + this.opts.headline)
    </script>
</post-header>

<loading-indicator>
  <div show={this.opts.loading} class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
</loading-indicator>

<post-loading-indicator>
  <div show={this.opts.loading} class="spinner"></div>
  <style>
    .spinner {
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 72px solid white;
    -webkit-transform:rotate(360deg);
    -webkit-animation: sk-scaleout .7s infinite ease-in-out;
            animation: sk-scaleout .7s infinite ease-in-out;
  }

  @-webkit-keyframes sk-scaleout {
    0% { -webkit-transform: scale(0) }
    100% {
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
  }

  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
      opacity: 0;
    }
  }
   </style>

</post-loading-indicator>

<profile>
    <div onclick={goHome} class="mdl-card__media mdl-color--white mdl-color-text--grey-600" style="background-image: url({setURL(this.opts.data['image'])})">
      <loading-indicator loading="{this.opts.loading}"></loading-indicator>
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
      this.goHome = (e) => riot.route('', 'Stanzani.com.br')
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
    <base target="_blank">
    <main class="mdl-layout__content" show={!this.state.postError}>
      <div class="back">
       <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onclick={back} title="voltar" role="button">
         <i class="zmdi zmdi-arrow-left" role="presentation"></i>
       </button>
     </div>
      <div class="blog__posts mdl-grid">
        <post-loading-indicator loading={this.state.isLoading}></post-loading-indicator>
        <div class="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col" show={!this.state.isLoading}>
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
              <span>0</span>
              <i class="zmdi zmdi-hc-2x zmdi-favorite zmdi-hc-fw" role="presentation"></i>
              <span class="visuallyhidden">favorites</span>
            </div>
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
            <h4>Deixe seu comentário</h4>
            <form class="mdl-grid">
                  <div class="mdl-cell mdl-cell--6-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="name" name="name" pattern="[A-Za-z\s]*" />
                    <label class="mdl-textfield__label" for="name">Nome completo *</label>
                    <span class="mdl-tooltip mdl-tooltip--validation" for="name">
                    <span ng-show="form.name.$error.required">Campo obrigatório. <br></span>
                    <span ng-show="form.name.$error.pattern">Apenas letras e espaços.</span>
                    </span>
                  </div>
                  <div class="mdl-cell mdl-cell--6-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="email" id="email" name="email" ng-model="data.email" ng-required="true" />
                    <label class="mdl-textfield__label" for="email">E-mail * (não será divulgado)</label>
                    <span class="mdl-tooltip mdl-tooltip--validation" for="email">
                    <span ng-show="form.email.$error.required">Campo obrigatório. Não será divulgado. <br></span>
                    <span ng-show="form.email.$error.email">E-mail deve ser válido.</span>
                    </span>
                  </div>
                  <div class="mdl-cell mdl-cell--6-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" onFocus={siteOnFocus} onBlur={siteonBlur} type="url" id="site" name="site" pattern="https?://.+\..+"/>
                    <label class="mdl-textfield__label" for="site">Website</label>
                    <span class="mdl-tooltip mdl-tooltip--validation" for="site">
                    <span ng-show="form.site.$error.pattern">Formato http://nomedosite.com</span>
                    </span>
                  </div>
                  <div class="mdl-cell mdl-cell--6-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="tel" id="fone" name="fone" pattern="\d\{2\}?[9]?[1-9]\d\{3\}\d\{4\}" />
                    <label class="mdl-textfield__label" for="fone">Celular (não será divulgado)</label>
                    <span class="mdl-tooltip mdl-tooltip--validation" for="fone">
                    <span ng-show="form.fone.$error.pattern">Não será divulgado. <br>Apenas números.</span>
                    </span>
                  </div>
                  <div class="mdl-cell mdl-cell--6-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <textarea  oninput={textarea} rows="5" class="mdl-textfield__input" id="comment" name="comment" minlength="5" ng-model="data.comment" ng-required="true"></textarea>
                    <label for="comment" class="mdl-textfield__label">Comentário *</label>
                    <span class="mdl-tooltip mdl-tooltip--validation" for="comment">
                    <span ng-show="form.comment.$error.required">Obrigatório.</span>
                    <span ng-show="form.comment.$error.minlength">Mínimo 5 caracteres.</span>
                  </div>
                  <div class="mdl-cell mdl-cell--6-col send_button mdl-cell--bottom">
                    <span onclick={} class="nav__button cursor-pointer" title="enviar">
                      Enviar
                      <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                        <i class="zmdi zmdi-check"></i>
                      </button>
                    </span>
                    <div>Ao enviar, lerei e darei a resposta antes de publicar aqui no blog, por favor aguarde. Caso informe o número do celular, poderei comentar diretamente contigo via WhatsApp ou outro aplicativo. Obrigado.</div>
                  </div>
            </form>
            <div class="section-spacer"></div>

            <div class="comment mdl-color-text--grey-700">
              <header class="comment__header">
                <avatar name="Name"></avatar>
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
          <span onclick={back} class="errBack" title="voltar">
            <i class="zmdi zmdi-caret-left"></i> Voltar
          </span>
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
        componentHandler.upgradeAllRegistered()
    }).bind());

    this.setURL = (url) => url.substring(url.split('/', 3).join('/').length)
    this.setHashTag = (str) => str.split(" ").map( (v) => ` #${v}` ).join(" ")
    this.converter = new showdown.Converter();
    this.back = (e) => riot.route('/blog', 'Stanzani.com.br :: Blog');
    this.textarea = (e) => {
      this.comment.style.height = "";
      this.comment.style.height = Math.min(this.comment.scrollHeight) + "px";
    }
    this.siteOnFocus = (e) => (this.site.value == "")?this.site.value = "http://":"";
    this.siteonBlur  = (e) => (this.site.value == "http://")?this.site.value = "":"";

  </script>
</post>

<avatar class="comment__avatar">
  <canvas width="48" height="48"></canvas>
  <script>

  this.on('mount', function() {
      var colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
      var name = this.opts.name,
          initials = name.match(/\b\w/g);
          initials = (initials.shift() + initials.pop()).toUpperCase();
      var charIndex = initials.charCodeAt(0) - 65,
          colourIndex = charIndex % 19;
      var canvas = this.root.querySelector('canvas');
      var context = canvas.getContext("2d");
      if (window.devicePixelRatio) {
       context.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      context.fillStyle = colours[colourIndex];
      context.fillRect (0, 0, 48, 48);
      context.font = "26px Verdana";
      context.textAlign = "center";
      context.fillStyle = "#FFF";
      context.fillText(initials, 50 / 2.1, 50 / 1.45);
   })
  </script>
</avatar>
