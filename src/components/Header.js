import React, { useState } from 'react';

const Header = ({ onCategorySelect }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = [
        'Thriller', 'History', 'Fantasy', 'Romance', 'Science', 'Dystopian',
        'Adventure', 'Mystery', 'Horror', 'Children', 'Autobiography', 'Cooking',
        'Self-Help', 'Health', 'Business', 'Law', 'Politics', 'Religion', 'Travel',
    ];

    const handleCategorySelect = (category) => {
        if (category === 'Home') {
            setSelectedCategory('');
        } else {
            setSelectedCategory(category);
        }
        onCategorySelect(category === 'Home' ? '' : category);
        setShowDropdown(false);
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                <h1 style={styles.logoText}>Books Store</h1>
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
                    handleCategorySelect('Home');
                }}
            >
                Home
            </a>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#f8f9fa',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        width: '100%',
        boxSizing: 'border-box',
    },
    logo: {
        marginRight: '20px', //pour changer la distance entre les elements de header
    },
    logoText: {
        margin: 0,
        cursor: 'pointer',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#727880',
    },
    categories: {
        marginRight: '20px', //pour changer la distance entre les elements de header
        position: 'relative',
    },
    button: {
        backgroundColor: '#d6ccc2',
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
        color: '#d6ccc2',
        textDecoration: 'none',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default Header;
