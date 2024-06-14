import React from 'react'
import ReactDOM from 'react-dom/client'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import { router } from './routes/routes';
import { AuthProvider } from './AuthProvider/AuthProvider';
import { TaskProvider } from './TaskProvider/TaskProvider';
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div className='max-w-screen-xl mx-auto'>
   

  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <TaskProvider>
  <RouterProvider router={router} />
  </TaskProvider>
  </QueryClientProvider>
  </AuthProvider>
   </div>
  </React.StrictMode>,
)
