let firebase = require('./firebase')

exports.handler = async function (event) {
  console.log('hello from the back-end!')

  let wishListData = []
  let db = firebase.firestore()
  let wishquerySnapshot = await db.collection('Wished').get()
  console.log(`Number of wishes in collection: ${wishquerySnapshot.size}`)

  let wishList = wishquerySnapshot.docs
  for (let i = 0; i < wishList.length; i++) {
    let wish = wishList[i].data()
    let productId = wish.productId
    let userId = wish.userId
    wishListData.push({
        productId: productId,
        userId: userId
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(wishListData)
  }
}