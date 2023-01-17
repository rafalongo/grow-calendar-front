import { useState } from 'react';
import { useForm } from "react-hook-form";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Login() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            senha: ''
        }
    });

    const [isLogged, setIsLogged] = useState('');

    const onSubmit = async (d, e) => {
        console.log(JSON.stringify(d), e);

        var data = new FormData();
        data.append( "json", JSON.stringify( d ) );

        try {
            await fetch(e.target.action, {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(json => {
                
                console.log("AQUI ",json);
                window.localStorage.setItem('login', JSON.stringify(json));
                setIsLogged(window.localStorage.getItem('login'));;
                // if(json['data']['user_id']){
                    // return true;
                    // e.target.submit();
                // }
            });
        } catch (e) {
            // handle your error state here
            console.log("Something is wrong", e);
        }
    }
    const onError = (errors, e) => console.log(errors, e);

    return (
        <>
            <Header logged={isLogged} />
            <div>
            <form onSubmit={handleSubmit(onSubmit, onError)} action='http://localhost:8080/public_html/api/login' method='POST'>
                {/* <form onSubmit={async (ev) => {
                    ev.preventDefault();

                    console.log(ev.target.action);
                     await fetch(ev.target.action, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: 'rafalongo@gmail.com',
                            senha: '123456'
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then(response => response.json())
                    .then(json => console.log(json));
                    

                    // temp1.target.senha.value;
                    // console.log(ev);
                }} action='http://localhost:8080/public_html/api/login' method='POST'> */}
                    <div>
                        <label>E-mail:</label>
                        <input {...register("email", { required: true })} type="email" placeholder="Digite seu e-mail" />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input {...register("senha", { required: true })} type="password" placeholder="Digite sua senha" />
                    </div>
                    <button type={'submit'}>Enviar</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;