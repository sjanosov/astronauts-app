import { useEffect, useState } from 'react';
import logo from './astronaut-look.png';
import './css/App.scss';
import AddAstronautForm from './AddAstronautForm'
import AstronautsList from './AstronautsList'
import { CSSTransition } from 'react-transition-group';
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


  const handleDelete = (id) =>  {
   const newAstronauts = astronauts.filter(astronaut => id !== astronaut.id);
   setAstronauts(newAstronauts);

   fetch('http://localhost:3001/astronauts/' + id, {
    method: 'DELETE'
  }).then(() => {
    // console.log('new astronaut added')
  })
}

const handleEdit = (id) => {
  let tmpAstronaut = astronauts.filter(astronaut => id === astronaut.id)[0];
  setAstronaut(tmpAstronaut);
  setName(tmpAstronaut.name);
  setBirthDate(tmpAstronaut.dateOfBirth);
  setSuperpower(tmpAstronaut.superPower);
}

const handleOnSubmit = (e) => {
  e.preventDefault();
  let tmpAstronaut = {id: astronaut.id ? astronaut.id : astronauts.length + 1,
    name: name,
    dateOfBirth: birthDate,
    superPower: superpower}

  if(tmpAstronaut.id == null){
    setAstronauts([...astronauts,
      tmpAstronaut
    ]);

      fetch('http://localhost:3001/astronauts', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(tmpAstronaut)
    }).then(() => {
      // console.log('new astronaut added')
    })
  }
  else{
    setAstronauts([...astronauts]);
      fetch('http://localhost:3001/astronauts/' + tmpAstronaut.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(tmpAstronaut)
    }).then(() => {
      // console.log('new astronaut added')
    })
  }
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

     
  

  // const astronautData = require("./db.json")

  useEffect(() => {
    setTimeout(() => {
  fetch('http://localhost:3001/astronauts')
      .then(res => { //this is just a response object, not the data
       if(!res.ok) {  //when endpoint is falsy or doesn't exist
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
    },1000);
  }, [])
  

 
  return (
    <div className="astro-app">
      <header className="astro-header">
        <img src={logo} className="astro-img" alt="astronaut image" />
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
                              onSuperpowerChange={handleSuperpowerChange} />
            {isLoading && <Spinner/>}
            {astronauts && <AstronautsList astronauts={astronauts} onDeleteChange={handleDelete} onEditChange={handleEdit} />}
          </div>
        </main>
      </body>
    </div>
  );
}

export default App;
