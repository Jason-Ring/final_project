firebase.auth().onAuthStateChanged(async function(user) {
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
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index222.html'
    })

    // Listen for the form submit and create/render the new post
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let postUsername = user.displayName
      let postImageUrl = document.querySelector('#image-url').value
      let postNumberOfLikes = 0
      let docRef = await db.collection('posts').add({ 
        userId: user.uid,
        username: postUsername, 
        imageUrl: postImageUrl, 
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      let postId = docRef.id // the newly created document's ID
      document.querySelector('#image-url').value = '' // clear the image url field
      renderPost(postId, postUsername, postImageUrl, postNumberOfLikes)
    })

    // 🔥 LAB STARTS HERE 🔥
    // let querySnapshot = await db.collection('posts').orderBy('created').get()
    // let posts = querySnapshot.docs
    
    let response = await fetch(`http://localhost:8888/.netlify/functions/get_posts`)
    let posts = await response.json()

    for (let i=0; i<posts.length; i++) {
      let postId = posts[i].id
      // let postData = posts[i].data()
      // let postUsername = postData.username
      // let postImageUrl = postData.imageUrl

      let postUsername = posts[i].username
      let postImageUrl = posts[i].imageUrl

      // let querySnapshot = await db.collection('likes').where('postId', '==', postId).get()
      // let postNumberOfLikes = querySnapshot.size
      let postNumberOfLikes = posts[i].newNumberOfLikes
      renderPost(postId, postUsername, postImageUrl, postNumberOfLikes)
    }
    // 🔥 LAB ENDS HERE 🔥

  } else {
    // Signed out
    console.log('signed out')

    // Hide the form when signed-out
    document.querySelector('form').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'kelloggram.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})

async function renderPost(postId, postUsername, postImageUrl, postNumberOfLikes) {
  document.querySelector('.posts').insertAdjacentHTML('beforeend', `
    <div class="post-${postId} md:mt-16 mt-8 space-y-8">
      <div class="md:mx-0 mx-4">
        <span class="font-bold text-xl">${postUsername}</span>
      </div>
  
      <div>
        <img src="${postImageUrl}" class="w-full">
      </div>
  
      <div class="text-3xl md:mx-0 mx-4">
        <button class="like-button">❤️</button>
        <span class="likes">${postNumberOfLikes}</span>
      </div>
    </div>
  `)
  document.querySelector(`.post-${postId} .like-button`).addEventListener('click', async function(event) {
    event.preventDefault()
    console.log(`post ${postId} like button clicked!`)
    let currentUserId = firebase.auth().currentUser.uid

    let querySnapshot = await db.collection('likes')
      .where('postId', '==', postId)
      .where('userId', '==', currentUserId)
      .get()

    if (querySnapshot.size == 0) {
      await db.collection('likes').add({
        postId: postId,
        userId: currentUserId
      })
      let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
      let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
      document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
    }
    
  })
}