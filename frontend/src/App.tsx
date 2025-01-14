import { Outlet,  } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import { Book,BookContext,MaybeAuthenticatedUser,AuthenticatedUser,User } from './type'
import { fetchBooks } from '../src/utils/book-services'
import {getAuthenticatedUser,storeAuthenticatedUser,clearAuthenticatedUser } from '../src/utils/session'


const App = () =>{
  
  const [books, setBooks] = useState<Book[]>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState<MaybeAuthenticatedUser>(undefined);
  //const navigate = useNavigate();

  // Ajout du useEffect pour charger l'utilisateur authentifié
  useEffect(() => {
    const savedUser = getAuthenticatedUser();
    if (savedUser) {
      setAuthenticatedUser(savedUser);
    }
  }, []);

  useEffect(() => {
    const initBooks = async () => {
      try {
        if (authenticatedUser) {
          const booksData = await fetchBooks(authenticatedUser);
          setBooks(booksData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    initBooks();
  }, [authenticatedUser]);

  const loginUser = async (user: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const authenticatedUser: AuthenticatedUser = await response.json();
      console.log("authenticatedUser: ", authenticatedUser);

      setAuthenticatedUser(authenticatedUser);
      storeAuthenticatedUser(authenticatedUser);
    } catch (err) {
      console.error("loginUser::error: ", err);
      throw err;
    }
  };

  const clearUser = () => {
    clearAuthenticatedUser();
    setAuthenticatedUser(undefined);
  };
  
  const bookContext : BookContext = {
    books,
    loginUser,
    authenticatedUser,
    clearUser,
  };


  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet context = {bookContext} />
      </main>
      <Footer title="Livius Daniel Marica" />
    </div>
  )
}

export default App;
