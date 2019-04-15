let redditArticles, diggArticles, mashableArticles = []

function getAllArticles() {
  $.ajax({
    url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
    success: function(response) {
      diggArticles = response.data.feed
      console.log(diggArticles)
    }
  })

  $.ajax({
    url: 'https://www.reddit.com/top.json',
    success: function(response) {
      redditArticles = response.data.children
      console.log(redditArticles)
    }
  })

  $.ajax({
    url: 'https://accesscontrolalloworiginall.herokuapp.com/https://mashable.com/stories.json',
    success: function(response) {
      mashableArticles = response.new
      console.log(mashableArticles)
    }
  })
}


$(() => {
  getAllArticles()
})