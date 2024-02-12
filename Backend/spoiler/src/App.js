import logo from './logo.svg';
import './App.css';
import {useState, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function App() {
  const { t, i18n } = useTranslation();

  const [accessToken, setAccessToken] = useState("");
  const [pets, setPets] = useState([]);
  const accessTokenRef = useRef("");

  function doLogin() {
    const em = "doctor@pets.com";
    const pw = "Pet1234";

    axios.post('http://localhost:4000/login', {
      email: em,
      password: pw
    }).then((response) => {
      setAccessToken(response.data.access_token);
      accessTokenRef.current = response.data.access_token;
    }).then(() => {
      getPets();
    })
    .catch((error) => {
      window.alert(error.message);
    });
  }

  function getPets() {
    axios.get('http://localhost:4000/pets', {
      headers: {
        Authorization: "Bearer " + accessTokenRef.current
      }
    })
    .then((response) => {
      setPets(response.data);
      console.log(response.data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Token: {accessToken}</p>
        <button onClick={() => doLogin()}>{t("Login to system")}</button>
        <button onClick={() => i18n.changeLanguage("fi")}>Suomeksi</button>
        {pets.map((x, index) => <p>{t("Pet name")}: {x.name}</p>)}
      </header>
    </div>
  );
}

export default App;
