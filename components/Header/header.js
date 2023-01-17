import { useState, useEffect } from 'react';
// import { useLogin } from './useLogin';
import classes from './header.module.css';

/**
* @param {Object} props 
*/

const Header = props => {
    const { logged } = props;

    const [isLogged, setIsLogged] = useState({});

    useEffect(() => {
        var login = JSON.parse(window.localStorage.getItem('login'));
        setIsLogged(login['data']);
    }, [logged]);

    return (
        <header className={classes.header}>
            <h1>Grow Calendar</h1>
            <nav>
                <ul>
                    <li>
                        <a href={'/'}>Página Inicial</a>
                    </li>
                    <li>
                        <a href={'/user'}>Cadastrar Usuário</a>
                    </li>
                    <li>
                        <a href={'/login'}>Login</a>
                    </li>
                </ul>
            </nav>
            <h2>{`Olá, ${isLogged['user_name']}`}</h2>
        </header>
    );
}

export default Header;
