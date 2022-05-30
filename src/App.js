import { useState } from 'react';
import logo from './astronaut-look.png';
import './App.scss';

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [superpower, setSuperpower] = useState("");
  const astronautData = require("./MOCK_DATA.json")
  return (
    <div className="astro-app">
      <header className="astro-header">
        <img src={logo} className="astro-img" alt="astronaut image" />
      </header>
      <body>
        <main>
          <div className="astro-container">
            <form>
              <label htmlFor="superpower">
                Name:
                <input type="text" name="name" />
              </label>
              <label htmlFor="superpower">
                Surname:
                <input type="text" name="name" />
              </label>
              <label htmlFor="superpower">
                Superpower:
                <select name="superpower" id="superpower">
                  <option value="Flying">Flying</option>
                  <option value="Multitasking">Multitasking</option>
                  <option value="Speed">Speed</option>
                  <option value="Spelling">Spelling</option>
                </select>
              </label>
              <label htmlFor="birth">
                Date of birth:
                <input type="date" name="birth" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </main>
      </body>
    </div>
  );
}

export default App;
