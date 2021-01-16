import React, { useState ,useEffect} from 'react'
import './Login.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export const Login = () => {
    const [logdata, setLogdata] = useState({
        nombre: '',
        contraseña: ''
    })
    const [registerdata, setRegisterdata] = useState({
        nombre: '',
        contraseña: ''
    })

    const [usuario, setUsuario] = useState(null);
    
    const readCookie = ()=>{
        let data = Cookies.get('user');
        if(data !== undefined){
            data=JSON.parse(data);
            setUsuario(data.nombre);
            
        }
        
    }
    useEffect(()=>{
        readCookie();
    },[]);


    const handleLogin = (e) => {
        setLogdata({
            ...logdata,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        setRegisterdata({
            ...registerdata,
            [e.target.name]: e.target.value
        })
    }

    const enviarRegistro = async() => {
        await axios.post('https://backen-ejercicio-passport.herokuapp.com/user',{
            nombre:registerdata.nombre,
            contraseña: registerdata.contraseña,
    })
        }

    const enviarFormulario = async() => {
        try{
            const respuesta = await axios.post('https://backen-ejercicio-passport.herokuapp.com/user/login',{
                nombre:logdata.nombre,
                contraseña: logdata.contraseña,
        })
        console.log(respuesta);
        //setUsuario(respuesta.data.nombre);
        Cookies.set('user',respuesta.data);
      //  setHayUser(true);
        window.location.reload();
        
        }catch(err){
            console.log(err);
        }
        }

        const cerrarSesion =()=>{
            Cookies.remove('user');
            setUsuario(null);
            window.location.reload();
        }
    
    return (
        <div className="login_register">
            <div className="register__container">
                <h2>REGISTRATE CRIATURA</h2>
                
                    <label>Nombre: </label>
                    <input
                        onChange={handleRegister}
                        value={registerdata.nombre}
                        type="text" name="nombre" />
                    <label>Contraseña: </label>
                    <input
                        value={registerdata.contraseña}
                        onChange={handleRegister}
                        type="text" name="contraseña" />
                    <button
                    onClick ={enviarRegistro}
                    >guardar</button>
            </div>

            <div className="login__container">
                <h2>LOGEATE PINCHE CARNAL</h2>
                
                    <label>Nombre: </label>
                    <input
                        value={logdata.nombre}
                        onChange={handleLogin}
                        type="text" name="nombre" />
                    <label>Contraseña: </label>
                    <input
                        onChange={handleLogin}
                        value={logdata.contraseña}
                        type="text" name="contraseña" />
                    <button 
                    onClick={enviarFormulario}
                    >ingresar</button>
            
            </div>



            { usuario ? <h1>BIENVENIDO {usuario}</h1> : <h1>no hay aun</h1>}
            <button onClick={cerrarSesion}>LOG OUT </button>
        </div>
    )
}
