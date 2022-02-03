import './App.css';
import { useEffect } from 'react'
import Postbutton from './components/Postbutton';


function App() {

  useEffect(() => {
    // console.log('ue');
    fetchMovies()
  }, [])

  async function fetchMovies() {
    let response = await fetch('http://localhost:4000/');
    // waits until the request completes...
    response = await response.json()
    // console.log(response);
  }

  return (
    <div className="App">
      <Postbutton />

    </div>
  );
}

export default App;
