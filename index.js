let db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    // Signed in
    console.log('signed in')

    // Ensure the signed-in user is in the users collection
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
  <button class="text-pink-500 underline sign-out">Sign Out</button>
`
    document.querySelector('.sign-out').addEventListener('click', function (event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'

    })

    document.querySelector(`.homepage`).innerHTML = `
    <div class="flex center text-xl p-2 m-2 bold">Almost Sold Out! Only Products Below Remain!</div>`

let productResponse = await fetch(`/.netlify/functions/get_products`)
let products = await productResponse.json()

    let outputElement = document.querySelector('.products')

    // console.log(products)

    for (let i = 0; i < products.length; i++) {
      let productName = products[i].name
      let productId = products[i].id
      // let proudctCategory = products[i].category
      let productImage = products[i].image
      let productPrice = products[i].price
      let productDescription = products[i].description

      outputElement.insertAdjacentHTML(`beforeend`, `
    <div class="mt-6 md:flex md:space-x-2 p-2">
        <div class="md:w-1/3>
          <div class="space-y-2 md:mt-0 mt-2">    
            <h2 class="font-bold text-xl">${productName}</h2>
            <img class="rounded-2xl w-25 h-1/3" src="${productImage}">
            <div class= text-m> ${productDescription} </div>
            <div class="font-bold text-m"><em>$${productPrice}</em> </div>
            <div> <button class="add-to-cartlist-button-${productId} block mt-4 text-white bg-blue-500 rounded px-4 py-2">Add to Cart</button> </div>
            <div> <button class="add-to-wishlist-button-${productId} block mt-4 text-white bg-green-500 rounded px-4 py-2">Add to Wish List</button> </div>
          </div>
        </div>
      </div>`
      )

      // let wishResponse = await fetch(`/.netlify/functions/get_wishlist`)
      // let wishlist = await wishResponse.json()
      let docRefWish = await db.collection('Wished').doc(`${productId}-${user.uid}`).get()
      let wishedProduct = docRefWish.data()
      if (wishedProduct) {
        let wishlistElement = document.querySelector(`.add-to-wishlist-button-${productId}`)
        wishlistElement.innerHTML = `Added to Wishlist`
        wishlistElement.classList.add('opacity-30')
      }

      document.querySelector(`.add-to-wishlist-button-${productId}`).addEventListener('click', async function (event) {
        event.preventDefault()
        let wishlistElement = document.querySelector(`.add-to-wishlist-button-${productId}`)
        wishlistElement.innerHTML = `Added to Wishlist`
        await db.collection('Wished').doc(`${productId}-${user.uid}`).set({})
        wishlistElement.classList.add('opacity-30')
      })

      let docRefCart = await db.collection('Carted').doc(`${productId}-${user.uid}`).get()
      let cartedProduct = docRefCart.data()
      if (cartedProduct) {
        let cartlistElement = document.querySelector(`.add-to-cartlist-button-${productId}`)
        cartlistElement.innerHTML = `Added to Cart`
        cartlistElement.classList.add('opacity-30')
      }

      document.querySelector(`.add-to-cartlist-button-${productId}`).addEventListener('click', async function (event) {
        event.preventDefault()
        let cartlistElement = document.querySelector(`.add-to-cartlist-button-${productId}`)
        cartlistElement.innerHTML = `Added to Cart`
        await db.collection('Carted').doc(`${productId}-${user.uid}`).set({})
        cartlistElement.classList.add('opacity-30')
      })

    }

  }
  else {
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
  // )



})