import {useEffect, useRef, useState } from 'react'
import {Header} from '../../components/Header/Header'
import {Footer} from '../../components/Footer/Footer'

import ('./Add.css')

export const Add = () => {

    //Archivos de entorno importados
    const {VITE_DD} = import.meta.env

    //State para guardar los datos y usarlos en el fetch
    const [peliculas , setPeliculas] = useState([])

     //Definimos las referencias para los formularios.

     const formularioAdd = useRef()

    //Peticion para recibir los datos
    const pedirDatos = async () =>{

        let controler = new AbortController

        let options = {

            method : 'get',
            signal : controler.signal
        }
        await fetch( VITE_DD , options )
        .then( res => res.json() )
        .then( data => setPeliculas(data) )
        .catch( err => console.log( err.message) )
        .finally( () => controler.abort() )

    }


    const postPelicula = async (e) => {
        e.preventDefault()
        
        const { current : form } = formularioAdd

        const nueva = {
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
            form['trailer'].value=""
        
        let controler = new AbortController

        let options = {
            method : 'post',
            signal : controler.signal,
            body : JSON.stringify(nueva),
            headers : {
                "Content-type" : "application/json"
            }
        }

        await fetch( VITE_DD , options)
        .then( res => res.json() )
        .then( data => setPeliculas(data) )
        .catch( err => console.log(err.message) )
        .finally( () => controler.abort() )
    }

    //UseEffect para ejecutar el codigo y renderizar el componente y si login no es "true" navegara de vuelta a "login"
    useEffect(() => {

        
        let login = JSON.parse(localStorage.getItem('username'))

        if(!login) {
            navigate('/')
        }

        pedirDatos()

    } , [])

    return(
        <>
        
        <Header />
        <section className='Add-section'>
            <h2 className="Add-h2">Add a Movie</h2>
                <form ref={formularioAdd} onSubmit={postPelicula}>
                    <label htmlFor="first">Title</label>
                    <input type="text" name="title" id='first' className='Add-input' placeholder='Title' />

                    <label htmlFor="second">Year</label>
                    <input type="text" name="year" id='second' className='Add-input' placeholder='Year' />

                    <label htmlFor="third">Director</label>
                    <input type="text" name="director" id='third' className='Add-input' placeholder='Director' />

                    <label htmlFor="fourth">Genre</label>
                    <input type="text" name="genre" id='fourth' className='Add-input' placeholder='Genre' />

                    <label htmlFor="fifth">Synopsis</label>
                    <input type="text" name="synopsis" id='fifth' className='Add-input--synopsis' placeholder='Synopsis' />

                    <label htmlFor="sixth">Url trailer</label>
                    <input type="text" name="trailer" id='sixth' className='Add-input' placeholder='Url: ejemp = https://www.youtube.com/embed/Video ID' />
                    
                    <input type="submit" className='Add-input submit'  value="Add Movie" />
                </form>
        </section>

        <Footer />
       
        </>
    )
}


