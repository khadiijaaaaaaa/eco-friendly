import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Promotions from './components/Promotions';
import Cart from './components/Cart';
import Blog from './components/Blog';
import SearchBar from './components/SearchBar';
import BestSellers from './components/BestSellers';
import KnowledgeShare from './components/KnowledgeShare'; // Importation du composant KnowledgeShare
import AboutUs from './components/AboutUs';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cartItems, setCartItems] = useState([]); // Gère les articles dans le panier

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    // Supprimer un produit du panier
    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = (query) => {
        console.log('Searching for:', query);
        // Tu peux implémenter la logique pour filtrer les produits ou faire un appel à l'API ici
    };

    return (
        <Router>
            <div style={styles.app}>
                <Header onCategorySelect={handleCategorySelect} cartItems={cartItems} />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Body selectedCategory={selectedCategory} addToCart={addToCart} />
                                <BestSellers addToCart={addToCart} />
                                <KnowledgeShare /> {/* Composant ajouté ici */}
                                <AboutUs />
                            </>
                        }
                    />
                    <Route
                        path="/promotions"
                        element={
                            <Promotions
                                selectedCategory={selectedCategory}
                                onCategorySelect={handleCategorySelect}
                                addToCart={addToCart}
                            />
                        }
                    />
                    <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
                    <Route path="/search" element={<SearchBar onSearch={handleSearch} addToCart={addToCart} />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
};

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
};

export default App;
