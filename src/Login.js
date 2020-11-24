import React, {useState} from 'react'
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
                <form>
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

            <button>VER USUARIO LOGEADO</button>

        </div>
    )
}
