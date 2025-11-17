import { useBooks } from './BookContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useBooks();

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari judul atau penulis..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;