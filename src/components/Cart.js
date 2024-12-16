import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => { // Ajout de la prop removeFromCart
    return (
        <div style={styles.cartPage}>
            <h1>My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your shopping cart is empty.</p>
            ) : (
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
            )}
        </div>
    );
};

const styles = {
    cartPage: {
        padding: '20px',
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
};

export default Cart;
