import PropTypes from 'prop-types';
import { useState } from 'react';

const TournamentBracket = ({ jugadores }) => {
    const rows = 15;
    const cols = 8;

    const [jugadoresEnRonda, setJugadoresEnRonda] = useState({});

    const rounds = {
        octavos: [
            [[0, 0], [2, 0]], [[0, 7], [2, 7]], [[8, 0], [10, 0]], [[8, 7], [10, 7]],
            [[4, 0], [6, 0]], [[4, 7], [6, 7]], [[12, 0], [14, 0]], [[12, 7], [14, 7]]
        ],
        cuartos: [
            [[1, 1], [5, 1]], [[1, 6], [5, 6]], [[9, 1], [13, 1]], [[9, 6], [13, 6]]
        ],
        semis: [
            [[3, 2], [11, 2]], [[3, 5], [11, 5]]
        ],
        final: [
            [[7, 3], [7, 4]]
        ]
    };

    const getCoordinates = () => {
        if (jugadores.length >= 9 && jugadores.length <= 16) return rounds.octavos;
        if (jugadores.length >= 5 && jugadores.length <= 8) return rounds.cuartos;
        if (jugadores.length >= 3 && jugadores.length <= 4) return rounds.semis;
        return [];
    };

    const coordinates = getCoordinates();

    const calcularSiguienteRonda = ([x1, y1], [x2, y2]) => {
        const nuevaX = (x1 + x2) / 2;
        const nuevaY = y1 < 4 ? y1 + 1 : y2 - 1;
        return [nuevaX, nuevaY];
    };

    const findOpponent = (row, col) => {
        // Buscar en las coordenadas de las rondas actuales
        for (const round of Object.values(rounds)) {
            for (const [cell1, cell2] of round) {
                if (cell1[0] === row && cell1[1] === col) return cell2; // Oponente es la segunda celda
                if (cell2[0] === row && cell2[1] === col) return cell1; // Oponente es la primera celda
            }
        }
        return null; // No pertenece a ninguna ronda conocida
    };

    const handleCellClick = (row, col, jugador) => {
        if (!jugador) return;

        // Verificar si la celda pertenece a la final
        const isFinal = rounds.final.some(match =>
            match.some(([r, c]) => r === row && c === col)
        );

        if (isFinal) {
            console.warn(`La celda (${row}, ${col}) pertenece a la final y no se puede seleccionar un ganador.`);
            return; // No permitir seleccionar un ganador en la final
        }

        // Encontrar al oponente de la celda seleccionada
        const oponente = findOpponent(row, col);

        if (!oponente) {
            console.warn(`La celda (${row}, ${col}) no pertenece a una ronda conocida.`);
            return;
        }

        // Calcular la posición del ganador en la siguiente ronda
        const siguienteRondaCoords = calcularSiguienteRonda([row, col], oponente);

        if (siguienteRondaCoords) {
            const [nextX, nextY] = siguienteRondaCoords;
            setJugadoresEnRonda(prev => ({
                ...prev,
                [`${nextX},${nextY}`]: jugador
            }));
        }
    };


    const getColorClass = (row, col) => {
        const matchIndex = coordinates.findIndex(pair =>
            pair.some(([r, c]) => r === row && c === col)
        );

        if (matchIndex !== -1) {
            return matchIndex < coordinates.length / 2 ? 'bg-blue-300' : 'bg-red-300';
        }

        if (jugadoresEnRonda[`${row},${col}`]) {
            return 'bg-green-300'; // Color para las celdas de la siguiente ronda con un jugador seleccionado
        }

        return '';
    };

    const getJugador = (row, col) => {
        if (jugadoresEnRonda[`${row},${col}`]) {
            return jugadoresEnRonda[`${row},${col}`];
        }

        const matchIndex = coordinates.findIndex(pair =>
            pair.some(([r, c]) => r === row && c === col)
        );
        if (matchIndex === -1) return '';

        const playerIndex = coordinates[matchIndex].findIndex(([r, c]) => r === row && c === col);
        return jugadores[matchIndex * 2 + playerIndex] || '';
    };

    const renderCell = (row, col) => {
        const jugador = getJugador(row, col);
        const coord = [row, col];

        // Determinar qué rondas deben resaltarse según la cantidad de jugadores
        let roundsToHighlight = [];
        if (jugadores.length >= 9 && jugadores.length <= 16) {
            roundsToHighlight = [...rounds.octavos, ...rounds.cuartos, ...rounds.semis, ...rounds.final];
        } else if (jugadores.length >= 5 && jugadores.length <= 8) {
            roundsToHighlight = [...rounds.cuartos, ...rounds.semis, ...rounds.final];
        } else if (jugadores.length >= 3 && jugadores.length <= 4) {
            roundsToHighlight = [...rounds.semis, ...rounds.final];
        }

        // Verificar si la celda pertenece a las rondas que deben resaltarse
        const isInHighlightedRounds = roundsToHighlight.some(match =>
            match.some(position => position[0] === coord[0] && position[1] === coord[1])
        );

        return (
            <td
                key={`${row}-${col}`}
                className={`
                    ${isInHighlightedRounds ? 'border-gray-400 border-2 min-w-36 h-14' : 'h-0 overflow-hidden p-0'} 
                    p-1 
                    text-center 
                    ${getColorClass(row, col)}
                `}
                onClick={() => handleCellClick(row, col, jugador)}
            >
                <div className="flex items-center">
                    {jugador && (
                        <img src={jugador.logo} alt={jugador.equipo} className="w-7 h-7 mr-2" />
                    )}
                    <div className='w-full text-center'>
                        <p className="text-sm font-bold">{jugador.nombre}</p>
                        
                    </div>
                </div>
                <p className="text-xs text-gray-500">{jugador.equipo}</p>
            </td>
        );
        
    };

    const renderRows = () => {
        return Array.from({ length: rows }, (_, row) => (
            <tr key={row}>
                {Array.from({ length: cols }, (_, col) => renderCell(row, col))}
            </tr>
        ));
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="table-auto mx-auto border-separate [border-spacing:5px]">
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    );
};

TournamentBracket.propTypes = {
    jugadores: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TournamentBracket;
