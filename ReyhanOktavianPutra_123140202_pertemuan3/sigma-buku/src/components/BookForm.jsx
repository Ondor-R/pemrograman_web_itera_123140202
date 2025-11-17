import { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, initialData = null, onCancel = () => {} }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('beli');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setStatus(initialData.status);
    } else {
      setTitle('');
      setAuthor('');
      setStatus('beli');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Judul tidak boleh kosong";
    if (!author.trim()) newErrors.author = "Penulis tidak boleh kosong";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...initialData, title, author, status });

    if (!initialData) {
      setTitle('');
      setAuthor('');
      setStatus('beli');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>
        {initialData ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h3>
      <div className="form-group">
        <label htmlFor="title" className="form-label">Judul</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          placeholder="Mis: Laskar Pelangi"
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="author" className="form-label">Penulis</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
          placeholder="Mis: Andrea Hirata"
        />
        {errors.author && <p className="form-error">{errors.author}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select"
        >
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sudah Dibaca</option>
        </select>
      </div>
      <div className="form-actions">
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="button button-cancel"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          className="button button-submit"
        >
          {initialData ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;