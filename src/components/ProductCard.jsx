export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.brand}</p>
      <strong>${product.price}</strong>
    </div>
  );
}
