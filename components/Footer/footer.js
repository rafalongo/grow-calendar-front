import React from 'react';
import classes from './footer.module.css';

/**
* @param {Object} props 
*/

const Footer = props => {
    const { } = props;

    return (
        <footer className={classes.footer}>
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
        </footer>
    );
}

export default Footer;
