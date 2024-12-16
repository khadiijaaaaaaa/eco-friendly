import React from 'react';

const Blog = () => {
    const articles = [
        {
            title: "Why Choose Eco-Friendly Products?",
            content: "Eco-friendly products minimize environmental impact, reduce waste, and promote a healthier lifestyle. By choosing eco-friendly options, you're supporting a sustainable future for the planet.",
        },
        {
            title: "Eco-Friendly Kitchen Essentials",
            content: "Transform your kitchen with reusable utensils, bamboo cutting boards, and compostable dishcloths. Say goodbye to plastic waste and hello to sustainability.",
        },
        {
            title: "Safe and Sustainable Toys for Kids",
            content: "Give your children the best with eco-friendly toys. Made from non-toxic materials, these toys are safe for kids and the environment.",
        },
        {
            title: "Garden Products That Help the Earth",
            content: "Grow your garden the green way. Use biodegradable pots, organic fertilizers, and rainwater collectors for a truly eco-friendly gardening experience.",
        },
        {
            title: "Eco-Friendly Clothing: Why It Matters",
            content: "Sustainable clothing reduces pollution and conserves resources. Discover how switching to organic cotton and recycled fabrics makes a difference.",
        },
        {
            title: "Create a Green Home with Eco-Friendly Products",
            content: "Enhance your home with non-toxic paints, energy-efficient appliances, and natural cleaning solutions.",
        },
        {
            title: "Beauty Products That Care for You and the Planet",
            content: "Switch to eco-friendly beauty products made with natural ingredients and sustainable packaging.",
        },
        {
            title: "How to Identify Truly Eco-Friendly Products",
            content: "Learn how to spot greenwashing and choose products with genuine certifications like FSC, Fair Trade, and Organic.",
        },
    ];

    return (
        <div style={styles.blogPage}>
            <h1 style={styles.title}>Eco-Friendly Blog</h1>
            {articles.map((article, index) => (
                <div key={index} style={styles.article}>
                    <h2 style={styles.articleTitle}>{article.title}</h2>
                    <p style={styles.articleContent}>{article.content}</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    blogPage: {
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    article: {
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    articleTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    articleContent: {
        fontSize: '14px',
        color: '#555',
    },
};

export default Blog;
