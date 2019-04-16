var diggFeed = [], diggNodes = [];
var redditArticles= [], redditNodes = [];
var mashableArticles =[], mashableNodes = [];
var $loader = $('.loader');
var $popUp = $('#popUp');
var $main = $('#main');

function getDiggArticles() {
  $.get('https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json')
  .done(response => {
    response.data.feed.forEach(article =>  {
      // console.log(article)
      diggFeed.push({
        title: article.content.title,
        url: article.content.url,
        image: article.content.media.images[0].original_url,
        source: article.content.domain_name,
        description: article.content.description
      })
    })
  })
  .done(() => {
    // console.log(diggFeed)
    $main.empty()
    appendDom(diggFeed)

    $loader.addClass('hidden');
  })
  .done(() => {
    $('.article a').on('click', (e) => {
      let chosenArticle = diggFeed[e.target.id]
      
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
  })
}     

function appendDom(array) {
  console.log(array)
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
      getDiggArticles()
    } else {
      alert("Mashable not working yet")
    }
  })
}

function getRedditArticles() {
  $.get('https://www.reddit.com/top.json')
    .done(response => {
      // redditArticles = response.data.children
      // console.log(redditArticles)
      response.data.children.forEach(article =>  {
        // console.log(article)
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

function redditAppendDom() {
  console.log("Reddit append DOM")
  $main.empty()
  $loader.removeClass('hidden');
  appendDom(redditArticles)
  $loader.addClass('hidden');  
}

function getMashableArticles() {
  $.get('https://www.reddit.com/top.json')
    .done(response => {
      // redditArticles = response.data.children
      // console.log(redditArticles)
      response.data.children.forEach(article =>  {
        // console.log(article)
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

$(() => {
  $loader.removeClass('hidden');
  getDiggArticles()
  getRedditArticles()
  getMashableArticles()
  setDropDown()
})

// $.ajax({
//   url: 'https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/stories.json',
//   success: function(response) {
//     mashableArticles = response.new
//     console.log(mashableArticles)
//   }
// })