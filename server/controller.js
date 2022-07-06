//import movies from json file
const movies = require('./db.json')
let globalId = 11

//export functions to use in main server file
//let functions = {}
// module.exports = functions
module.exports = {
  sendMovies: (req, res) => {
    res.status(200).send(movies)
  },

  updateMovie: (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.type)
    //convert id to be a number and finding index of matching id's
    const existingId = +req.params.id
    let index = movies.findIndex(movie => movie.id === existingId)

    //increment or decrement if it's possible
    if(req.body.type === 'plus'){
      if(movies[index].rating >= 5){
        res.status(400).send('Cannot rate a movie over 5')
      } else {
        movies[index].rating++
        res.status(200).send(movies)
      }
    } else {
      if(movies[index].rating <= 1){
        res.status(400).send('Cannot rate a movie under 1')
      } else {
        movies[index].rating--
        res.status(200).send(movies)
      }
    }
  },

  createMovie: (req, res) => {
    const {imageURL, title, rating} = req.body

    let newMovie = {
      title,
      rating,
      imageURL,
      id: globalId
    }

    movies.push(newMovie)
    res.status(200).send(movies)
    globalId++
  },

  deleteMovie: (req, res) => {
    const existingId = +req.params.id

    let index = movies.findIndex(movie => movie.id === existingId)
    movies.splice(index, 1)
    res.status(200).send(movies)
  }
}