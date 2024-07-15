import { useEffect, useState } from 'react'
import './Login.css'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


export const Login = () => {

    //Definimos el estate Usenavigate para poder navegar a la pagina Home cuando el login sea correcto y si no se muestre el componente un ErrorLogin
    const navigate = useNavigate()
    //States para recibir la informacion del login y la respuesta del error si lo que se reciben no son los datos correctos
    const [ login , setLogin ] = useState(null)
    const [ error , setError ] = useState(false)

    //Importada variable de entorno
    const {VITE_API} = import.meta.env

    //Usefect para ejecutar el codigo y si login es "true" navegara hasta la pagina "home". Si la sesion ya fue iniciada automaticamente al cargar la pagina ira a "home"
    useEffect( () => {

        let login = JSON.parse(localStorage.getItem('username'))

        if(login) {
            navigate('/home')
        }

    } , [login])

    //Useref para crear la referencia utilizada en el formulario
    const formulario = useRef()

    //Funcion para poder introducir los datos de inicio de sesion en los inputs del formulario
    const postLogin = async (e) => {
        e.preventDefault()

        const { current : form } = formulario

        const nuevo = {
            username : form['username'].value,
            password : form['password'].value
        }

        let controler = new AbortController()

        let options = {
            method : 'post',
            signal : controler.signal,
            body : JSON.stringify(nuevo),
            headers : {
                "Content-type" : "application/json"
            }

        }

        await fetch( VITE_API , options)
        .then( res => res.json() )
        .then( data =>  {
            if(data.login){
                setLogin(data.login), setError(!data.login) 
                localStorage.setItem('username' , JSON.stringify({login : true}))
            }
        })
            
        .catch( err => console.log(err.message), setError(true) )
        .finally( ()=> controler.abort() )
    }

    


    return(
        
            <section className="Login">
                <h2 className='Login-h2'>Login</h2>

                <form ref={formulario} onSubmit={postLogin} className="Login-form">

                    <div className="Login-user">
                        <label htmlFor="first">Username</label>
                        <input type="text" className='Login-input' name='username' id='first' placeholder='Type your Username...' required/>
                    </div>

                    <div className="Login-user">
                        <label htmlFor="second">Password</label>
                        <input className='Login-input' type="password"  name='password' id='second' placeholder='Type your Password...' required />
                    </div>
                    
                    <input type="submit" title='Log in' className='Login-submit' value="Sing in" />

                </form>

                { error && <ErrorLogin/> }

            </section> 

            
        
    )
}

const ErrorLogin = () => {

    return(

        <div className="Loggin-message">
            <span className="Loggin-span">Failed to login!!</span>
        </div>
    )
}