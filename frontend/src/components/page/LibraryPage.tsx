import { useOutletContext } from "react-router-dom";
import PageTitle from "../PageTitle";
import BookListView from "../BookListView";
import { BookContext } from "../../type";
import { Container } from "@mui/material";

const LibraryPage = () => {
    const { books }: BookContext = useOutletContext();

    return (
        <Container>
            <PageTitle title="Library Page" />
            <BookListView books={books} />
        </Container>
    );
}

export default LibraryPage;