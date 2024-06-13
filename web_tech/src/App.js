import {Routes,Route} from 'react-router-dom';
import Login from './Components/Login';
import Header from './Components/Header' 
import Update from './Components/Update';
import Form from './Components/Form';
function App() {
  return (
    <div>
      <Routes>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Header/>}/>
        <Route path="/update" element={<Update/>}/>
        <Route path="/add" element={<Form/>}/>


      </Routes>
    </div>  );
}

export default App;
