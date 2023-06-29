import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProblemPage from './pages/ProblemPage'


function App() {
  return (
    <div className="App">
          <BrowserRouter>
          <Navbar />
            <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}/>
              <Route path='/problem/:number'
              element={<ProblemPage />}  />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
