let firebase = require('./firebase')

exports.handler = async function (event) {
  console.log('hello from the back-end!')

  let db = firebase.firestore()
  let wish = JSON.parse(event.body)
  let docRef = await db.collection('Wished').doc(`${wish.productId}-${wish.userId}`).set(wish)

  return {
    statusCode: 200,
    body: JSON.stringify(docRef)
  }
}