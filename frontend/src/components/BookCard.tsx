import { useParams, useOutletContext } from "react-router-dom";
import { BookContext } from "../type";
import "./BookCard.css";
import coverDefault from '../assets/cover.jpg';

const BookCard = () => {
  const { id } = useParams();
  const { books }: BookContext = useOutletContext();
  
  const book = books.find(b => b.id === Number(id));

  if (!book) {
    return <div>Livre non trouvé</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <img
          src={book.coverImage || coverDefault}
          className="card-img-top"
          alt={book.title}
        />
        <p className="card-text">
          <strong>Auteur :</strong> {book.author}
        </p>
        <p className="card-text">
          <strong>Année :</strong> {book.year}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
