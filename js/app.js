var diggFeed = [], diggNodes = []

function getDiggArticles() {
  $.get('https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json')
  .done(response => {
    response.data.feed.forEach(article =>  {
      // console.log(article)
      diggFeed.push({
        title: article.content.title,
        url: article.content.url,
        image: article.content.media.images[0].original_url,
        source: 'digg',
        story_id: article.story_id
      })
    })
  })
  .done(() => {
    // console.log(diggFeed)
    $main = $('#main');
    $main.empty()

    diggFeed.forEach((article, index) => {
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
      // $articleNode.on('click', (e) => {
      //   e.preventDefault()
      //   console.log(e.target)
      // })
      // diggNodes.push($articleNode)
    })
  })
  .done(() => {
    $('.article a').on('click', (e) => {
      e.preventDefault()
      console.log(e.target.id)
      let chosenArticle = diggFeed[e.target.id]
      console.log(chosenArticle)

      
      $('#popUp')
        .attr('class', '')
      
      $('#popUp .container').html(`
        <div class="container">
          <h1>${chosenArticle.title}</h1>
          <p>
          ${chosenArticle.title}
          </p>
          <a href=${chosenArticle.url} class="popUpAction" target="_blank">Read more from source</a>
        </div>
      `)

      $('.closePopUp').on('click', (e) => {
        e.preventDefault()
        $('#popUp').addClass('hidden')
      })


    })
  })
  .done(() => {
    // $('#main')
    // .empty()
    // .append(diggNodes)

    $('.loader').addClass('hidden');
  })
}
  
// function addDiggArticlesToDOM(diggArticles) {  
//   diggArticles.forEach(article => {
//     let node = `
//       <article class="article">
//         <section class="featuredImage">
//           <img src=${article.image} alt="">
//         </section>
//         <section class="articleContent">
//             <a href="#"><h3>${article.title}</h3></a>
//             <h6>${article.topic}</h6>
//         </section>
//         <section class="impressions">
//           526
//         </section>
//         <div class="clearfix"></div>
//       </article>
//     `
//   })
// }
      

$(() => {
  $('.loader').removeClass('hidden');
  getDiggArticles()
})
// $.ajax({
//   url: 'https://www.reddit.com/top.json',
//   success: function(response) {
//     redditArticles = response.data.children
//     console.log(redditArticles)
//   }
// })

// $.ajax({
//   url: 'https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/stories.json',
//   success: function(response) {
//     mashableArticles = response.new
//     console.log(mashableArticles)
//   }
// })