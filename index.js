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

    // async function authUIConfig() {

      let products = [
        {
          "name": "TKO Tri-Grip® Hex Urethane Dumbbells",
          "id": "D1",
          "category": "Dumbells",
          "image": "https://smhttp-ssl-18062.nexcesscdn.net/media/prod.thumb/t/k/tko-tri-grip-hex-dumbbells-urethane.jpg",
          "price": 29.99,
          "description": "The TKO Tri-Grip® Hex Dumbbells provide high-quality with a stylish design to enhance the look of any facility. Built from the highest-end material and guaranteed to last in the highest used facilities like health clubs, college rec and high school levels.  They are designed with a proprietary handle to fit the natural arch of the hand, which increases safety and effectiveness.  They provide an exceptional grip for all users."
        },
        {
          "name": "Hampton Dura-Prostyle Dumbbell",
          "id": "D2",
          "category": "Dumbells",
          "image": "https://smhttp-ssl-18062.nexcesscdn.net/media/prod.thumb/h/a/hampton-dumbbell-dpu_10_19.jpg",
          "price": 29.99,
          "description": "The Hampton Dura-Prostyle Dumbbell combines everything you want in a Dumbbell into a single, beautifully-designed unit. It’s practical and efficient, offering you the choice of vertical or horizontal storage based on your gym’s configuration and space issues. It’s ergonomically-designed, with a unique 35-mm handle contoured to fit the natural arch of the hand for increased safety and effectiveness, with a coarse knurling for exceptional grip."
        },
        {
          "name": "Adjustable Dumbbell Set",
          "id": "D3",
          "category": "Dumbells",
          "image": "https://smhttp-ssl-18062.nexcesscdn.net/media/prod.thumb/c/o/core-adjustable-dumbbell-set-01.jpg",
          "price": 99.99,
          "description": "Core Home Fitness's Adjustable Dumbbells let you change weights in 5 lb increments with the simple twist of a handle – no knobs to turn or levers to slide. With weights ranging from 5 to 50 lbs, our dumbbell gives you an entire 10-piece set in a single dumbbell – all with a durable construction and a modern, lightweight aluminum cradle. It’s a great way to get a real workout with real results – all from a smart, compact design."
        },
        {
          "name": "Profile® Squat Rack with Kipping Bar™",
          "id": "P1",
          "category": "Power Racks",
          "image": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1599145859-profile-rack-jpg-1.jpg?crop=1xw:1.00xh;center,top&resize=768:*",
          "price": 799.99,
          "description": "Rogue is one of the top rack brands out there, and this 90” squat stand is a great way to score their characteristic quality and function (although you will have to buy a bench, barbell and weight plate set separately). At 49” W x 48” D x 98” H, this rack is pretty compact, so you can easily fit it in your garage. Choose between a fully-integrated fat/skinny pull-up bar or a single 1.25” pull-up bar."
        },
        {
          "name": "SML-2 Rogue 90",
          "id": "P2",
          "category": "Power Racks",
          "image": "https://smhttp-ssl-18062.nexcesscdn.net/media/prod.thumb/t/k/tko-tri-grip-hex-dumbbells-urethane.jpg",
          "price": 599.99,
          "description": "The American-made SML-2 is equally equipped for squats, bench, pull-ups, clean pulls, floor press, and more. And with a footprint of just 49x48 inches, it's a squat stand well suited to both a garage gym or a large-scale training facility."
        },
        {
          "name": "Reliancer Power Tower Dip Station",
          "id": "P3",
          "category": "Power Racks",
          "image": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1608762979-7188yx3o2cl-ac-sl1500-edit-1608762971.jpg?crop=1xw:1xh;center,top&resize=768:*",
          "price": 399.99,
          "description": "This steel frame rack can be adjusted to 11 different heights and has an 800 pound weight capacity. It comes with a detachable bench, push-up handles, a horizontal bar, barbell stands, and padded cushions for your forearms and back."
        },
        {
          "name": "GoFit Pro Stability Ball - Red (65cm)",
          "id": "EBall1",
          "category": "Exercise Balls",
          "image": "https://target.scene7.com/is/image/Target/GUEST_df26fbef-94cc-45a2-b797-f086b52b9f37?wid=325&hei=325&qlt=80&fmt=webp",
          "price": 29.99,
          "description": "The GoFit Pro Stability Balls are designed to stretch, tone and tighten your entire body. The exercise challenge from working out on an unstable surface engages your core stabilizer muscles that are not normally challenged when on a stable surface. Each kit includes the ball, foot pump, and printed workout sampler."
        },
        {
          "name": "Ignite by SPRI Stable Ball Kit",
          "id": "EBall2",
          "category": "Exercise Balls",
          "image": "https://smhttp-ssl-18062.nexcesscdn.net/media/prod.thumb/t/k/tko-tri-grip-hex-dumbbells-urethane.jpg",
          "price": 21.99,
          "description": "Increase strength, balance and flexibility with the Ignite by SPRI Stable Ball Kit. Stay-Put technology ensures the ball won't roll away and helps secure it during dynamic exercises, while the additional weight adds resistance that boosts results. The durable, anti-burst construction will withstand any workout you dish out and can hold up to 300 pounds."
        },
        {
          "name": "Stability Ball - All in Motion™",
          "id": "EBall3",
          "category": "Exercise Balls",
          "image": "https://target.scene7.com/is/image/Target/GUEST_84b40869-79b3-45be-bed1-d434aef17fa1?wid=325&hei=325&qlt=80&fmt=webp",
          "price": 14.99,
          "description": "Enhance your workouts with a stability ball that helps you build back and core strength by adding balance and resistance to increase muscle activation."
        },
        {
          "name": "Bowflex C7 Indoor Cycling Bike",
          "id": "EBike1",
          "category": "Exercise Bikes",
          "image": "https://global.bowflex.com/on/demandware.static/-/Sites-nautilus-master-catalog/default/dwe0668bea/images/bowflex/bikes/100926/bowflex-c7-bike.png",
          "price": 1499.99,
          "description": "The Bowflex C7 Indoor Cycling Bike provides incredible stability, comfort, and will simulate a true bike riding experience."
        },
        {
          "name": "TKO Tri-Grip® Hex Urethane Dumbbells",
          "id": "EBike2",
          "category": "Exercise Bikes",
          "image": "https://www.allexercisebikes.net/images/proform-carbon-cx-exercise-bike.jpg",
          "price": 1199.99,
          "description": "The ProForm Carbon C10 Smart Bike is sturdy, durable, and built for every day use."
        },
        {
          "name": "NordicTrack Grand Tour Bike",
          "id": "EBike3",
          "category": "Exercise Bikes",
          "image": "https://i1.wp.com/www.exercise-bike-review.com/wp-content/uploads/2018/10/Nordictrack-s22i-studio-cycle.jpg?resize=650%2C650",
          "price": 999.99,
          "description": "NordicTrack Grand Tour Bike will provide the cushion you need to feel comfortable as you get in your daily workout."
        }
      ]
  
      let outputElement = document.querySelector('.products')
  
      // console.log(products)
  
      for (let i = 0; i < products.length; i++) {
        let productName = products[i].name
        // let productId = products[i].id
        // let proudctCategory = products[i].category
        let productImage = products[i].image
        let productPrice = products[i].price
        let productDescription = products[i].description
  
        outputElement.insertAdjacentHTML(`beforeend`, `
    <div class="mt-6 md:flex md:space-x-6 p-6">
        <div class="md:w-1/3 md:flex">
          <div class="space-y-4 md:mt-0 mt-6">    
            <h2 class="font-bold text-xl">${productName}</h2>
            <img class="rounded-2xl" src="${productImage}">
            <div> ${productDescription} </div>
            <div class="font-bold"><em>$${productPrice}</em>
            <div class="like-button-${productName}"> <button>❤️</button> <div>
            <div class="add-to-cart-button-${productName}"> <button class="block mt-4 text-white bg-blue-500 rounded px-4 py-2">Add to Cart</button> </div>
            <div class="add-to-wishlist-button-${productName}"> <button class="block mt-4 text-white bg-green-500 rounded px-4 py-2">Add to Wish List</button> </div>`
            )
      
      document.querySelector(`.add-to-wishlist-button-${productName}`).addEventListener('click', async function (event) {
        event.preventDefault()
        let wishlistElement = document.querySelector(`.${productName}-add-to-wishlist-button`)
        wishlistElement.classList.add.innerHTML(`Added to Wishlist`)
        await db.collection('Wished').doc(`${productName}-${user.uid}`).set({})
      })

      document.querySelector(`.add-to-cart-button-${productName}`).addEventListener('click', async function (event) {
        event.preventDefault()
        let cartElement = document.querySelector(`.${productName}-add-to-cart-button`)
        wishlistElement.classList.add.innerHTML(`Added to Cart`)
        await db.collection('Wished').doc(`${productName}-${user.uid}`).set({})
      })

      document.querySelector(`.like-button-${productName}`).addEventListener('click', async function(event) {
        event.preventDefault()
        console.log(`${productName} like button clicked!`)
        let currentUserId = firebase.auth().currentUser.uid
    
        let querySnapshot = await db.collection('likes')
          .where('productName', '==', productName)
          .where('userId', '==', currentUserId)
          .get()
    
        if (querySnapshot.size == 0) {
          await db.collection('likes').add({
            productName: productName,
            userId: currentUserId
          })
          let existingNumberOfLikes = document.querySelector(`.post-${productName} .likes`).innerHTML
          let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
          document.querySelector(`.like-button-${productName}`).innerHTML = newNumberOfLikes
        }
    })
  }



    // }
    // Sign-out button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
  <button class="text-pink-500 underline sign-out">Sign Out</button>
`
    document.querySelector('.sign-out').addEventListener('click', function (event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    
    })
    // window.addEventListener('DOMContentLoaded', authUIConfig)

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