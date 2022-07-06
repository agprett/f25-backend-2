//boilerplate code
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

//import our controller functions
const {sendMovies, updateMovie, createMovie, deleteMovie} = require('./controller.js')

//endpoints
app.get('/api/movies', sendMovies)
//above is the same as this:
//app.get('/api/movies', (req, res) => {
//   res.status(200).send(movies)
//})
app.put('/api/movies/:id', updateMovie)
app.post('/api/movies', createMovie)
app.delete('/api/movies/:id', deleteMovie)

app.listen(4004, () => console.log('Docked at port 4004'))