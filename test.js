const { User } = require('./view/user')

async function test (userID) {
  await User.getCountsForAdmin(userID).then(res => {
    console.log(res)
  })
}

const userID = '7126da23-fa7a-4002-a405-5b4a29128bc1'

test(userID)
