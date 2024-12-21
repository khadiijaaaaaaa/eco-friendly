import React from 'react';
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';
const articles = [
    {
        id: 1,
        date: '10 January',
        comments: 32,
        title: 'Why Choose Eco-Friendly Products?',
        content: 'Eco-friendly products are made from sustainable materials, thus reducing environmental impact...',
        imageUrl: image1,
        externalLink: 'https://ecotsy.com/why-choose-eco-friendly-products/#:~:text=Top%2010%20reasons%20why%20choose%20eco%20friendly%20products,...%207%207.%20Reduces%20Waste%20and%20Landfill%20' // External link
    },
    {
        id: 2,
        date: '25 February',
        comments: 32,
        title: '5 Ways to Reduce Your Plastic Consumption Daily',
        content: 'Reduce your plastic consumption by replacing disposable products with sustainable alternatives...',
        imageUrl: image2,
        externalLink: 'https://www.twowanderingsoles.com/blog/simple-ways-to-reduce-plastic-use' // External link
    },
    {
        id: 3,
        date: '25 February',
        comments: 32,
        title: 'The Benefits of Buying Local for a Lower Environmental Impact',
        content: 'Supporting local producers helps reduce carbon emissions and strengthens the local economy...',
        imageUrl: image3,
        externalLink: 'http://www.gogreen.org/blog/the-environmental-benefits-of-buying-locally' // External link
    }    
];

const KnowledgeShare = () => {
    return (
        <section id="More" style={styles.section}>
            <h2 style={styles.title}>Knowledge Share</h2>
            <p style={styles.description}>
    Discover the importance of choosing eco-friendly products to reduce your environmental impact. Learn how sustainable choices can make a difference in protecting our planet for future generations.
</p>
            <div style={styles.articlesContainer}>
                {articles.map((article) => (
                    <div key={article.id} style={styles.card}>
                        <img src={article.imageUrl} alt={article.title} style={styles.image} />
                        <div style={styles.cardContent}>
                            <p style={styles.date}>
                                <strong>{article.date}</strong> | By: Admin | Comments: {article.comments}
                            </p>
                            <h3 style={styles.cardTitle}>{article.title}</h3>
                            <p style={styles.cardDescription}>{article.description}</p>
                            {/* Lien vers l'article externe */}
                            <a href={article.externalLink} target="_blank" rel="noopener noreferrer" style={styles.readMore}>Read more</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '50px 20px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        
    },
    title: {
        fontSize: '32px',
        marginBottom: '10px',
        color: '#727880'
    },
    description: {
        fontSize: '16px',
        marginBottom: '30px',
        color: '#555',
    },
    articlesContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        width: '300px',
        overflow: 'hidden',
        textAlign: 'left',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    cardContent: {
        padding: '15px',
    },
    date: {
        fontSize: '14px',
        color: '#888',
    },
    cardTitle: {
        fontSize: '20px',
        margin: '10px 0',
        color: '#727880'
    },
    cardDescription: {
        fontSize: '14px',
        color: '#727880',
        marginBottom: '15px',
    },
    readMore: {
        textDecoration: 'none',
        color: 'rgba(214, 204, 194, 0.45)',
        fontWeight: 'bold',
    },
};

export default KnowledgeShare;
