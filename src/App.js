import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div style={styles.app}>
            <Header onCategorySelect={handleCategorySelect} />
            <Body selectedCategory={selectedCategory} />
            <Footer />
        </div>
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
