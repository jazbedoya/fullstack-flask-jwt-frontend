// src/components/RelatedCarousel.jsx
import { useEffect, useState } from "react";
import { getRelatedProducts } from "../services/api";

function RelatedCarousel({ category }) {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  const visibleItems = 5; // cuantos se ven a la vez

  useEffect(() => {
    if (!category) return;

    getRelatedProducts(category)
      .then(setProducts)
      .catch(console.error);
  }, [category]);

  function next() {
    if (index < products.length - visibleItems) {
      setIndex(index + 1);
    }
  }

  function prev() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  if (products.length === 0) return null;

  return (
    <div className="carousel-container">
      <h3>Productos relacionados</h3>

      <div className="carousel-wrapper">
        <button onClick={prev} disabled={index === 0}>
          ◀
        </button>

        <div className="carousel">
          {products
            .slice(index, index + visibleItems)
            .map((p) => (
              <div className="carousel-card" key={p.id}>
                <img src={p.image} alt={p.name} />
                <h4>{p.name}</h4>
                <p>${p.price}</p>
              </div>
            ))}
        </div>

        <button
          onClick={next}
          disabled={index >= products.length - visibleItems}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default RelatedCarousel;