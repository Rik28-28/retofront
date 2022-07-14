import './App.css';
import ChooseQuestion from './pages/ChooseQuestion';
import Questions from './pages/Questions';
import { Routes, Route } from "react-router-dom";
import Congratulations from './pages/Congratulations';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChooseQuestion />} />
        <Route path="questions" element={<Questions />} />
        <Route path="congratulations" element={<Congratulations />} />
      </Routes>  
    </div>
  );
}

export default App;
