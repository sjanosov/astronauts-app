import React, { useEffect, useState } from 'react';
import './css/App.scss';
import AddAstronautForm from './AddAstronautForm'
import AstronautsList from './AstronautsList'
import Spinner from './Spinner';
import './css/astronautsList.scss';
import { AstronautType } from './types/AstronautType';
import Logo from './astronaut-look.png'
import { APP_PROD_URL, APP_DEV_URL, devEnv } from './constants/constants';



function App() {
  const [astronauts, setAstronauts] = useState<AstronautType[]>([]);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [superpower, setSuperpower] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [astronaut, setAstronaut] = useState<AstronautType>();
  const [isPending, setIsPending] = useState(false);

  
  const handleDelete = (id: number) => {
    const newAstronauts = astronauts?.filter(astronaut => id !== astronaut.id);
    setAstronauts(newAstronauts);
    fetch(`${devEnv ? APP_DEV_URL : APP_PROD_URL}/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      console.log(response)
    })
    .catch(err =>
      console.log(err)
    )
  }

  const handleEdit = (id: number) => {
    let editedAstronaut = astronauts.filter(astronaut => id === astronaut.id)[0];
    setAstronaut(editedAstronaut);
    console.log(editedAstronaut)
    setName(editedAstronaut.name);
    setBirthDate(editedAstronaut.birthDate);
    setSuperpower(editedAstronaut.superpower);
  }

  const handleOnSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);

    const submittedAstronaut: AstronautType = {
      name,
      birthDate,
      superpower,
      id: 0
    }
    
    if (!astronaut?.id) {
      let highestId = 0;
      for (let astronautRec of astronauts) {
        if (astronautRec.id > highestId) {
          highestId = astronautRec.id;
        }
      }
      submittedAstronaut.id = highestId + 1;
      
      fetch(`${devEnv ? APP_DEV_URL : APP_PROD_URL}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedAstronaut)
      }).then(() => {
        setIsPending(false);
      })
      setAstronauts([...astronauts, submittedAstronaut]);
    } else {
      submittedAstronaut.id = astronaut.id;
      fetch(`${devEnv ? APP_DEV_URL : APP_PROD_URL}/${submittedAstronaut.id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedAstronaut)
      }).then(() => {
        setIsPending(false);
      })
      setAstronauts(astronauts.map(astronaut => astronaut.id === submittedAstronaut.id ? submittedAstronaut : astronaut));
      console.log(astronauts.map(astronaut => astronaut.id === submittedAstronaut.id ? submittedAstronaut : astronaut))
    }
    setAstronaut(undefined);
    setName("");
    setBirthDate(undefined);
    setSuperpower("");
  }



  function handleNameChange(e: React.BaseSyntheticEvent) {
    setName(e.target.value)
  }
  function handleBirthDateChange(e: React.BaseSyntheticEvent) {
    setBirthDate(e.target.value)
  }
  function handleSuperpowerChange(e: React.BaseSyntheticEvent) {
    setSuperpower(e.target.value)
  }


  useEffect(() => {
    setTimeout(() => {
      fetch(`${devEnv ? APP_DEV_URL : APP_PROD_URL}`)
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
      < body >
        <main>
          <div className="astro-container">
            {error && <div>{error}</div>}
            <AddAstronautForm onSubmit={handleOnSubmit}
              disabled={isLoading}
              name={name}
              birthDate={birthDate ? birthDate.toString() : ""}
              superpower={superpower}
              onNameChange={handleNameChange}
              onBirthDateChange={handleBirthDateChange}
              onSuperpowerChange={handleSuperpowerChange}
              isPending={isPending} />
            {astronauts && !isLoading ? <AstronautsList astronauts={astronauts} onDeleteChange={handleDelete} onEditChange={handleEdit} /> : <Spinner />}
          </div>
        </main>
      </body >
    </div >
  );
}

export default App;
