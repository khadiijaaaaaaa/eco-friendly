import React, { useState, useEffect } from 'react';
import discountImage from '../images/discount.png';
import { useNavigate } from 'react-router-dom';


const Body = ({ selectedCategory,addToCart }) => {
    const navigate = useNavigate();
    const handlePromotionClick = () => {
        navigate('/promotions');
    };
    
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (selectedCategory) {
            setLoading(true);
            setProducts([]);
            fetchProducts(selectedCategory);
        } else {
            setProducts([]);
        }
    }, [selectedCategory]);

    const fetchProducts = async (category) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/products`);
            const data = await response.json();
            const filteredProducts = data.filter(
                (product) => product.category.toLowerCase() === category.toLowerCase()
            );
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (product) => {
        const specialCategories = ['home', 'garden', 'clothing', 'kitchen'];
        const imageName = product.image.split('/').pop(); // Récupère juste le nom de l'image

        if (specialCategories.includes(product.category.toLowerCase())) {
            return `http://127.0.0.1:5000/images/${product.category.toLowerCase()}/${imageName}`;
        }
        return `http://127.0.0.1:5000/images/${imageName}`;
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };
    const handleAddToCart = (product) => {
        addToCart(product); // Ajouter au panier
        alert("Product added successfully!"); // Affichage du message sous forme d'alerte
        

    };

    return (
        <main style={styles.body}>
            {selectedProduct ? (
                // Afficher les détails du produit sélectionné
                <div style={styles.detailView}>
                    <div style={styles.productImageSection}>
                        <img
                            src={getImageUrl(selectedProduct)}
                            alt={selectedProduct.name}
                            style={styles.productImageLarge}
                        />
                        <p style={styles.productName}>{selectedProduct.name}</p>
                    </div>
                    <div style={styles.productDetailsSection}>
                        <h2>Description</h2>
                        <p>{selectedProduct.details}</p>
                        <p style={styles.productPrice}>Price: {selectedProduct.price}</p>
                        <button
                            style={styles.backButton}
                            onClick={() => setSelectedProduct(null)}
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            ) : selectedCategory ? (
                loading ? (
                    <p>Loading products...</p>
                ) : (
                    <div style={styles.productsGrid}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product.name}
                                    style={styles.productCard}
                                    onClick={() => handleProductClick(product)}
                                >
                                    <img
                                        src={getImageUrl(product)}
                                        alt={product.name}
                                        style={styles.productImage}
                                    />
                                    <p style={styles.productName}>{product.name}</p>
                                    <p style={styles.productPrice}>{product.price}</p>
                                    <button style={styles.buyButton} onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No products found in this category.</p>
                        )}
                    </div>
                )
            ) : (
                <img
                    src={discountImage}
                    alt="Discount Banner"
                    style={styles.bannerImage}
                    onClick={handlePromotionClick} // Navigation
                />
            )}
        </main>
    );
};

const styles = {
    body: {
        padding: '20px',
        minHeight: '400px',
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
    },
    productCard: {
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
    },
    productImage: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    productImageLarge: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
    },
    productName: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px',
    },
    productPrice: {
        fontSize: '14px',
        color: '#666',
    },
    bannerImage: {
        width: '70%',
        marginTop: '5%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    detailView: {
        display: 'flex',
        gap: '20px',
    },
    productImageSection: {
        flex: 1,
        textAlign: 'center',
    },
    productDetailsSection: {
        flex: 2,
        padding: '20px',
    },
    backButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#d6ccc2',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        color: '#fff',
    },
    buyButton: {
        backgroundColor: '#d6ccc2',
        color: '#727880',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Body;
