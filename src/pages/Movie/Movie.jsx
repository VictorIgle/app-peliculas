import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Movie.css'
import { Header } from '../../components/Header/Header'
import {Footer} from '../../components/Footer/Footer'

export const Movie = () => {

    //Importamos la variable de entorno para la direccion del fetch
    const {VITE_MV} = import.meta.env
    //Definimos el State para guardar los datos del fetch
    const [pelicula , setPelicula] = useState([])
    //Definimos el parametro _id para poder utilizarlo posteriormente con useParams
    const {_id} = useParams()
    //Recibiremos los datos de una pelicula en concreto en base a su ID
    const pedirDatos = async () => {

        let controler = new AbortController

        let options = {
            method : 'get',
            signal : controler.signal
        }
        await fetch(`${VITE_MV}/${_id}` , options)
        .then( res => res.json() )
        .then( data => setPelicula(data) )
        .catch( err => console.log(err.message) )
        .finally( () => controler.abort() )
    }
    //Usefect para ejecutar el codigo y si login no es "true" navegara de vuelta al "login"
    useEffect(() => {

        window.scrollTo(0, 0)
        
        let login = JSON.parse(localStorage.getItem('username'))

        if(!login) {
            navigate('/')
        }

        pedirDatos()

    } , [_id])

    const { title , director , genre , synopsis , poster , year , trailer } =pelicula

    return(
        <>  
            <Header />

            <section className="Movie-section">
                <h2>Movie Detaills</h2>
                <div className="Movie-wrapper">
                    {pelicula === 0 && <span>Not info</span>}
                    <h3 className="Movie-h3">{title}</h3>
                    <img src={poster || '../assets/posters/poster-notimage.png'} alt={title} className='Movie-img' />
                    <span className="Movie-span">Direction: {director} </span>
                    <span className="Movie-span">Year: {year} </span>
                    <span className="Movie-span">Genre: {genre} </span>
                    <p className="Movie-p">Synopsis: {synopsis} </p>
                </div>

                <h3 className="Movie-h3">Trailer</h3>
                <div className="Movie-trailer">
                <iframe src={trailer} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
                </div>
                 
            </section>
            
            <Footer />
        </>
    )
}
