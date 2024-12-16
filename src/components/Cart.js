import React, { useEffect, useState } from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    // Calcul du prix total à chaque modification du panier
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calculer le prix total chaque fois que les articles du panier changent
        const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);
        setTotalPrice(total.toFixed(2)); // On arrondit le prix à 2 décimales
    }, [cartItems]);

    return (
        <div style={styles.cartPage}>
            <h1 style={styles.cartTitle}>My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your shopping cart is empty.</p>
            ) : (
                <div>
                    <ul style={styles.cartList}>
                        {cartItems.map((item, index) => (
                            <li key={index} style={styles.cartItem}>
                                <img src={item.image} alt={item.name} style={styles.cartImage} />
                                <div style={styles.itemDetails}>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                </div>
                                <button
                                    style={styles.removeButton}
                                    onClick={() => removeFromCart(index)} // Supprimer l'élément du panier
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div style={styles.totalContainer}>
                        <p style={styles.totalText}>Total: <span style={styles.totalPrice}>${totalPrice}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    cartPage: {
        padding: '20px',
    },
    cartTitle: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    cartList: {
        listStyleType: 'none',
        padding: 0,
    },
    cartItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ddd',
        padding: '10px 0',
    },
    cartImage: {
        width: '50px',
        height: '50px',
        marginRight: '10px',
    },
    itemDetails: {
        flex: 1,
    },
    removeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
        color: '#e74c3c',
    },
    totalContainer: {
        marginTop: '20px',
        textAlign: 'right',
    },
    totalText: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
    totalPrice: {
        color: '#e74c3c', // Couleur rouge pour le prix total
    },
};

export default Cart;
