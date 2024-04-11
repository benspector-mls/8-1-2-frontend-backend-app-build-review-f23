/* 
A server:
1. Provides a frontend to the client
2. Provides data via API endpoints to a client
  3. Can perform 3rd party API calls while protecting API keys
*/

const express = require('express');
const path = require('path');
const Animal = require('./model/Animal');

const app = express();
const port = 8080;

// middleware
// const parseJSON = express.json()
app.use(express.json())

const pathToDistFolder = path.join(__dirname, '..', 'frontend', 'dist')
const serveStatic = express.static(pathToDistFolder);
app.use(serveStatic);


// controllers
const serveAllAnimals = (req, res, next) => {
  res.send(Animal.list())
}

// The client sends a POST request to 
// create a new animal...
const createAnimal = (req, res, next) => {
  /* 
  0. get the data from the request body (req.body)
  1. creates a new instance of the Animal class
  with the info given
  2. send it back to the client
  */
  console.log(req.body);
  const { name, type, legs, color, hasFur } = req.body;
  if (!name || !type || !legs || !color || hasFur === undefined) {
    return res.send("not enough data");
  }
  const newAnimal = new Animal(name, type, legs, color, hasFur);
  res.send(newAnimal);
}

// endpoints
app.get('/api/animals', serveAllAnimals) // get all
app.post('/api/animals', createAnimal) // create




const serveOneAnimal = (req, res, next) => {
  res.send('hello')
}
const updateAnimal = (req, res, next) => {
  res.send('hello')
}
const deleteAnimal = (req, res, next) => {
  res.send('hello')
}
app.get('/api/animals/:id', serveOneAnimal) // get one
app.patch('/api/animals/:id', updateAnimal) // update
app.delete('/api/animals/:id', deleteAnimal) // delete

app.listen(port, () => {
  console.log('listening on http://localhost:8080')
})