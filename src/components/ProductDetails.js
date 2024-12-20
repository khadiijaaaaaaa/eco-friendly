import React, { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]); // État pour le panier

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/products?name=${query}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleAddToCart = (product) => {
        setCartItems((prevCartItems) => {
            const productExists = prevCartItems.some(item => item.id === product.id);
            if (productExists) {
                // Si le produit existe déjà, ne pas l'ajouter à nouveau
                return prevCartItems;
            }
            return [...prevCartItems, product]; // Ajouter au panier
        });
    };

    const handleRemoveFromCart = (product) => {
        setCartItems((prevCartItems) => {
            return prevCartItems.filter(item => item.id !== product.id); // Retirer du panier
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={query}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>🔍</button>
            </form>

            {loading && <p>Chargement...</p>}
            {error && <p style={styles.error}>{error}</p>}

            {selectedProduct ? (
                // Affichage des détails du produit sélectionné
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
                        <p style={styles.productPrice}>Prix : {selectedProduct.price}</p>
                        <button
                            style={styles.backButton}
                            onClick={() => setSelectedProduct(null)}
                        >
                            Retour aux produits
                        </button>
                        <button
                            style={styles.addToCartButton}
                            onClick={() => handleAddToCart(selectedProduct)}
                        >
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            ) : (
                <div style={styles.productsGrid}>
                    {results.length > 0 ? (
                        results.map((product, index) => (
                            <div
                                key={index}
                                style={styles.productCard}
                                onClick={() => handleProductClick(product)}
                            >
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
                                    onClick={(e) => {
                                        e.stopPropagation(); // Empêcher le clic sur le produit
                                        handleAddToCart(product);
                                    }}
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Aucun produit trouvé</p>
                    )}
                </div>
            )}

            {/* Affichage du panier */}
            <div style={styles.cartContainer}>
                <h2>Panier</h2>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} style={styles.cartItem}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={styles.cartImage}
                            />
                            <p>{item.name} - {item.price}</p>
                            <button
                                style={styles.removeButton}
                                onClick={() => handleRemoveFromCart(item)}
                            >
                                Retirer du panier
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Votre panier est vide.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    form: {
        display: 'flex',
        gap: '10px',
    },
    input: {
        padding: '8px',
        width: '250px',
        fontSize: '16px',
    },
    button: {
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginTop: '20px',
    },
    productCard: {
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
    },
    image: {
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
    productCategory: {
        fontSize: '14px',
        color: '#666',
    },
    productPrice: {
        fontSize: '14px',
        color: '#666',
        marginTop: '5px',
    },
    buyButton: {
        backgroundColor: '#d6ccc2',
        color: '#727880',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    addToCartButton: {
        marginTop: '20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
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
    cartContainer: {
        marginTop: '40px',
        padding: '20px',
        borderTop: '2px solid #ddd',
    },
    cartItem: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    cartImage: {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
    },
    removeButton: {
        backgroundColor: '#FF6347',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default SearchBar;
