import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/search.png';
import logoImage from '../images/name.png'; // Import the logo image

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

    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.leftSection}>
                <div style={styles.logo} onClick={(e) => {
                    e.preventDefault();
                    handleGoToHome();
                }}>
                    <img
                        src={logoImage}
                        alt="Logo"
                        style={styles.logoImage}
                    />
                </div>
            </div>
            <div style={styles.centerSection}>
                <div style={styles.categories} onClick={() => setShowDropdown(!showDropdown)}>
                    <span style={styles.categoriesText}>
                        {selectedCategory || 'Categories'}{' '}
                        <span style={styles.caret}>{showDropdown ? '▲' : '▼'}</span>
                    </span>
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
                    style={styles.navLink}
                    onClick={() => navigate('/blog')}
                >
                    Blog
                </a>
                <a
                    style={styles.navLink}
                    onClick={() => handleScrollToSection('aboutUs')}
                >
                    About Us
                </a>
                <a
                    style={styles.navLink}
                    onClick={() => handleScrollToSection('bestsellers')}
                >
                    Best Sellers
                </a>
                <a
                    style={styles.navLink}
                    onClick={() => handleScrollToSection('More')}
                >
                    More
                </a>
            </div>
            <div style={styles.rightSection}>
                <div style={styles.searchButton} onClick={handleSearchClick}>
                    <img
                        src={searchIcon}
                        alt="Search"
                        style={styles.searchIconImage}
                    />
                </div>
                <div style={styles.cart} onClick={() => navigate('/cart')}>
                    <span style={styles.cartIcon}>🛒</span>
                    <span style={styles.cartCount}>{cartItems.length}</span>
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(214, 204, 194, 0.45)',
        padding: '15px 20px',
        borderBottom: '1px solid #ddd',
        width: '100%',
        boxSizing: 'border-box',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '18%', // Reduced by 2% to bring it closer to the center
    },
    logo: {
        textAlign: 'left',
        width: '100%',
    },
    logoImage: {
        width: '120px',
        height: 'auto',
    },
    centerSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        width: '64%', // Increased by 4% to maintain symmetry
    },
    categories: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    categoriesText: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#727880',
        display: 'flex',
        alignItems: 'center',
    },
    caret: {
        marginLeft: '5px',
        fontSize: '12px',
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
    navLink: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#727880',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '20px',
        width: '18%', // Reduced by 2% to match the left section
    },
    searchButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        padding: '8px',
        cursor: 'pointer',
    },
    searchIconImage: {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
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
};

export default Header;