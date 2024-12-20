import React from 'react';

const AboutUs = () => {
    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.title}>About Us</h2>
                <p style={styles.description}>
                    We are a passionate team committed to promoting sustainability and eco-conscious living. Our mission is to offer products that help individuals and businesses reduce their environmental impact. Through innovation and collaboration, we aim to make eco-friendly choices accessible and practical for everyone.
                </p>
                <div style={styles.details}>
                    <h3 style={styles.subTitle}>Our Vision</h3>
                    <p style={styles.text}>
                        Our vision is to create a world where sustainable living is the norm. We believe that small, everyday choices can have a profound impact on the planet. Our products are carefully selected to help you reduce waste, minimize your carbon footprint, and live in harmony with nature.
                    </p>

                    <h3 style={styles.subTitle}>Our Mission</h3>
                    <p style={styles.text}>
                        We strive to provide high-quality, eco-friendly products that support sustainable living. From biodegradable materials to energy-efficient solutions, we offer products that not only help protect the environment but also improve your quality of life.
                    </p>

                    <h3 style={styles.subTitle}>Why Choose Us?</h3>
                    <ul style={styles.list}>
                        <li>We prioritize sustainability in every product we offer.</li>
                        <li>We ensure that our products are ethically sourced and produced.</li>
                        <li>Our team is dedicated to making eco-friendly living easy and affordable.</li>
                        <li>We collaborate with local artisans and manufacturers to support the global green economy.</li>
                    </ul>

                    <h3 style={styles.subTitle}>Our Team</h3>
                    <p style={styles.text}>
                        Our team consists of passionate individuals from diverse backgrounds, all united by a shared love for the environment and a desire to make a positive change. Each member brings a unique skill set to the table, from product sourcing to design, logistics, and customer service. Together, we work hard to ensure that every product we offer aligns with our values of sustainability, integrity, and quality.
                    </p>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '80px 20px',
        backgroundColor: '#f0f8ff',
        color: '#333',
        textAlign: 'center',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        fontSize: '48px',
        marginBottom: '20px',
        color: '#2c3e50',
    },
    description: {
        fontSize: '20px',
        marginBottom: '40px',
        lineHeight: '1.6',
        color: '#555',
    },
    details: {
        textAlign: 'left',
    },
    subTitle: {
        fontSize: '36px',
        margin: '30px 0 15px',
        color: '#2c3e50',
    },
    text: {
        fontSize: '18px',
        marginBottom: '20px',
        color: '#666',
        lineHeight: '1.6',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '40px',
        fontSize: '18px',
        textAlign: 'left',
    },
};

export default AboutUs;
