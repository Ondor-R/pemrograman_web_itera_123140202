import { useBooks } from './BookContext';

const BookFilter = () => {
  const { filter, setFilter } = useBooks();
  const filters = [
    { key: 'all', label: 'Semua' },
    { key: 'baca', label: 'Sudah Dibaca' },
    { key: 'beli', label: 'Akan Dibeli' },
  ];

  return (
    <div className="filter-container">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={`filter-button ${filter === f.key ? 'active' : ''}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default BookFilter;