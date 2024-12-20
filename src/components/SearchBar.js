import React, { useState } from 'react';
import searchIcon from '../images/search.png';
import { AlignCenter } from 'lucide-react';

const SearchBar = ({ addToCart }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        addToCart(product);
        alert("Product added successfully!");
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
                <button type="submit" style={styles.button}>
                    <img
                        src={searchIcon}
                        alt="Search"
                        style={styles.iconImage}
                    />
                </button>
            </form>

            {loading && <p>Chargement...</p>}
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
                        <p style={styles.productPrice}>Price: {selectedProduct.price}</p>
                        <button
                            style={styles.backButton}
                            onClick={() => setSelectedProduct(null)}
                        >
                            Back to Products
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
                                    onClick={(e) => handleAddToCart(product, e)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Aucun produit trouvé</p>
                    )}
                </div>
            )}
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
        alignItems: 'center',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    input: {
        padding: '10px',
        width: '250px',
        fontSize: '16px',
        border: '2px solid #d6ccc2',
        borderRadius: '8px',
        outline: 'none',
        backgroundColor: '#f7f7f7',
        transition: 'border-color 0.3s',
    },
    button: {
        backgroundColor: '#d6ccc2',
        border: 'none',
        borderRadius: '8px',
        padding: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#c8b7a6',
    },
    iconImage: {
        width: '24px',
        height: '24px',
    },
    error: {
        color: 'red',
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

export default SearchBar;
