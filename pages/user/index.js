import Header from '../../components/Header';
import Growths from '../../components/Growths';
import Footer from '../../components/Footer';

function User() {
    return (
        <>
            <Header />
            <div>
                <form action='http://localhost:8080/public_html/api/users' method='post'>
                    <div>
                        <label>Nome:</label>
                        <input type={'text'} name={'nome'} />
                    </div>
                    <div>
                        <label>E-mail:</label>
                        <input type={'email'} name={'email'} />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input type={'password'} name={'senha'} />
                    </div>
                    <button type={'submit'}>Enviar</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default User;