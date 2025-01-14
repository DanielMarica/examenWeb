import { Link } from 'react-router-dom';
import { MaybeAuthenticatedUser } from '../type';
import './Navbar.css';

interface NavbarProps {
    authenticatedUser: MaybeAuthenticatedUser;
}

const Navbar = ({ authenticatedUser }: NavbarProps) => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/library">Library</Link></li>
                {authenticatedUser && (
                    <li><Link to="/add-page">AddPageBook</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
