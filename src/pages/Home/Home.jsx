import { useNavigate } from 'react-router-dom'
import './Home.css'
import { useEffect, useState } from 'react'
import { PeliculasContext } from '../../context/Context'
import { Header } from '../../components/Header/Header'
import { useContext } from 'react'
import { Footer } from '../../components/Footer/Footer'



export const Home = () => {
    
    //Archivos de entorno importados
    const {VITE_HM} = import.meta.env

    //State para guardar los datos y usarlos en el fetch
    const [peliculas , setPeliculas] = useState([])

    //State para guardar los datos de la barra del buscador 
    const [buscar , setBuscar ] = useState("")
    //Navigate de router-dom para definir posterioremente en funciones las rutas a otras paginas.
    const navigate = useNavigate()
    
    
    //Peticion para recibir los datos
    const pedirDatos = async () =>{

        let controler = new AbortController

        let options = {

            method : 'get',
            signal : controler.signal
        }
        await fetch( VITE_HM , options )
        .then( res => res.json() )
        .then( data => setPeliculas(data) )
        .catch( err => console.log( err.message) )
        .finally( () => controler.abort() )

    }
    //Metodo de busqueda para el input Search. Con el capturamos los valores escritos
     const buscador = (e) => {
        setBuscar(e.target.value)
     }

     //Metodo de filtrado. Si no se escribe nada, muestra los datos originales de peliculas y si se introduce un valore, se pasa a minusculas para no ser sensible a las mayusculas y se muestran los datos en base a la propiedad title
    const resultado = !buscar ? peliculas : peliculas.filter((datos) =>
         datos.title.toLowerCase().includes(buscar.toLocaleLowerCase()) )

    //Funcion para navegar hacia la pagina de cada pelicula.
    const imagenBtnHandler = (_id) => {
        navigate(`/movie/${_id}`)
    }

     //UseEffect para ejecutar el codigo y renderizar el componente y si login no es "true" navegara de vuelta al "login"
     useEffect(() => {

        let login = JSON.parse(localStorage.getItem('username'))

        if(!login) {
            navigate('/')
        }
       

        pedirDatos()

    } , [])

    return(
        <>
            <PeliculasContext.Provider value={{imagenBtnHandler , resultado , peliculas} }>
                
                <Header />

                <main className="Home-main">
                    <section className="Home">

                        <h2 className="Home-h2">Movie List</h2>

                        <div className="Home-browser">
                            <input value={buscar} onChange={buscador}  type="text" name="Search" id="Search" placeholder='Search' className='Home-search' />
                        </div>

                        <div className="Home-wrapper">
                            <ul className="Home-ul"></ul>
                            {peliculas.length === 0 && <span>No hay peliculas</span>}
                            {resultado.length != 0 && resultado.map( pelicula =>
                            
                            <Lista key={pelicula._id} {...pelicula} />
                        )}
                        </div>

                    </section>
                    <Footer />
                </main>
            
            </PeliculasContext.Provider>      
            
        </>
    )
}

const Lista = (props) => {

    const {_id , title , image } = props

    const {imagenBtnHandler} = useContext(PeliculasContext)

    return(
        <li className="Home-li">
            <img src={image || './assets/images/notimage.png' } alt={title} title={title} onClick={ () => imagenBtnHandler(_id)} loading='lazy' className="Home-img" />
        </li>

    )
}