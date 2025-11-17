import { useBooks } from './BookContext';

const BookItem = ({ book }) => {
  const { deleteBook, setEditingBook } = useBooks();

  const getStatusLabel = (status) => {
    switch (status) {
      case 'baca': return 'Sudah Dibaca';
      case 'beli': return 'Akan Dibeli';
      default: return '';
    }
  };

  return (
    <li className="book-item">
      <div className="book-item-info">
        <h4 className="book-title">{book.title}</h4>
        <p className="book-author">{book.author}</p>
        <span className={`status-badge status-${book.status}`}>
          {getStatusLabel(book.status)}
        </span>
      </div>
      <div className="book-item-actions">
        <button
          onClick={() => setEditingBook(book)}
          className="button button-edit"
        >
          Edit
        </button>
        <button
          onClick={() => deleteBook(book.id)}
          className="button button-delete"
        >
          Hapus
        </button>
      </div>
    </li>
  );
};

export default BookItem;