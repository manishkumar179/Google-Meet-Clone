import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Home from '../pages/Home'
import Room from '../pages/Room'

const AppRoutes = () => {
    let router = createBrowserRouter([
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/room/:roomId",
            element:<Room/>
        }
    ])
  return <RouterProvider router={router}/>
}

export default AppRoutes
