import { SyntheticEvent, useState } from "react";
import { NewBook, BookContext } from "../type";
import { useOutletContext } from "react-router-dom";
import "./AddBookForm.css";

interface AddBookFormProps {
  onBookAdded: (book: NewBook) => void;
}

const AddBookForm = ({ onBookAdded }: AddBookFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  
  const { authenticatedUser } = useOutletContext<BookContext>();

  if (!authenticatedUser) {
    return <div>Vous devez être connecté pour ajouter un livre.</div>;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onBookAdded({
      title,
      author,
      year: year ?? 0,
      coverImage,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Auteur :</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Année :</label>
        <input
          type="number"
          value={year ?? ""}
          onChange={(e) => setYear(parseInt(e.target.value))}
          required
        />
      </div>
      <div>
        <label>URL de la couverture :</label>
        <input
          type="text"
          value={coverImage ?? ""}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddBookForm;
