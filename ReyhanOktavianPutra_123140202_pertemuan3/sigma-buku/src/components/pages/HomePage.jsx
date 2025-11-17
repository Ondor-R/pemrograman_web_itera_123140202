import { useBooks } from '../BookContext';
import BookForm from '../BookForm';
import SearchBar from '../SearchBar';
import BookFilter from '../BookFilter';
import BookList from '../BookList';
import Modal from '../Modal';

const HomePage = () => {
  const { editingBook, setEditingBook, addBook, updateBook } = useBooks();

  return (
    <div className="home-page-grid">
      <div className="form-column">
        <BookForm onSubmit={addBook} />
      </div>
      <div className="list-column">
        <h2 style={{ marginTop: 0 }}>Daftar Buku</h2>
        <SearchBar />
        <BookFilter />
        <BookList />
      </div>

      {editingBook && (
        <Modal onClose={() => setEditingBook(null)}>
          <BookForm
            initialData={editingBook}
            onSubmit={updateBook}
            onCancel={() => setEditingBook(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;