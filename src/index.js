const axios = require('axios')

exports.getInfoByID = async function(id) {
  try { 
    let info = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
    let actualInfo = info.data[id]
    if (!actualInfo.success) {
      throw ({message: 'Steam returned success: false'})
    }
   
    return actualInfo.data
  } catch (err) {
    return Error(err)
  }
}
exports.getAppIdsByTitle = async function (name, params = { exactMatch: false}) {
  try {
    let appList = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json')
    actualAppList = appList.data.applist.apps

    let results = []
    for (var i = 0; i < actualAppList.length; i++) {
      if (!params.exactMatch && actualAppList[i].name.toLowerCase().includes(name.toLowerCase())) {
        results.push(actualAppList[i])
      } else if (params.exactMatch && actualAppList[i].name.toLowerCase() === name.toLowerCase()) {
        results.push(actualAppList[i])
      }
    }
    return results
  } catch (err) {
    return Error(err)
  }
}
