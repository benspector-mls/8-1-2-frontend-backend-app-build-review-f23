import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [legs, setLegs] = useState(2);
  const [fur, setFur] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, type, color, fur, legs);

    /* 
    0. gather data from the form
    1. send a POST request
    2. get back the new animal created
    3. display that new animal...
    */
    try {
      const response = await fetch(`/api/animals/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, type, color, hasFur: fur, legs })
      });
      const newAnimal = await response.json();
      console.log(newAnimal);

      if (newAnimal) {
        setAnimals((animals) => [...animals, newAnimal]);
      }

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <h1>Animal Sanctuary</h1>
      <form onSubmit={handleSubmit}>
        <h2>Create a new animal</h2>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
        <label htmlFor="type">Type</label>
        <input value={type} onChange={(e) => setType(e.target.value)} type="text" name="type" id="type" />
        <label htmlFor="legs">Legs</label>
        <input value={legs} onChange={(e) => setLegs(e.target.value)} type="number" name="legs" id="legs" />
        <label htmlFor="color">Color</label>
        <input value={color} onChange={(e) => setColor(e.target.value)} type="text" name="color" id="color" />
        <label htmlFor="hasFur">Has Fur</label>
        <input value={fur} onChange={(e) => setFur(e.target.checked)} type="checkbox" name="hasFur" id="hasFur" />
        <button>Submit</button>
      </form>
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
