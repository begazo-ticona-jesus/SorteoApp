import { useState, useRef } from "react";
import teams from "../../Teams.json";
import congratulations from "../../assets/congrat.gif";

const SorteoRuleta = () => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const winnerRef = useRef(null);
    const sliceAngle = teams.length > 0 ? 360 / teams.length : 0;

    const spin = () => {
        if (!isSpinning) {
            setWinner(null);
            setIsSpinning(true);
            setShowConfetti(false);

            const fullRotations = Math.floor(Math.random() * 3 + 5) * 360;
            const randomRotation = fullRotations + Math.random() * 360;
            setRotation(randomRotation);

            setTimeout(() => {
                const finalRotation = (randomRotation % 360);
                const selectedIndex = Math.floor(finalRotation / sliceAngle);
                const adjustedIndex = (teams.length - 1 - selectedIndex) % teams.length;

                setWinner(teams[adjustedIndex]);
                setIsSpinning(false);
                setShowConfetti(true);

                setTimeout(() => {
                    winnerRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);

                setTimeout(() => {
                    setShowConfetti(false);
                }, 2500);
            }, 3000);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 p-8 relative">
            {showConfetti && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
                    <img src={congratulations} alt="Confeti" className="w-full h-full object-cover" />
                </div>
            )}
            <h2 className="text-xl font-bold">Sorteo Ruleta</h2>
            <div className="relative w-[500px] h-[500px]">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-t-[40px] border-l-transparent border-r-transparent border-t-green-500"></div>
                </div>

                <div
                    className="absolute w-full h-full transition-transform duration-[3s] ease-out mt-10"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {teams.map((team, index) => {
                            const startAngle = index * sliceAngle;
                            const endAngle = (index + 1) * sliceAngle;
                            const startRad = ((startAngle - 90) * Math.PI) / 180;
                            const endRad = ((endAngle - 90) * Math.PI) / 180;
                            const x1 = 50 + 50 * Math.cos(startRad);
                            const y1 = 50 + 50 * Math.sin(startRad);
                            const x2 = 50 + 50 * Math.cos(endRad);
                            const y2 = 50 + 50 * Math.sin(endRad);
                            return (
                                <g key={team.name}>
                                    <path
                                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                                        fill={index % 2 === 0 ? "#93C5FD" : "#FCA5A5"}
                                        stroke="white"
                                        strokeWidth="0.5"
                                    />
                                    <image
                                        href={team.logo}
                                        x="46"
                                        y="32"
                                        width="8"
                                        height="8"
                                        transform={`rotate(${startAngle + sliceAngle / 2} 50 50) translate(0, -28)`}
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
            <div className="flex gap-4 mt-28">
                <button onClick={spin} disabled={isSpinning} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-xl rounded-lg disabled:opacity-50">
                    Girar
                </button>
            </div>

            <div className="mt-8 text-lg flex flex-col items-center relative" ref={winnerRef}>
                {winner && !isSpinning ? (
                    <div className="flex flex-col items-center gap-2 p-4 border bg-green-400 rounded-lg shadow-lg relative">
                        <img src={winner.logo} alt={winner.name} className="w-44 h-44 object-contain" />
                        <p className="text-gray-900 text-xl font-bold relative z-20">{winner.name}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Esperando el resultado...</p>
                )}
            </div>
        </div>
    );
};

export default SorteoRuleta;
