// import React, { useState } from 'react';
// import './package.css';

// import jaggery from './assets/jaggery.png';
// import cashewnuts from './assets/cashewnuts.png';
// import dryfish from './assets/dryfish.jpg';

// const Packaging = () => {
//     const [products, setProducts] = useState([
//         { 
//             id: 1, 
//             name: 'Palm Jaggery', 
//             weight: '1.5Kg', 
//             quantity: 3, 
//             packagingOption: 'Kraft Paper Box',
//             image: jaggery
//         },
//         { 
//             id: 2, 
//             name: 'Cashew Nuts', 
//             weight: '1Kg', 
//             quantity: 4, 
//             packagingOption: 'Square Bottom Paper Bag',
//             image: cashewnuts
//         },
//         { 
//             id: 3, 
//             name: 'Dry Fish', 
//             weight: '500g', 
//             quantity: 3, 
//             packagingOption: 'Kraft Paper Box',
//             image: dryfish
//         }
//     ]);

//     const handlePackagingOptionChange = (productId, option) => {
//         const updatedProducts = products.map(product =>
//             product.id === productId ? { ...product, packagingOption: option } : product
//         );
//         setProducts(updatedProducts);
//     };

//     return (
//         <div className="packaging">
//             {products.map(product => (
//                 <div key={product.id} className="product">
//                     <img src={product.image} alt={product.name} className="product-image" />
//                     <h3>{product.name}</h3>
//                     <p>Weight: {product.weight}</p>
//                     <p>Quantity: {product.quantity}</p>
//                     <div className="selection">
//                     <label>Packaging Option</label>
//                         <select
//                             value={product.packagingOption}
//                             onChange={(e) => handlePackagingOptionChange(product.id, e.target.value)}
//                         >
//                             <option value="Kraft Paper Box">Kraft Paper Box</option>
//                             <option value="Square Bottom Paper Bag">Square Bottom Paper Bag</option>
//                             <option value="Top Visible Corrugated Box">Top Visible Corrugated Box</option>
//                             <option value="Cylindrical Paper Tube Box">Cylindrical Paper Tube Box</option>
//                             <option value="Card Board Box">Card Board Box</option>
//                         </select>
//                         <div className="color-pattern-selector">
//                             <label>Custom Color</label>
//                             <input type="color" />
//                             <label>Add Pattern</label>
//                             <select>
//                                 <option value="pattern1">Pattern 1</option>
//                                 <option value="pattern2">Pattern 2</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Packaging;
import React, { useState } from 'react';
import './package.css';

import jaggery from '../Components/assets/jaggery.png';
import cashewnuts from '../Components/assets/cashewnuts.png';
import dryfish from '../Components/assets/dryfish.jpg';

const Packaging = () => {
    const [products, setProducts] = useState([
        { 
            id: 1, 
            name: 'Palm Jaggery', 
            weight: '1.5Kg', 
            quantity: 3, 
            packagingOption: 'Kraft Paper Box',
            customColor: '#ffffff',
            pattern: 'pattern1',
            image: jaggery
        },
        { 
            id: 2, 
            name: 'Cashew Nuts', 
            weight: '1Kg', 
            quantity: 4, 
            packagingOption: 'Square Bottom Paper Bag',
            customColor: '#ffffff',
            pattern: 'pattern1',
            image: cashewnuts
        },
        { 
            id: 3, 
            name: 'Dry Fish', 
            weight: '500g', 
            quantity: 3, 
            packagingOption: 'Kraft Paper Box',
            customColor: '#ffffff',
            pattern: 'pattern1',
            image: dryfish
        }
    ]);

    const handlePackagingOptionChange = (productId, option) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, packagingOption: option } : product
        );
        setProducts(updatedProducts);
    };

    const handleColorChange = (productId, color) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, customColor: color } : product
        );
        setProducts(updatedProducts);
    };

    const handlePatternChange = (productId, pattern) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, pattern: pattern } : product
        );
        setProducts(updatedProducts);
    };

    const handleNoteChange = (productId, note) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, note } : product
        );
        setProducts(updatedProducts);
    };

    return (
        <div className="packaging">
        {products.map(product => (
            <div key={product.id} className="product">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>Weight = {product.weight}</p>
                    <p>Quantity-{product.quantity}</p>
                </div>
                <div className="selection">
                    <label>Packaging Option</label>
                    <select
                        value={product.packagingOption}
                        onChange={(e) => handlePackagingOptionChange(product.id, e.target.value)}
                    >
                        <option value="Kraft Paper Box">Kraft Paper Box</option>
                        <option value="Square Bottom Paper Bag">Square Bottom Paper Bag</option>
                        <option value="Top Visible Corrugated Box">Top Visible Corrugated Box</option>
                        <option value="Cylindrical Paper Tube Box">Cylindrical Paper Tube Box</option>
                        <option value="Card Board Box">Card Board Box</option>
                    </select>
                    <div className="note-section">
                        <label>Note To Add In The Package</label>
                        <input 
                            type="text" 
                            placeholder="Note" 
                            value={product.note} 
                            onChange={(e) => handleNoteChange(product.id, e.target.value)} 
                        />
                    </div>
                    </div>
                    <div className="button-group">
                        <button className="custom-color">Custom Color</button>
                        <button className="add-pattern">Add Pattern</button>
                    </div>
            </div>
        ))}
    </div>
    );
};

export default Packaging;
