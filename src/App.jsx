//Importamos BrowserRouter, Route y Routes para poder definir y relacionar las rutas entre los componentes
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
//Importamos los componentes de las paginas a las que vamos a conectar
import { Login } from './pages/Login/Login'
import { Home } from './pages/Home/Home'
import { Edit } from './pages/Edit/Edit'
import { Movie } from './pages/Movie/Movie'
import { Add } from './pages/Add/Add'

//Definimos en Routes en las rutas "Route" mediante el path asociado a cada pagina y element para asociarlo al componente/page correspondiente 
function App() {
 

  return (
    <BrowserRouter>
    <>

      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/add' element={<Add />} />
        <Route path='/movie/:_id' element={ <Movie />} />

      </Routes>
    
    </>
    </BrowserRouter>
   
  )
}

export default App
