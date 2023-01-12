import React from 'react';
import classes from './header.module.css';

/**
* @param {Object} props 
*/

const Header = props => {
    const { } = props;

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
                </ul>
            </nav>
        </header>
    );
}

export default Header;
