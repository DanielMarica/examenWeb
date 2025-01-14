import { Book, AuthenticatedUser } from "../type";

const fetchBooks = async (authenticatedUser?: AuthenticatedUser): Promise<Book[]> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    if (authenticatedUser?.token) {
      headers.Authorization = authenticatedUser.token;
    }

    const response = await fetch("/api/books", { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch books : " + response.statusText);
    }
    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchBooks };