import ItemCard from "./Item-card";

const Cards = ({ title }) => {
  return (
    <div className="card shadow-lg border border-secondary mb-4" style={{ minHeight: '250px' }}>
      <div className="card-header">
        <h4 className="mb-0">{title}</h4>
      </div>
      <ItemCard />
    </div>
  );
};

export default Cards;