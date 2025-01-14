import { Book, BookContext } from '../type';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button, List, ListItem, Typography, Box, Alert } from '@mui/material';

interface BookListViewProps {
  books: Book[];
}

const BookListView = ({ books }: BookListViewProps) => {
  const navigate = useNavigate();
  const { authenticatedUser } = useOutletContext<BookContext>();

  if (!authenticatedUser) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="warning">
          Vous devez être connecté pour voir les livres.
        </Alert>
      </Box>
    );
  }

  return (
    <List>
      {books.map((book) => (
        <ListItem 
          key={book.id}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            p: 2
          }}
        >
          <Typography variant="h6">{book.title}</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate(`/book/${book.id}`)}
          >
            Voir plus
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default BookListView;
