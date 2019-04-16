var diggArticles = [];
var redditArticles = [];
var mashableArticles =[];
var allArticlesArray = [];
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
  var $dropdowns = $('#dropdown a')

  $dropdowns.on('click', (e) => {
    $main.empty()
    let userChoice = e.target.id;

    switch(userChoice) {
      case "reddit":
        appendDom(redditArticles)
        break;
      case "digg":
        appendDom(diggArticles)
        break;
      case "mashable":
        appendDom(mashableArticles)
        break;
      case "all":
        appendDom(allArticlesArray)
        break;
      default:
        alert("something is broken")
    }
  })
}

async function getAllArticles() {
  let diggResponse = await $.get('https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json')
  let redditResponse = await $.get('https://www.reddit.com/top.json')
  let mashableResponse = await $.get('https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/stories.json')

  await parseArticles(diggResponse, redditResponse, mashableResponse)
  await appendDom(diggArticles)
  $popUp.addClass('hidden');
  allArticlesArray = shuffle([...diggArticles, ...redditArticles, ...mashableArticles])
  console.log("Articles loaded");
  console.log(allArticlesArray)
}  

function parseArticles(diggResponse, redditResponse, mashableResponse) {
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(() => {
  $popUp.removeClass('hidden')
  getAllArticles()
  $main.empty()
  setDropDown()
})