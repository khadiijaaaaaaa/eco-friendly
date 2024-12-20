import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/search.png';

const Header = ({ onCategorySelect, cartItems }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/products');
                const data = await response.json();
                const uniqueCategories = [...new Set(data.map((product) => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategorySelect = (category) => {
        onCategorySelect(category);
        setShowDropdown(false);
        navigate('/');
    };

    const handleGoToHome = () => {
        onCategorySelect('');
        navigate('/');
    };

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <header style={styles.header}>
            <div
                style={styles.logo}
                onClick={(e) => {
                    e.preventDefault();
                    handleGoToHome();
                }}
            >
                <h1 style={styles.logoText}>Eco-Friendly Shop</h1>
            </div>
            <div style={styles.categories}>
                <button
                    style={styles.button}
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {selectedCategory || 'Categories'}
                </button>
                {showDropdown && (
                    <ul style={styles.dropdown}>
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                style={styles.dropdownItem}
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <a
                href="#"
                style={styles.homeLink}
                onClick={(e) => {
                    e.preventDefault();
                    handleGoToHome();
                }}
            >
                Home
            </a>
            
            <nav style={styles.navLinks}>
                <div style={styles.searchButton} onClick={handleSearchClick}>
                    <img
                        src={searchIcon}
                        alt="Search"
                        style={styles.searchIconImage}
                    />
                </div>
                <a style={styles.navLink} onClick={() => navigate('/blog')}>
                    Blog
                </a>
            
                <div style={styles.cart} onClick={() => navigate('/cart')}>
                    <span style={styles.cartIcon}>🛒</span>
                    <span style={styles.cartCount}>{cartItems.length}</span>
                </div>
            
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: 'rgba(214, 204, 194, 0.45)',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
    },
    logo: {
        marginRight: '20px',
        cursor: 'pointer',
    },
    logoText: {
        margin: 0,
        cursor: 'pointer',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#727880',
    },
    categories: {
        marginRight: '20px',
        position: 'relative',
    },
    button: {
        backgroundColor: 'transparent',
        color: '#727880',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    dropdown: {
        position: 'absolute',
        top: '40px',
        left: 0,
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        listStyle: 'none',
        padding: '10px',
        zIndex: 1000,
        width: '150px',
        maxHeight: '250px',
        overflowY: 'auto',
    },
    dropdownItem: {
        padding: '8px 12px',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd',
    },
    homeLink: {
        backgroundColor: 'transparent',
        color: '#727880',
        textDecoration: 'none',
        fontSize: '16px',
        cursor: 'pointer',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    navLink: {
        fontSize: '16px',
        color: '#727880',
        textDecoration: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    cart: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    cartIcon: {
        fontSize: '24px',
    },
    cartCount: {
        marginLeft: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    searchButton: {
        backgroundColor: 'transparent',
        padding: '8px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIconImage: {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
    },
};

export default Header;
