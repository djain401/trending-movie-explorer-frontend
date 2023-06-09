import { useState } from 'react';
import './App.css';
import MovieRouter from './Router/MovieRouter';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from './UserContext/UserContext';
import { FavouriteContext } from './FavouriteContexts/FavouriteContext';
import Home from './pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieNavBar from './components/MovieNavbar';

function App() {
  const { isAuthenticated, user } = useAuth0();
  // These three variables belong with the favourites context
  const [showStar, setShowStar] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const [counterFavs, setCounterFavs] = useState(0);

  let fcount = 0; // for local storage
  if (window.localStorage.getItem('favCounter')) {
    fcount = window.localStorage.getItem('favCounter');
  }

  const [numFavourites, setNumFavourites] = useState(parseInt(fcount));

  // favourites context values object
  const favContextValues = {
    show: { showStar, setShowStar },
    numberClicked: { numFavourites, setNumFavourites },
    movieCheck: { idArray, setIdArray },
    totalFavs: { counterFavs, setCounterFavs },
  };

  return (
    <Router>
      <UserContext.Provider value={user}>
        <FavouriteContext.Provider value={favContextValues}>
          <MovieNavBar />
          <>
            {isAuthenticated && <MovieRouter />}
            {!isAuthenticated && <Home />}
          </>
        </FavouriteContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
