var diggArticles = [], diggNodes = [];
var redditArticles= [], redditNodes = [];
var mashableArticles =[], mashableNodes = [];
var $loader = $('.loader');
var $popUp = $('#popUp');
var $main = $('#main');      

function appendDom(array) {
  array.forEach((article, index) => {
    // console.log(article)
    $main.append(`
      <article class="article" >
        <section class="featuredImage">
          <img src=${article.image} alt="">
        </section>
        <section class="articleContent">
          <a href='#'><h3 id=${index}>${article.title}</h3></a>
          <h6>${article.source}</h6>
        </section>
        <section class="impressions">
          ${article.source}
        </section>
        <div class="clearfix"></div>
      </article>
    `)
  })

  $('.article a').on('click', (e) => {
    let chosenArticle = array[e.target.id]
    
    $popUp
      .empty()
      .attr('class', '')
      .html(`
        <a href="#" class="closePopUp">X</a>
        <div class="container">
          <h1>${chosenArticle.title}</h1>
          <p>
          ${chosenArticle.description}
          </p>
          <a href=${chosenArticle.url} class="popUpAction" target="_blank">Read more from source</a>
        </div>
      `)

    $('.closePopUp').on('click', () => {
      $popUp.addClass('hidden')
    })
  })
}

function setDropDown() {
  $dropdowns = $('#dropdown a')

  $dropdowns.on('click', (e) => {
    // console.log(e.target.id)
    if (e.target.id === "reddit") { 
      // $main.empty()
      redditAppendDom() 
    } else if (e.target.id === "digg") {
      diggAppendDom()
    } else {
      mashableAppendDom()
    }
  })
}

function getDiggArticles() {
  $.get('https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json')
    .done(response => {
      response.data.feed.forEach(article =>  {
        diggArticles.push({
          title: article.content.title,
          url: article.content.url,
          image: article.content.media.images[0].original_url,
          source: article.content.domain_name,
          description: article.content.description
        })
      })
    })
    .done(() => {
      console.log(diggArticles)
    })
}  

function getRedditArticles() {
  $.get('https://www.reddit.com/top.json')
    .done(response => {
      response.data.children.forEach(article =>  {
        redditArticles.push({
          title: article.data.title,
          url: article.data.url,
          image: article.data.thumbnail,
          source: article.data.subreddit,
          description: article.data.subreddit
        })
      })
    })
    .done(() => {
      console.log(redditArticles)
    })
}

function getMashableArticles() {
  $.get('https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/stories.json')
    .done(response => {
      response.hot.forEach(article =>  {
        mashableArticles.push({
          title: article.display_title,
          url: article.link,
          image: article.image,
          source: article.channel,
          description: article.excerpt
        })
      })
    })
    .done(() => {
      console.log(mashableArticles)
    })
}

function diggAppendDom() {
  console.log("Digg append DOM")
  $main.empty()
  // $popUp.removeClass('hidden');
  appendDom(diggArticles)
  $popUp.addClass('hidden');  
}

function redditAppendDom() {
  console.log("Reddit append DOM")
  $main.empty()
  $popUp.removeClass('hidden');
  appendDom(redditArticles)
  $popUp.addClass('hidden');  
}

function mashableAppendDom() {
  console.log("Mashable append DOM")
  $main.empty()
  $popUp.removeClass('hidden');
  appendDom(mashableArticles)
  $popUp.addClass('hidden');  
}

function start() {
  $popUp.removeClass('hidden')
  setDropDown()
  getDiggArticles()
  getRedditArticles()
  getMashableArticles()
  // diggAppendDom()
  // $popUp.addClass('hidden')
}


$(() => {
  start()
  setTimeout(() => {
    diggAppendDom()
    $popUp.addClass('hidden')
  }, 1000)

  // appendDom(diggArticles)
  // $popUp.addClass('hidden')
})