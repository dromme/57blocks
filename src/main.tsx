import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, Home, Recordings, Favorites, RecordingDetail } from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Recordings />,
      },

      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "song/:id",
    element: <RecordingDetail />

  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
