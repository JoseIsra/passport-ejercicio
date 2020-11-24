import React, {useState, useEffect} from 'react'
import './Login.css';
import axios from 'axios';
export const Login = () => {
    const [logdata, setLogdata] = useState({
        nombre: '',
        contraseña : ''
    })
    const [registerdata, setRegisterdata] = useState({
        nombre: '',
        contraseña : ''
    })

    const [usuario, setUsuario] = useState(null);


const handleLogin = (e)=>{
    setLogdata({
        ...logdata,
        [e.target.name]:e.target.value
    })
}

const handleRegister = (e)=>{
    setRegisterdata({
        ...registerdata,
        [e.target.name]:e.target.value
    })
}

    const enviarRegistro = async()=>{
        setRegisterdata({
            nombre:'',
            contraseña:''
        })
        
        await axios.post('http://localhost:3001/user',{
            nombre:registerdata.nombre,
            contraseña:registerdata.contraseña
        })
}

    const enviarFormulario = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/user/login',{
            nombre:logdata.nombre,
            contraseña:logdata.contraseña
        }).then((res) => {
            console.log(res);
        })
    }

    const traerUsuario = ()=>{
        axios.get('http://localhost:3001/user/ver')
        .then((response)=>{
            console.log(response.data);
        }).catch(err => console.log(err));
    };


    return (
        <div className="login_register">
            <div className="register__container">
                <h2>REGISTRATE</h2>
                <form onSubmit={enviarRegistro} >
                    <label>Nombre: </label>
                    <input
                        onChange={handleRegister}
                        value={registerdata.nombre}
                        type="text" name="nombre" />
                    <label>Contraseña: </label>
                    <input
                    value= {registerdata.contraseña}
                        onChange={handleRegister}
                        type="text" name="contraseña" />
                    <button type="submit">guardar</button>
                </form>
            </div>

            <div className="login__container">
                <h2>LOGEATE</h2>
                <form onSubmit ={enviarFormulario}>
                    <label>Nombre: </label>
                    <input
                    value={logdata.nombre}
                        onChange={handleLogin}
                        type="text" name="nombre" />
                    <label>Contraseña: </label>
                    <input
                        onChange={handleLogin}
                        value= {logdata.contraseña}
                        type="text" name="contraseña" />
                    <button type="submit">ingresar</button>
                </form>
            </div>

            <button onClick={traerUsuario} >VER USUARIO LOGEADO</button>

    {usuario ? <h1>BIENVENIDO {usuario.nombre}</h1> : <h1>no hay aun</h1>}
        </div>
    )
}
