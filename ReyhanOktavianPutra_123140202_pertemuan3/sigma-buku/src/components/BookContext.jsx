import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage, useBookStats } from '../customHooks.js';
import { generateId } from '../utils.js';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const stats = useBookStats(books);

  const addBook = useCallback((book) => {
    const newBook = { ...book, id: generateId() };
    setBooks(prevBooks => [...prevBooks, newBook]);
  }, [setBooks]);

  const updateBook = useCallback((updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(b => (b.id === updatedBook.id ? updatedBook : b))
    );
    setEditingBook(null);
  }, [setBooks]);

  const deleteBook = useCallback((id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
    }
  }, [setBooks]);

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        if (filter === 'all') return true;
        return book.status === filter;
      })
      .filter(book => {
        const searchLower = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower)
        );
      });
  }, [books, filter, searchTerm]);

  const value = {
    books,
    filteredBooks,
    stats,
    addBook,
    updateBook,
    deleteBook,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    editingBook,
    setEditingBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};