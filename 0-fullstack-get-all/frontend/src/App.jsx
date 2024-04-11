import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      try {
        const response = await fetch('/api/animals');
        const data = await response.json();
        setAnimals(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    doFetch();
  }, [])

  console.log(animals);

  return (
    <>
      <h1>Animal Sanctuary</h1>
      <ul>
        {animals.map(animal => {
          return (
            <li key={animal.name}>
              <h2>{animal.name}</h2>
              <p>Type: {animal.type}</p>
              <p>Color: {animal.color}</p>
              <p>Legs: {animal.legs}</p>
              <p>Has Fur: {animal.hasFur ? 'yes' : 'no'}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
