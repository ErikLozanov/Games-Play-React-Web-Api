import {Routes, Route, useNavigate} from 'react-router-dom';

import * as gameService from "./services/gameService";
import { AuthContext } from './contexts/AuthContext';
import * as authService from "./services/authService";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer"
import { useEffect, useState } from 'react';
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Catalog } from "./components/Catalog/Catalog";
import { GameDetails } from './components/GameDetails/GameDetails';


function App() {
  const navigate = useNavigate();
  const [games,setGames] = useState([]);
  const [auth,setAuth] = useState({});

  useEffect(() => {
      gameService.getAll()
      .then(result => {
        setGames(result);
      })
  },[]);

  const onCreateGameSubmit = async (data) => {
    const newGame = await gameService.create(data);
    //TODO: add to state
    setGames(state => [...state, newGame]);
    //TODO: redirect to catalog
    navigate('/catalog');
  }

  const onLoginSubmit = async (data) => {
    try {

    const result = await authService.login(data);

    setAuth(result);

    navigate('/');
  }
  catch (error) {
    alert(error.message);
  }
};

  const context = {
    onLoginSubmit,
    userId: auth._id,
    token: auth.accesstoken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
    
  }

  return (
    <AuthContext.Provider value={context}>

      <div id="box">

        <Header />;
        <main id="main-content">
          <Routes>
            <Route path='/' element={<Home games={games}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
            <Route path='/catalog' element={<Catalog games={games}/>} />
            <Route path='/catalog/:gameId' element={<GameDetails />} />
          </Routes>
          </main>
        <Footer />
      </div>
      </AuthContext.Provider>
  );
}

export default App;
