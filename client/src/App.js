
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import AllRoutes from './routes.jsx';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <AllRoutes/>
          
      </BrowserRouter>
      <ToastContainer theme='light'/>
    </div>
  );
}

export default App;
