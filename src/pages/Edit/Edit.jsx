import { useEffect, useRef, useState } from 'react'
import { PeliculasContext } from '../../context/Context'
import './Edit.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListaPeliculas } from '../../components/Lista/Lista'
import { Header } from '../../components/Header/Header'
import {Footer} from '../../components/Footer/Footer'



export const Edit = () => {

    //Importamos el archivo de entorno para la url.

    const {VITE_ED} = import.meta.env
    

    //Definimos useState pare guardar los datos

    const [ peliculas , setPeliculas] = useState([])
    //Definimos un state para el cambio de clases para mostrar y ocultar al hacer click en "update"
    const [ isActive , setIsactive ] = useState("")
    const toggleClass = (value) => setIsactive(value)
    //Definimos navigate con el hook useNavigate para poder navegar entre paginas
    const navigate = useNavigate()

    //Definimos las referencias para los formularios.

    const formularioPut = useRef()

    //Definimos las funciones, para recibir los datos en el fetch , poder modificar, eliminar y añadir mediante formularios.
    //Tambien incluimos form['el name que sea'].value="" con el valor vacio para que al ejecutar el submit, los campos vuelvan a estar vacios en el formulario

    const pedirDatos = async () => {
        
        let controler = new AbortController

        let options = {
            method : 'get',
            signal : controler.signal
        }
        await fetch(VITE_ED , options)
        .then( res => res.json() )
        .then( data => setPeliculas(data) )
        .catch( err => console.log(err.message) )
        .finally( ()=> controler.abort() )
    }
    //Funcion que eliminara la pelicula de la base de datos buscando su id 
    const deletePelicula = async (_id) => {
       
        let controler = new AbortController

        let options = {
            method : 'delete',
            signal : controler.signal
        }
        await fetch( `${VITE_ED}/_id/${_id}` , options)
        .then( res => res.json() )
        .then( data => setPeliculas(data) )
        .catch( err => console.log(err.message) )
        .finally( () => controler.abort() )

    }
    //Funcion que se asociara al boton de actualizar para que recoja los datos
    const putPeliculaBtn = (_id) => {
        
        const buscar = peliculas.find( pelicula => pelicula._id === _id)
        
        const { current : form } = formularioPut
        
        form['_id'].value = buscar._id
        form['title'].value = buscar.title
        form['year'].value = buscar.year
        form['director'].value = buscar.director
        form['genre'].value = buscar.genre
        form['synopsis'].value = buscar.synopsis
        form['trailer'].value = buscar.trailer
    }
    //Funcion que actualizara los datos del formulario al hacer submit
    const putPelicula = async (e) => {
        e.preventDefault()
        
        const { current : form } = formularioPut

        const actualizar = {
            _id : form['_id'].value,
            title : form['title'].value,
            year : form['year'].value,
            director : form['director'].value,
            genre : form['genre'].value,
            synopsis : form['synopsis'].value,
            trailer : form['trailer'].value
        }
            form['title'].value=""
            form['year'].value=""
            form['director'].value=""
            form['genre'].value=""
            form['synopsis'].value=""
            form['trailer'].valie=""

        let controler = new AbortController

        let options = {
            method : 'put',
            signal : controler.signal,
            body : JSON.stringify(actualizar),
            headers : {
                "Content-type" : "application/json"
            }
        }
        await fetch( VITE_ED , options )
        .then( res => res.json() )
        .then( data => setPeliculas(data) )
        .catch( err => console.log(err.message) )
        .finally( ()=> controler.abort() )
    }
    //Funcion para navegar hasta otra pagina desde un boton
    const homeBtnHandler = () => {
        navigate('/home')
    }



    //Utilizamos el Effect para ejecutar el código cuando se renderiza el componente y  si login no es "true" navegara de vuelta al "login"

    useEffect(() => {

        
        let login = JSON.parse(localStorage.getItem('username'))

        if(!login) {
            navigate('/')
        }

        pedirDatos()
    } , [])

    return(
        
        <>
            <PeliculasContext.Provider value={{ deletePelicula , putPeliculaBtn , toggleClass, isActive }}>
                
                <Header />

                <section className="Edit-section">

                    <h2 className="Edit-list">Movie List</h2>
                    
                    <ul className="Edit-ul">
                        {peliculas.length === 0 && <li className="Edit-li">Not movies</li>}
                        {peliculas.length != 0 && peliculas.map( pelicula =>

                        <ListaPeliculas  key={pelicula._id} {...pelicula} />
                        
                        )}
                    </ul>

                    <form className={`Edit-form ${isActive ? 'isActive' : ''}`} ref={formularioPut} onSubmit={putPelicula}>
                        <h2 className="Edit-h2">Update a Movie</h2>
                        <input type="hidden" name="_id" />
                        
                        <label htmlFor="first">Title</label>
                        <input type="text" name="title" id='first' className='Edit-input' placeholder='Title' />

                        <label htmlFor="second">Year</label>
                        <input type="text" name="year" id='second' className='Edit-input' placeholder='Year' />

                        <label htmlFor="third">Director</label>
                        <input type="text" name="director" id='third' className='Edit-input' placeholder='Director' />

                        <label htmlFor="fourth">Genre</label>
                        <input type="text" name="genre" id='fourth' className='Edit-input' placeholder='Genre' />

                        <label htmlFor="fifth">Synopsis</label>
                        <input type="text" name="synopsis" id='fifth' className='Edit-input--synopsis' placeholder='Synopsis' />

                        <label htmlFor="sixth">Url Trailer</label>
                        <input type="text" name="trailer" id='sixth' className='Edit-input' placeholder='Url Trailer' />

                        <input type="submit" onClick={() => toggleClass("")} className='Edit-input submit'  value="Update" />
                    </form>
                </section>

                <Footer />
            </PeliculasContext.Provider>
        </>
    )
}

