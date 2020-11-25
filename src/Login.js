import React, { useState } from 'react'
import './Login.css';
import axios from 'axios';


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
        await axios.post('http://localhost:4000/user',{
            nombre:registerdata.nombre,
            contraseña: registerdata.contraseña,
    } , {
        withCredentials:true
    })
     /*    axios({
method:'POST',
data:{
    nombre:registerdata.nombre,
    contraseña: registerdata.contraseña,
    },
    withCredentials:true,
    url:'http://localhost:4000/user'
        }).then((res)=>console.log(res)); */
    };

    const enviarFormulario = async() => {
        const respuesta = await axios.post('http://localhost:4000/user/login',{
            nombre:logdata.nombre,
            contraseña: logdata.contraseña,
    }, {
        withCredentials:true
    })
    console.log(respuesta);
/*      axios({
method:'POST',
data:{
    nombre:logdata.nombre,
    contraseña: logdata.contraseña,
    },
    withCredentials:true,
    url:'http://localhost:4000/user/login'
        }).then((res)=>console.log(res)); */
    };

    const traerUsuario = () => {
        axios.get('http://localhost:4000/user/usuario', {
            withCredentials:true
        })
        .then((res)=> {
            setUsuario(res.data);
            console.log(res.data);
        })
    /*     axios({
method:'GET',
    withCredentials:true,
    url:'http://localhost:4000/user/usuario'
        }).then((res)=> {
            setUsuario(res.data);
            console.log(res.data);
        }); */
    };

    return (
        <div className="login_register">
            <div className="register__container">
                <h2>REGISTRATE</h2>
                
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
                <h2>LOGEATE</h2>
                
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

            <button onClick={traerUsuario} >VER USUARIO LOGEADO</button>

            { usuario ? <h1>BIENVENIDO {usuario.nombre}</h1> : <h1>no hay aun</h1>}
        </div>
    )
}
