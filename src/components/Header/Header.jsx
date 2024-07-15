import './Header.css'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

//State navigate importado para poder navegar entre paginas a traves del componente Header
    const navigate = useNavigate()

//Funciones para los botones del Header y navegar hasta las distintas rutas
    const editBtnHandler = () => {
        navigate('/edit')
    }
    const homeBtnHandler = () => {
        navigate('/home')
    }
    const newBTNHandler = () => {
        navigate('/add')
    }
    const cerrarSession = () => {
        localStorage.removeItem('username')
        navigate('/')
    }


    return(
        <>
            <header className="Header">
                <h1 className="Header-h1">FilmHub</h1>
                <nav className="Header-nav">
                    <ul className="Header-ul">
                        <li className="Header-li">
                            <button onClick={homeBtnHandler} title='Go Home' className="Header-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="Header-icon" viewBox="0 0 16 16">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                                </svg>
                            </button>
                            
                        </li>
                        <li className="Header-li">
                            <button onClick={editBtnHandler} title='Go Edit' className="Header-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="Header-icon" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </button>
                        </li>
                        <li className="Header-li">
                            <button onClick={newBTNHandler} title='Go Add Movie' className="Header-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="Header-icon" viewBox="0 0 16 16">
                                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                                </svg>
                            </button>
                        </li>
                        <li className="Header-li">
                            <button onClick={cerrarSession} className="Header-btn" title='Log out'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="Header-icon" viewBox="0 0 16 16">
                                    <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
                                    <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}