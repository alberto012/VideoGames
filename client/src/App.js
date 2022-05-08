import './App.css';

import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './components/PaginaPrincipal/Home';
import Details from './components/PaginaPrincipal/Details';

import Create from './components/PaginaPrincipal/Create';
import Landing from './components/Inicio/Landing';

function App() {
  
    return (
    <BrowserRouter>
    <div className="App">
  
    <Routes>
      <Route path="/"  element={<Landing/>} />
      <Route  path="/home" element={<Home/>} />
      <Route  path='/details/:id' element={<Details/>} />
      <Route  path='/created' element={<Create/>} />
      {/* <Route  path= "/" element={<Landing/>}/> */}
    
    </Routes >
    </div>
    </BrowserRouter>
    
  );
  
}

export default App;




  

