interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    coverImage?: string;
}
interface BookContext{
    books: Book[];
    loginUser: (user: User) => Promise<void>;
    authenticatedUser: MaybeAuthenticatedUser;
    clearUser: () => void;
    addBook: (book: NewBook) => Promise<void>;
    
}
type NewBook = Omit<Book, "id">;

interface User {
  username: string;
  password: string;
}

interface AuthenticatedUser {
  username: string;
  token: string;
}

type MaybeAuthenticatedUser = AuthenticatedUser | undefined;
export type { Book, BookContext, NewBook, User, AuthenticatedUser, MaybeAuthenticatedUser };