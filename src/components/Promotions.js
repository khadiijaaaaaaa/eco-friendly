import React, { useState, useEffect } from 'react';

const Promotions = ({ selectedCategory, onCategorySelect, addToCart }) => {
    const [promotionalProducts, setPromotionalProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPromotionalProducts();
    }, []);
    

    const fetchPromotionalProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/products');
            const data = await response.json();
            // Filtrer les produits pour les promotions
            const promotions = data.filter(
                (product) =>
                    product.best_seller || product.category.toLowerCase() === 'beauty'
            );
            setPromotionalProducts(promotions);
        } catch (error) {
            console.error('Error fetching promotional products:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateDiscountedPrice = (price, category) => {
        const numericPrice = parseFloat(price.replace('$', ''));
        const discountPercentage = getDiscountPercentage(category);
        const discountedPrice = numericPrice - (numericPrice * discountPercentage) / 100;
        return `$${discountedPrice.toFixed(2)}`;
    };

    const getDiscountPercentage = (category) => {
        switch (category.toLowerCase()) {
            case 'beauty':
                return 50;
            case 'kitchen':
                return 60;
            case 'garden':
                return 70;
            default:
                return 30;
        }
    };
    const handleAddToCart = (product) => {
        addToCart(product); // Ajouter au panier
    };

    return (
        <div style={styles.promotions}>
            <h1 style={styles.title}>Promotional Products</h1>
            {loading ? (
                <p>Loading promotions...</p>
            ) : (
                <div style={styles.productsGrid}>
                    {promotionalProducts.map((product) => (
                        <div key={product.name} style={styles.productCard}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={styles.productImage}
                            />
                            <h2 style={styles.productName}>{product.name}</h2>
                            <p style={styles.productPrice}>Original Price: {product.price}</p>
                            <p style={styles.discountedPrice}>
                                Promotional Price: {calculateDiscountedPrice(product.price, product.category)}
                            </p>
                            <p style={styles.discount}>
                                Discount: -{getDiscountPercentage(product.category)}%
                            </p>
                            <button style={styles.buyButton} onClick={() => handleAddToCart(product)}>
                               Add to Cart
                            </button>
                            <p>{product.category}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    promotions: {
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    productCard: {
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        marginBottom: '10px',
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
        textDecoration: 'line-through',
    },
    discountedPrice: {
        fontSize: '14px',
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    discount: {
        fontSize: '12px',
        color: '#2ecc71', // Vert pour la réduction
        fontWeight: 'bold',
    },
    buyButton: {
        padding: '10px',
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Promotions;
