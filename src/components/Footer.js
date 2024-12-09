import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2024 My Shopping Site. All rights reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#f8f9fa',
        padding: '10px',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        width: '100%',
        position: 'relative',   // Position the footer below content
        marginTop: 'auto',      // Push footer to the bottom of the page
    },
};

export default Footer;
