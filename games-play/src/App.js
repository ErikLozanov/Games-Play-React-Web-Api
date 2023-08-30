import {Routes, Route, useNavigate} from 'react-router-dom';

import * as gameService from "./services/gameService";

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
  console.log(games);
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

  return (
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

  );
}

export default App;
