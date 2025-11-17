import { useBooks } from './BookContext';
import BookItem from './BookItem';

const BookList = () => {
  const { filteredBooks } = useBooks();

  if (filteredBooks.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
        Tidak ada buku yang cocok dengan filter atau pencarian Anda.
      </p>
    );
  }

  return (
    <ul className="book-list">
      {filteredBooks.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
};

export default BookList;