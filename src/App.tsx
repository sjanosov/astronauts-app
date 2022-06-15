import React, { useEffect, useState } from 'react';
import './css/App.scss';
import AddAstronautForm from './AddAstronautForm'
import AstronautsList from './AstronautsList'
import Spinner from './Spinner';
import './css/astronautsList.scss';
import { AstronautType } from './types/AstronautType';
import Logo from './astronaut-look.png'
import { API_URL } from './constants/constants';
import AstronautPopUpPanel from './AstronautPopUpPanel';


function App() {
  const [astronauts, setAstronauts] = useState<AstronautType[]>([]);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [superpower, setSuperpower] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [astronaut, setAstronaut] = useState<AstronautType>();
  const [isPending, setIsPending] = useState(false);
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [notifiedAstronaut, setNotifiedAstronaut] = useState<AstronautType>();
  const [notificationType, setNotificationType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState<any>();


  const handleDelete = (id: number) => {
    const newAstronauts = astronauts?.filter(astronaut => id !== astronaut.id);
    setNotifiedAstronaut(astronauts?.filter(astronaut => id === astronaut.id)[0]);
    setAstronauts(newAstronauts);
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      console.log(response)
      setNotificationType("deleted");
      setIsNotificationShown(true);
      closeNotification(3000);
    })
      .catch(err =>
        console.log(err)
      )
  }

  function closeNotification(delay: number) {
    setTimeout(() => {
      setIsNotificationShown(false);
    }, delay)
  }

  const handleEdit = (id: number) => {
    let editedAstronaut = astronauts.filter(astronaut => id === astronaut.id)[0];
    setAstronaut(editedAstronaut);
    setName(editedAstronaut.name);
    setBirthDate(editedAstronaut.birthDate);
    setSuperpower(editedAstronaut.superpower);
    setIsEditing(true);
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

    setNotifiedAstronaut(submittedAstronaut);

    if (!astronaut?.id) {
      let highestId = 0;
      for (let astronautRec of astronauts) {
        if (astronautRec.id > highestId) {
          highestId = astronautRec.id;
        }
      }
      submittedAstronaut.id = highestId + 1;

      fetch(`${API_URL}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedAstronaut)
      }).then(() => {
        setIsPending(false);
        setIsNotificationShown(true);
        setNotificationType("added");
        closeNotification(3000);
        setAstronauts([...astronauts, submittedAstronaut]);
      })

    } else {
      submittedAstronaut.id = astronaut.id;
      fetch(`${API_URL}/${submittedAstronaut.id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedAstronaut)
      }).then(() => {
        setIsPending(false);
        setAstronauts(astronauts.map(astronaut => astronaut.id === submittedAstronaut.id ? submittedAstronaut : astronaut));
        setIsNotificationShown(true);
        setNotificationType("edited");
        closeNotification(3000);
      })

    }
    setAstronaut(undefined);
    setName("");
    setBirthDate(undefined);
    setSuperpower("");
    setIsEditing(false);
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
      fetch(`${API_URL}`)
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
          <AstronautPopUpPanel notifiedAstronaut={notifiedAstronaut} type={notificationType} isNotificationShown={isNotificationShown} />
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
              isPending={isPending}
              isEditing={isEditing} />
            {astronauts && !isLoading ?
              <AstronautsList
                astronauts={astronauts}
                onDeleteChange={handleDelete}
                onEditChange={handleEdit} /> :
              <Spinner />}
          </div>
        </main>
      </body >
    </div >
  );
}

export default App;
