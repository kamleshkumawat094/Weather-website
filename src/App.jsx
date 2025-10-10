import { useState } from 'react'
import './App.css'
import Home from './components/home';
import Search from './components/Search'
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Navbar from './components/Navbar';
import Forecast from './components/Forecast';
import Contect from './components/Contect';



const router = createBrowserRouter(
  [
    
    {
      path:"/",
      element: <div>
         <Home/>
        <Navbar>
        </Navbar>
      </div>
    },
     {
      path:"/search",
      element: <div>
        <Search/>
        <Navbar>
        </Navbar>
      </div>
    },
    {
      path:"/forecast",
      element: <div>
        <Forecast/>
        <Navbar>
        </Navbar>
      </div>
    },
    {
      path:"/setting",
      element: <div>
        <Contect/>
        <Navbar>
        </Navbar>
      </div>
    },
   
  ]
)

function App() {

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
