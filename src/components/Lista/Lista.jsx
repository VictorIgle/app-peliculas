import './Lista.css'
import { useContext } from "react"
import { PeliculasContext } from "../../context/Context"


export const ListaPeliculas = (props) => {

    const {_id , director , genre , synopsis , title , year , trailer } = props

    const { deletePelicula , putPeliculaBtn , toggleClass , isActive } = useContext(PeliculasContext)



    return(
        <>
        <li className='Edit-li'>
            <h3 className='Edit-h3'>{title}</h3>
            <span className='Edit-span'>Direction: {director}.</span>
            <span className='Edit-span'> Year: {year}.</span>
            <span className='Edit-span'> Genre: {genre}.</span>
            <p className="Edit-p">Synopsis: {synopsis}</p>
            <span className='Edit-span--trailer'> Trailer URL: {trailer}.</span>

            <div className="Edit-btncontain">
            <button onClick={ () => deletePelicula(_id)} className="Edit-btn">Delete</button>
            <button onClick={() => { putPeliculaBtn(_id); toggleClass("uno"); }} className="Edit-btn">Update</button>
            </div>
            

        </li>
        </>
    )
}