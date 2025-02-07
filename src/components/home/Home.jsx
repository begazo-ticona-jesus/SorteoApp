import ruletaScreenshot from '../../assets/ruleta-screenshot.png';
import torneoScreenshot from '../../assets/torneo-screenshot.png';
import participantesScreenshot from '../../assets/participantes-screenshot.png';
import participantes from '../../Teams.json';

const Home = () => {
    return (
        <div className="flex flex-col items-center gap-10 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Bienvenido a la App de Sorteos de Futbol</h1>

            {/* Resumen de Sorteo por Ruleta */}
            <section className="w-full text-center">
                <h2 className="text-2xl font-semibold mb-4">Sorteo por Ruleta</h2>
                <p className="text-lg mb-4">Usamos una ruleta para asignar equipos de manera aleatoria. ¡Es una forma divertida y emocionante de iniciar el torneo, añadiendo un toque de sorpresa y dinamismo al proceso!</p>
                <div className="mb-6">
                    <img
                        src={ruletaScreenshot}
                        alt="Captura de pantalla de la ruleta"
                        className="w-full sm:max-w-lg lg:max-w-xl mx-auto rounded-lg shadow-md"
                    />
                </div>
            </section>

            {/* Resumen de Torneo de Eliminación Directa */}
            <section className="w-full text-center">
                <h2 className="text-2xl font-semibold mb-4">Sorteo de Eliminatorias</h2>
                <p className="text-lg mb-4">
                    El torneo se lleva a cabo en rondas de eliminación directa, donde los equipos compiten por un lugar en la final. Tú decides qué equipo avanza a la siguiente ronda, ¡añadiendo emoción al proceso! A medida que los equipos se enfrentan, los eliminados quedan fuera y el campeón es coronado al final.
                </p>
                <div className="mb-6">
                    <img
                        src={torneoScreenshot}
                        alt="Captura de pantalla del torneo"
                        className="w-full sm:max-w-lg lg:max-w-xl mx-auto rounded-lg shadow-md"
                    />
                </div>
            </section>

            {/* Sección de Participantes */}
            <section className="w-full text-center">
                <h2 className="text-2xl font-semibold mb-4">Participantes</h2>
                <p className="text-lg mb-4">El sorteo puede incluir hasta 16 participantes, a quienes se les asignarán equipos diferentes y enfrentamientos únicos para cada ronda.</p>
                <div className="mb-6">
                    <img
                        src={participantesScreenshot}
                        alt="Captura de pantalla de los participantes"
                        className="w-full sm:max-w-lg lg:max-w-xl mx-auto rounded-lg shadow-md"
                    />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {participantes.map((team, index) => (
                        <div key={index} className="flex flex-col items-center border p-4 rounded-lg shadow-lg">
                            <img src={team.logo} alt={team.name} className="w-20 h-20 object-contain mb-2" />
                            <p className="text-lg font-semibold">{team.name}</p>
                            <p className="text-sm text-gray-500">{team.equipo}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
