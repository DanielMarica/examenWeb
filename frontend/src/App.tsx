import { Outlet, useNavigate,  } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import { Book,BookContext,MaybeAuthenticatedUser,AuthenticatedUser,User,NewBook } from './type'
import { fetchBooks,addBook } from '../src/utils/book-services'
import {getAuthenticatedUser,storeAuthenticatedUser,clearAuthenticatedUser } from '../src/utils/session'


const App = () =>{
  
  const [books, setBooks] = useState<Book[]>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState<MaybeAuthenticatedUser>(undefined);
  const navigate = useNavigate();

  // Combine les deux useEffect en un seul
  useEffect(() => {
    const initializeApp = async () => {
      const savedUser = getAuthenticatedUser();
      if (savedUser) {
        setAuthenticatedUser(savedUser);
        try {
          const booksData = await fetchBooks(savedUser);
          setBooks(booksData);
        } catch (err) {
          console.error(err);
        }
      }
    };
    initializeApp();
  }, []);

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

  const registerUser = async (newUser: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/register", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdUser: AuthenticatedUser = await response.json();

      setAuthenticatedUser(createdUser);
      storeAuthenticatedUser(createdUser);

      console.log("createdUser: ", createdUser);
    } catch (err) {
      console.error("registerUser::error: ", err);
      throw err;
    }
  };

  // Ajouter cette fonction avant onAdded
  const initBook = async () => {
    try {
      if (authenticatedUser) {
        const booksData = await fetchBooks(authenticatedUser);
        setBooks(booksData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onAdded = async (newBook: NewBook) => {
    console.log("Movie to add:", newBook);
    try {
      if (!authenticatedUser) {
        throw new Error("User is not authenticated");
      }
      const movieToBeAdded = await addBook(newBook, authenticatedUser);
      console.log("Movie added:", movieToBeAdded);
      await initBook(); // Maintenant initBook est défini et peut être utilisé ici
      navigate("/library");
    } catch (error) {
      console.error(error);
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
    addBook: onAdded,
    registerUser,
  };


  return (
    <div className="app-container">
      <Navbar authenticatedUser={authenticatedUser} />
      <main className="main-content">
        <Outlet context = {bookContext} />
      </main>
      <Footer title="Livius Daniel Marica" />
    </div>
  )
}

export default App;
