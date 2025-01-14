interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    coverImage?: string;
}


type NewBook = Omit<Book, "id">;

export type { Book,NewBook };