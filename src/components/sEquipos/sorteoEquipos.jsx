import { useState, useRef } from 'react';
import TournamentBracket from '../match/TournamentMatch';
import congratulations from '../../assets/congrat.gif';
import teams from '../../Teams.json';

function SorteoEquipos() {
    const [cantidadJugadores, setCantidadJugadores] = useState('');
    const [jugadores, setJugadores] = useState([]);
    const [jugadoresSorteados, setJugadoresSorteados] = useState([]);
    const [error, setError] = useState(false);
    const [mostrarBracket, setMostrarBracket] = useState(false);
    const [keyBracket, setKeyBracket] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const bracketRef = useRef(null);

    const handleInputChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 3 && value <= 16) {
            setError(false);
            setCantidadJugadores(value);
            setJugadores(new Array(value).fill(''));
            setMostrarBracket(false);
        } else {
            setError(true);
            setCantidadJugadores(e.target.value);
        }
    };

    const handleJugadorChange = (index, e) => {
        const nuevosJugadores = [...jugadores];
        nuevosJugadores[index] = e.target.value;
        setJugadores(nuevosJugadores);
    };

    const handleSortear = () => {
        // Resetear el componente TournamentBracket cambiando la clave
        setKeyBracket(prevKey => prevKey + 1);
        setMostrarBracket(false);
        setShowConfetti(false);

        setTimeout(() => {
            const equiposAleatorios = [...teams].sort(() => Math.random() - 0.5).slice(0, jugadores.length);
            const jugadoresConEquipos = jugadores.map((nombre, index) => ({
                nombre,
                equipo: equiposAleatorios[index].name,
                logo: equiposAleatorios[index].logo
            }));

            const jugadoresSorteados = [...jugadoresConEquipos].sort(() => Math.random() - 0.5);
            setJugadoresSorteados(jugadoresSorteados);
            setMostrarBracket(true);
            setShowConfetti(true);

            // Scroll suave hacia el bracket
            setTimeout(() => {
                bracketRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

            // Ocultar el confeti después de 3 segundos
            setTimeout(() => {
                setShowConfetti(false);
            }, 2500);
        }, 100);
    };

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            <h1 className="text-2xl font-bold">Sorteo de Equipos</h1>
            <p className="text-gray-600">En esta sección se realizará el sorteo de equipos.</p>
            <div className="w-full max-w-sm">
                <input
                    type="number"
                    min={3}
                    max={16}
                    value={cantidadJugadores}
                    placeholder="Cantidad de Jugadores"
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error && (
                    <span className="text-red-500 text-sm">
                        Los jugadores deben ser de 3 a 16.
                    </span>
                )}
            </div>
            {jugadores.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    {jugadores.map((jugador, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Jugador ${index + 1}`}
                            value={jugador}
                            onChange={(e) => handleJugadorChange(index, e)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    ))}
                </div>
            )}
            {jugadores.length > 0 && (
                <button
                    onClick={handleSortear}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Sortear
                </button>
            )}
            <div ref={bracketRef} className="relative w-full">
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                        <img
                            src={congratulations}
                            alt="Confeti"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                {mostrarBracket && <TournamentBracket key={keyBracket} jugadores={jugadoresSorteados} />}
            </div>
        </div>
    );
}

export default SorteoEquipos;