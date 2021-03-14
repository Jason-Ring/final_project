window.addEventListener('DOMContentLoaded', async function (event) {

    let db = firebase.firestore()

    let wishedSnapshot = await db.collection('Wished').get()
    let wisheditems = wishedSnapshot.docs



    for (let i = 0; i < movies.length; i++) {

        let movie = movies[i]
        let movieid = movie.id
        let dbMovie = await db.collection('Watched').doc(`${movieid}`).get()
        let dbMovieData = dbMovie.data()
        //console.log(dbMovieData)
        let moviePosterPath = movie.poster_path
        let moviehtml = document.querySelector('.movies')
        //console.log(movie)
        moviehtml.insertAdjacentHTML('beforeend', `
    <div class="w-1/5 p-4 movie-${movieid}">
      <img src="https://image.tmdb.org/t/p/w500${moviePosterPath}" class="w-full">
      <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
    </div>
    ` )
        if (dbMovieData) {
            let movieForm = document.querySelector(`.movie-${movieid}`)
            movieForm.classList.add('opacity-20')
        }
        let watchedButton = document.querySelector(`.movie-${movieid}`)
        watchedButton.addEventListener('click', async function (event) {
            event.preventDefault

            let movieForm = document.querySelector(`.movie-${movieid}`)
            movieForm.classList.add('opacity-20')
            await db.collection('Watched').doc(`${movieid}`).set({})
        })
    }
})

