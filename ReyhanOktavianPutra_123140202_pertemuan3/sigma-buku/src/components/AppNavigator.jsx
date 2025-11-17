const AppNavigator = ({ page, setPage }) => {
  const NavButton = ({ target, label }) => (
    <button
      onClick={() => setPage(target)}
      className={page === target ? 'active' : ''}
    >
      {label}
    </button>
  );

  return (
    <nav className="app-nav">
      <div className="nav-content">
        <h1 className="nav-title">Manajemen Buku</h1>
        <div className="nav-buttons">
          <NavButton target="home" label="Beranda" />
          <NavButton target="stats" label="Statistik" />
        </div>
      </div>
    </nav>
  );
};

export default AppNavigator;