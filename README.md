**steamScrapper**

Provides an easy way to retrieve info about Apps on steam market.
https://www.npmjs.com/package/steamscrapper

If you don't know the appid corresponding to the app, find it by calling .getAppIdsByTitle
it takes a name string and a param object with a single property: (exactMatch) -- if set to true, will return only apps in which the title === the name string
otherwise, will return all apps that have that string in it's name.

```js
const steamScrapper = require('steamscrapper')

async function getInfoAboutGame (gameName) {
  const gameIds = await steamScrapper.getAppIdsByTitle(gameName, { exactMatch: true })
  console.log(gameIds)
  const gameInfo = await steamScraper.getInfoByID(gameIds[0].appid)
  console.log(gameInfo)
}

getInfoAboutGame()
```