import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';


// import './App.css';
// import NavigationBar from './Navbar2';
// import Main2 from './Main2';
import Main from './Main';
import LoginPage from './login';
import Registration from './Registration';
import NotFound from './NotFound';
import Result from "./result"

function App() {
  return (
    
      <div className="App">
        {/* <NavigationBar/> */}
        {/* <div className='contents'> */}
        <Router>
          <Routes>
          <Route path="/Registration" element={ <Registration/> }/>

            <Route path="/" element={ <LoginPage/> }/>
            <Route path="/Index" element={ <Main/> }/>
            <Route path="/result" element={<Result/>}/>
            <Route path='*' element={<NotFound/>}/>

            
          </Routes>
          </Router>
        {/* </div> */}
      </div>
      
  );
}

export default App;
