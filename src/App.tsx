import { useEffect, useState } from 'react';
import './css/App.scss';
import AddAstronautForm from './AddAstronautForm'
import AstronautsList from './AstronautsList'
import Spinner from './Spinner';
import './css/astronautsList.scss';



function App() {
  const [astronauts, setAstronauts] = useState(null);
  const [showAstronautsList, setShowAstronautsList] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [astronaut, setAstronaut] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const Logo = require('./astronaut-logo.png')

  const handleDelete = (id) => {
    const newAstronauts = astronauts.filter(astronaut => id !== astronaut.id);
    setAstronauts(newAstronauts);
    fetch('http://localhost:3001/astronauts/' + id, {
      method: 'DELETE'
    }).then(() => {
      // console.log('new astronaut added')
    })
  }

  const handleEdit = (id) => {
    let editedAstronaut = astronauts.filter(astronaut => id === astronaut.id)[0];
    setAstronaut(editedAstronaut);
    console.log(editedAstronaut)
    setName(editedAstronaut.name);
    setBirthDate(editedAstronaut.birthDate);
    setSuperpower(editedAstronaut.superpower);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    const submittedAstronaut = {
      name,
      birthDate,
      superpower
    }


    if (!astronaut?.id) {
      const highestId = astronauts.reduce((highestId, currentAstronaut) => highestId > currentAstronaut.id ? highestId : currentAstronaut.id);
      submittedAstronaut.id = highestId + 1;
      fetch('http://localhost:3001/astronauts', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedAstronaut)
      }).then(() => {
        setIsPending(false);
      })
      setAstronauts([...astronauts, submittedAstronaut]);
    } else {
      submittedAstronaut.id = astronaut.id;
      fetch('http://localhost:3001/astronauts/' + submittedAstronaut.id, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedAstronaut)
      }).then(() => {
        setIsPending(false);
      })
      setAstronauts(astronauts.map(astronaut => astronaut.id === submittedAstronaut.id ? submittedAstronaut : astronaut));
    }
    setAstronaut(null);
    setName("");
    setBirthDate("");
    setSuperpower("");
  }



  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleBirthDateChange(e) {
    setBirthDate(e.target.value)
  }
  function handleSuperpowerChange(e) {
    setSuperpower(e.target.value)
  }


  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:3001/astronauts')
        .then(res => { //this is just a response object, not the data
          if (!res.ok) {  //when endpoint is falsy or doesn't exist
            throw Error('Could not fetch the data for that resource');
          }
          return res.json(); //it returns the response object into json object, we get another promise
        })
        .then((data) => {
          setAstronauts(data);
          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          setError(err.message);//network error, if we cannot connect to server
          setIsLoading(false);

        })
    }, 1000);
  }, [])



  return (
    <div className="astro-app">
      <header className="astro-header">
        <img src={Logo} className="astro-img" alt="astronaut image" />
      </header>
      <body>
        <main>
          <div className="astro-container">
            {error && <div>{error}</div>}
            <AddAstronautForm onSubmit={handleOnSubmit}
              disabled={isLoading}
              name={name}
              birthDate={birthDate}
              superpower={superpower}
              onNameChange={handleNameChange}
              onBirthDateChange={handleBirthDateChange}
              onSuperpowerChange={handleSuperpowerChange}
              isPending={isPending} />
            {isLoading && <Spinner />}
            {astronauts && <AstronautsList astronauts={astronauts} onDeleteChange={handleDelete} onEditChange={handleEdit} />}
          </div>
        </main>
      </body>
    </div>
  );
}

export default App;
