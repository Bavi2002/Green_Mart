import React from 'react';
import './package.css';
import envelope from '../Components/assets/envelope.png'; // Replace with the actual image path
import paperbag from '../Components/assets/paperbag.png'; // Replace with the actual image path
import corrugatedBox from '../Components/assets/corrugatedBox.png';
const packagingMaterials = () => {
  const products = [
    {
      id: 1,
      name: 'Manilla Pocket Gummed Envelope',
      image: envelope,
      measurements: '24.1 x 31.8 cm',
      weightLimit: '500g',
      description: 'The special GreenMart Envelope rate only applies up to this weight.'
    },
    {
      id: 2,
      name: 'Square bottom paper bag',
      image: paperbag,
      measurements: 'Small: 20cm x 10cm x 25cm\nMedium: 30cm x 15cm x 35cm\nLarge: 40cm x 20cm x 45cm',
      weightLimit: '1kg',
      description: ''
    },

    {
        id: 3,
        name: 'Top Visible Corrugated Box',
        image: corrugatedBox,
        measurements: 'Small: 20cm x 10cm x 25cm\nMedium: 30cm x 15cm x 35cm\nLarge: 40cm x 20cm x 45cm',
        weightLimit: '5kg',
        description: 'Minimum weight charged: 1 kgs Auto size generation according to the product size and weight.'
      },
      {
        id: 4,
        name: 'Top Visible Corrugated Box',
        image: corrugatedBox,
        measurements: 'Small: 20cm x 10cm x 25cm\nMedium: 30cm x 15cm x 35cm\nLarge: 40cm x 20cm x 45cm',
        weightLimit: '5kg',
        description: 'Minimum weight charged: 1 kgs Auto size generation according to the product size and weight.'
      }
  ];

  return (
    <div className="packaging-cards">
      {products.map(product => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p><strong>Internal measurements:</strong> {product.measurements}</p>
          <p><strong>Weight limit:</strong> {product.weightLimit}</p>
          {product.description && <p>{product.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default packagingMaterials;
