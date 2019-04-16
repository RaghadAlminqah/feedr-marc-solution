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
    let userChoice = e.target.id;
    if (userChoice === "reddit") { 
      // $main.empty()
      redditAppendDom() 
    } else if (userChoice === "digg") {
      diggAppendDom()
    } else if (userChoice === "mashable") {
      mashableAppendDom()
    } else {
      alert("something is broken")
    }
  })
}

async function getAllArticles() {
  let diggResponse = await $.get('https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json')
  let redditResponse = await $.get('https://www.reddit.com/top.json')
  let mashableResponse = await $.get('https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/stories.json')

  await buildNodes(diggResponse, redditResponse, mashableResponse)
  console.log("Articles loaded");
  $popUp.addClass('hidden')
  return diggAppendDom()
}
  

function buildArticles(diggResponse, redditResponse, mashableResponse) {
  diggResponse.data.feed.forEach(article =>  {
    diggArticles.push({
      title: article.content.title,
      url: article.content.url,
      image: article.content.media.images[0].original_url,
      source: article.content.domain_name,
      description: article.content.description
    })
  })

  redditResponse.data.children.forEach(article =>  {
    redditArticles.push({
      title: article.data.title,
      url: article.data.url,
      image: article.data.thumbnail,
      source: article.data.subreddit,
      description: article.data.subreddit
    })
  })

  mashableResponse.hot.forEach(article =>  {
    mashableArticles.push({
      title: article.display_title,
      url: article.link,
      image: article.image,
      source: article.channel,
      description: article.excerpt
    })
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

$(() => {
  $popUp.removeClass('hidden')
  setDropDown()
  getAllArticles()
})