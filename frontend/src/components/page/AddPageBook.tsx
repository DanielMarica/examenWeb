import PageTitle from "../PageTitle";
import AddBookForm from "../AddBookForm";
import { useOutletContext } from "react-router-dom";
import { BookContext } from "../../type";

interface AddPageBookProps {
    description: string;
}

const AddPageBook = ({description} : AddPageBookProps) => {
    const { addBook } = useOutletContext<BookContext>();
    
    return (
        <div>
            <PageTitle title="Add Page Book" />
            <h1>{description}</h1>
            <AddBookForm onBookAdded={addBook} />
        </div>
    );
}

export default AddPageBook;