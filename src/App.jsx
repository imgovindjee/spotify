import { useEffect } from 'react'
import Login from './components/Login/Login'
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import Spotify from './components/Spotify/Spotify';

import './App.css'


function App() {

  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    console.log(hash);
    if (hash) {
      const token = hash.substring(1).split("&")[0].split('=')[1];
      console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);


  return (
    <div className='app_container'>
      {
        token ? <Spotify /> : <Login />
      }
    </div>
  )
}

export default App


// http://localhost:5173/#access_token=BQDUO8F8MBpu9Tu1KzM5pXRLrXf5yeN0oxBf5SmIw1DJwFKspklcM27yj0lt5UIt6wanu-0TnaljJG-iBbgTvPaCDpuI2AmL1YihJ2r3bRVxvCrgspbOslylKns0gP5g9P6vE8ZbEODrQI1_LmGWiZEvetJftL4VAuQN3K_1eAJjC2dl8fi0vXI2sLrFmDlW6lRs6D6240ozq3P7pH5Q4lhnSJFjhELtlGRQ&token_type=Bearer&expires_in=3600
