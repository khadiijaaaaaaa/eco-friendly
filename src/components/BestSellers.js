import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BestSellers = ({ addToCart }) => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Effet pour récupérer les best-sellers via l'API Flask
    useEffect(() => {
        axios.get('http://localhost:5000/api/products/best_sellers')
            .then((response) => {
                setBestSellers(response.data); // Stocker les produits
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleAddToCart = (product, e) => {
        e.stopPropagation(); // Empêche le clic sur le produit de se déclencher
        addToCart(product);
        alert("Produit ajouté au panier !");
    };

    return (
        <div id="bestsellers" style={styles.container}>
            <h1 style={styles.title}>Best Sellers</h1>
    
            {loading && <p>Chargement des produits...</p>}
            {error && <p style={styles.error}>{error}</p>}
    
            {selectedProduct ? (
                <div style={styles.detailView}>
                    <div style={styles.productImageSection}>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            style={styles.productImageLarge}
                        />
                        <p style={styles.productName}>{selectedProduct.name}</p>
                    </div>
                    <div style={styles.productDetailsSection}>
                        <h2>Description</h2>
                        <p>{selectedProduct.details}</p>
                        <p style={styles.productPrice}>Prix: {selectedProduct.price}</p>
                        <button
                            style={styles.backButton}
                            onClick={() => setSelectedProduct(null)}
                        >
                            Retour aux produits
                        </button>
                    </div>
                </div>
            ) : (
                <div style={styles.productsScrollContainer}>
                    {bestSellers.length > 0 ? (
                        bestSellers.map((product) => (
                            <div
    key={product.id}
    style={styles.productCard}
    onClick={() => handleProductClick(product)}
>
    <div style={styles.badge}>Best Seller</div>
    <img
        src={product.image}
        alt={product.name}
        style={styles.image}
    />
    <p style={styles.productName}>{product.name}</p>
    <p style={styles.productCategory}>{product.category}</p>
    <p style={styles.productPrice}>{product.price}</p>
    <button
        style={styles.buyButton}
        onClick={(e) => handleAddToCart(product, e)}
    >
        Ajouter au panier
    </button>
</div>
                        ))
                    ) : (
                        <p>Aucun produit best-seller trouvé</p>
                    )}
                </div>
            )}
        </div>
    );
    
};

const styles = {
    title: {
        fontSize: '40px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#727880',
    },
    container: {
        padding: '20px',
        margin:'100px',
        
    },
    error: {
        color: 'red',
    },
    // Conteneur pour permettre le défilement horizontal
    productsScrollContainer: {
        display: 'flex',
        overflowX: 'auto', // Permet de défiler horizontalement
        gap: '20px',
        padding: '30px',
    },
    productCard: {
        position: 'relative', // Ajout pour positionner le badge correctement
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '200px',
        cursor: 'pointer',
        transition: 'transform 0.3s',
    },

    badge: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: '#ff6347', // Rouge vif pour attirer l'attention
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1, // S'assurer que le badge est au-dessus de l'image
    },
    
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    productName: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
    },
    productCategory: {
        fontSize: '14px',
        color: '#666',
    },
    productPrice: {
        fontSize: '14px',
        color: '#666',
    },
    buyButton: {
        backgroundColor: '#d6ccc2',
        color: '#fff',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
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
    productImageLarge: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
    },
};

export default BestSellers;
