let firebase = require('./firebase')

exports.handler = async function (event) {
  console.log('hello from the back-end!')

  let productListData = []
  let db = firebase.firestore()
  let productquerySnapshot = await db.collection('products').get()
  console.log(`Number to products in collection: ${productquerySnapshot.size}`)

  let productList = productquerySnapshot.docs
  for (let i = 0; i < productList.length; i++) {
    let prod = productList[i].data()
    let prodId = prod.id
    let prodName = prod.name
    let prodPrice = prod.price
    let prodCategory = prod.category
    let prodImage = prod.image
    let prodDescription = prod.description

    productListData.push({
      id: prodId,
      name: prodName,
      price: prodPrice,
      cateogry: prodCategory,
      image: prodImage,
      description: prodDescription,
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(productListData)
  }
}