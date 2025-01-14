import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'
import HomePage from './components/page/HomePage'
import LibraryPage from './components/page/LibraryPage'
import BookCard from './components/BookCard'
import AddPageBook from './components/page/AddPageBook'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "library",
        element: <LibraryPage />,
      },
      {
        path: "book/:id",
        element: <BookCard />,
      },
      {
        path: "add-page",
        element: <AddPageBook  description='Bienvenue sur la page ajout de livre'/>,
      }
  
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
