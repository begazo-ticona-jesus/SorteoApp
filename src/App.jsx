import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import SorteoEquipos from './components/sEquipos/sorteoEquipos';
import SorteoRuleta from './components/match/Roulette';
import Home from './components/home/Home';


function App() {
  return (
    <Router>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sorteo-champions" element={<SorteoEquipos />} />
          <Route path="/sorteo-ruleta" element={<SorteoRuleta/>} />
          {/* <Route path="/registrarse" element={<div>Registrarse</div>} />
          <Route path="/iniciar-sesion" element={<div>Iniciar Sesión</div>} /> */}
        </Routes>
      </main>

    </Router>
  );
}

export default App;
