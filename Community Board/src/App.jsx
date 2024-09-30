import './App.css';
import Grid from "./assets/components/Grid";
import musicImage from './images/Hackathonimage_2.png';


const App = () => {

  return (
    <div className="App">
      <img src={musicImage} alt="music-image" className='music-image-transform'/>
      <h1>Upcoming Hackathons</h1>
      <h2>Welcome. Register for some upcoming Hackathons</h2>
      <Grid />
    </div>
  )
}

export default App
