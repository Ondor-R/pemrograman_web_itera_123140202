import { useBooks } from '../BookContext';

const StatsPage = () => {
  const { stats } = useBooks();

  const StatCard = ({ label, value, cardClass }) => (
    <div className={`stat-card ${cardClass}`}>
      <h4>{value}</h4>
      <p>{label}</p>
    </div>
  );

  return (
    <div className="stats-page">
      <h2 className="stats-title">Statistik Buku</h2>
      <div className="stats-grid">
        <StatCard label="Total Buku" value={stats.total} cardClass="card-total" />
        <StatCard label="Sudah Dibaca" value={stats.reading} cardClass="card-baca" />
        <StatCard label="Akan Dibeli" value={stats.toBuy} cardClass="card-beli" />
      </div>
    </div>
  );
};

export default StatsPage;