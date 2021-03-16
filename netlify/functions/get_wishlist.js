let firebase = require('./firebase')

exports.handler = async function (event) {
  console.log('hello from the back-end!')

  let wishListData = []
  let db = firebase.firestore()
  let wishquerySnapshot = await db.collection('products').get()
  console.log(`Number to products in collection: ${wishquerySnapshot.size}`)

  let wishwishList = wishquerySnapshot.docs
  for (let i = 0; i < wishwishList.length; i++) {
    let wish = wishwishList[i].data()
    let wishId = wish.id

    wishListData.push({
      id: wishId,
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(productListData)
  }
}