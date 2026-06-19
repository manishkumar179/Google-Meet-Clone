import React, { useEffect } from 'react'
import {RouterProvider,createBrowserRouter} from 'react-router'
import Home from '../pages/Home';
import { useDispatch } from 'react-redux';
import { currentUser } from '../reducers/UserThunk';
import PublicRoute from '../components/PublicRoute';
import ProtectedRoute from '../components/ProtectedRoute';
import Room from '../pages/Room';
import Login from '../pages/Login';
const AppRouter = () => {

  let dispatch=useDispatch();

  useEffect(()=>{
     dispatch(currentUser())
  },[])

   const router = createBrowserRouter([
  { 
    path: "/",
     element: <PublicRoute/>,
     children:[{
      path:"",
      element:<Login/>
     }] 
    },
  {
    path:'/home',
    element:<ProtectedRoute/>,
    children:[{
      path:"",
      element:<Home/>
    },{
      path: "room/:roomId" ,
      element:<Room/>
    }
  ]
  }
]);
  return <RouterProvider router={router}/>
}

export default AppRouter