//steamAPI.getPage(id)
const axios = require('axios')

function getTagFromSteamArr(arr) {
  const arr2 = []
  for (var i = 0; i < arr.length; i++) {
    arr2.push(arr[i].description)
  }
  return arr2
}

exports.getPageByID = async function(id) {
  try { 
    let info = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)

    info = info.data

    const content = {
      original: 'https://store.steampowered.com/app/' + id,
      author: null,
      id: id,
      title: info.name,
      date: info.release_date.coming_soon ? 'N/A' : new Date(Date.parse(info.release_date.date) * 1000),
      description: info.short_description,
      media: [],
      statistics: {
        windows: info.platforms.windows,
        mac: info.platforms.mac,
        linux: info.platforms.linux,
        likes: info.likes,
        comments: info.comments
      },
      tags: [...getTagFromSteamArr(info.genres), ...info.developers, ...info.publishers, ...getTagFromSteamArr(info.categories)],
      language: 'unknown'
    }

    for (var i = 0; i < info.screenshots.length; i++) {
      content.media.push({
        type: 'image',
        source: info.screenshots[i].path_full
      })
    }

    for (var i = 0; i < info.movies.length; i++) {
      content.media.push({
        type: 'video',
        source: info.movies[i].webm.max,
        poster: info.movies[i].thumbnail,
        duration: info.movies[i].webm.max.split('/')[info.movies[i].webm.max.split('/').length - 1].split('.')[0]
      })
    }
    content.cover = info.header_image

    return content
  } catch (err) {
    console.log(err)
    return null
  }
}