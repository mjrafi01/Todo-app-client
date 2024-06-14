import {
    createBrowserRouter,
   
  } from "react-router-dom";

import  { MainLayout } from '../Layout/MainLayout'
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { SignUp } from "../pages/SIgnUp/SignUp";
import { TaskDashboard } from "../pages/TaskDashboard/TaskDashboard";
import { UserTypesSection } from "../pages/UserType/UserTypeSection";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/signup",
                element:<SignUp></SignUp>
            },
            {
                path:"/taskdashboard",
                element:<PrivateRoute><TaskDashboard></TaskDashboard></PrivateRoute>
            },
            {
                path:"/usertype",
                element:<UserTypesSection></UserTypesSection>
            }


        ]
    },
  ]);