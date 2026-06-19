import React from 'react'
import {createBrowserRouter} from 'react-router'
import {RouterProvider} from 'react-router'
import Home from '../screens/Home'
import Room from '../screens/Room'

const AppRoutes = () => {
    
    let router = createBrowserRouter([
    {
        path:"",
        element:<Home/>,
    }  ,
    {
        path:"/room/:roomId",
        element:<Room/>
    }  
    ])
  return <RouterProvider router={router} />
}

export default AppRoutes
