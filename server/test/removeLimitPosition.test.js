const {removeLimitPosition} = require('../components/removeLimitPosition')

it('test removeLimitPosition', async () => {

  global.JOURNAL = {
    positionLimits: [
      {
        id: 'asdfasdf',
        price: 1200
      },
      {
        id: 'asdfgsdfsa',
        price: 1300
      },
      {
        id: 'adfhfgh',
        price: 1400
      },
    ]
  }
  await removeLimitPosition({
    id: 'asdfgsdfsa',
    price: 1300
  })

  expect(global.JOURNAL.positionLimits[1].price).toBe(1400)

});
