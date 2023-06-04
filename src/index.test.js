const steamScraper = require('./index')

describe('steamScraper', () => {
  test('steamScraper.getAppIdsByTitle searches steam market to find appids that includes the title.' +
    '{ exactMach: true } returns only apps that are 100% equal to the query',
    async () => {
      const result = await steamScraper.getAppIdsByTitle('Pathologic 2', {exactMatch: true})
      expect(result).toEqual([{
        appid: 505230,
        name: 'Pathologic 2'
      }])
    }
  )
  test('steamScraper.getInfoByID returns all info contained on a steam store page for a particular ID',
    async () => {
      const result = await steamScraper.getInfoByID(505230)
      expect(result.name).toEqual('Pathologic 2')
    }
  )
  test('steamScraper.getInfoByID throws an error if the ID is not found',
    () => {
      expect(() => {
        const result = teamScraper.getInfoByID(1).rejects.toThrow('Steam returned success: false')
      })
    }
  )
  test('steamScraper.getAppIdsByTitle throws an error if the title is not found',
    () => {
      expect(() => {
        const result = teamScraper.getAppIdsByTitle ('randomstringthatwillneverexist', {exactMatch: true}).rejects.toThrow()
      })
    }
  )
})


