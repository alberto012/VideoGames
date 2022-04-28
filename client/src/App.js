import './App.css';
import Landing from './components/Inicio/Landing'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './components/PaginaPrincipal/Home';
import Form from './components/PaginaPrincipal/form'
import Card from './components/Cards/Card';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Henry Videogames</h1>
    <Routes>
      <Route path="/"  element={<Landing/>} />
      <Route  path="/home" element={<Home/>} />
      <Route  path='/videogame/:id' element={<Card/>} />
      <Route  path='/form' element={<Form/>} />
      <Route  path= "/" element={<Landing/>}/>
    
    </Routes >
    </div>
    </BrowserRouter>
    
  );
  
}

export default App;




  

