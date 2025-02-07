import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4 shadow-lg">
            <nav className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:opacity-75 transition duration-300">
                        <img
                            src={icon}
                            alt="Inicio"
                            className="w-8 h-8 text-white"
                        />
                    </Link>
                    <h1 className="text-white text-xl font-bold">Sorteos</h1>
                </div>
                <ul className="flex space-x-6 text-white">
                    <li>
                        <Link
                            to="/sorteo-champions"
                            className="hover:text-blue-950 transition duration-300"
                        >
                            Sorteo Champions
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/sorteo-ruleta"
                            className="hover:text-blue-950 transition duration-300"
                        >
                            Sorteo Ruleta
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;