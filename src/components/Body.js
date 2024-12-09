import React, { useState, useEffect } from 'react';
import discountImage from '../images/discount.png';

const Body = ({ selectedCategory }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (selectedCategory) {
            setLoading(true);
            setBooks([]);
            setFirstLoad(false);
            fetchBooks(selectedCategory, page);
        } else {
            setBooks([]); // Reset books when no category is selected
        }
    }, [selectedCategory, page]);

    const fetchBooks = async (category, page) => {
        try {
            const response = await fetch(`https://openlibrary.org/subjects/${category.toLowerCase()}.json?page=${page}`);
            const data = await response.json();
            setBooks((prevBooks) => [...prevBooks, ...(data.works || [])]);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreBooks = () => {
        setPage(page + 1);
    };

    return (
        <main style={styles.body}>
            {selectedCategory ? (
                loading ? (
                    <p>Loading books...</p>
                ) : (
                    <>
                        <div style={styles.booksGrid}>
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <div key={book.key} style={styles.bookCard}>
                                        <img
                                            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                                            alt={book.title}
                                            style={styles.bookCover}
                                        />
                                        <p>{book.title}</p>
                                    </div>
                                ))
                            ) : (
                                !firstLoad && <p>No books found in this category.</p>
                            )}
                        </div>
                        {books.length > 0 && (
                            <button onClick={loadMoreBooks} style={styles.loadMoreButton}>
                                Load More Books
                            </button>
                        )}
                    </>
                )
            ) : (
                <img
                    src={discountImage}
                    alt="Discount Banner"
                    style={styles.bannerImage}
                />
            )}
        </main>
    );
};

const styles = {
    body: {
        padding: '20px',
        minHeight: '400px',
    },
    booksGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
    },
    bookCard: {
        textAlign: 'center',
    },
    bookCover: {
        width: '150px',
        height: '200px',
        objectFit: 'cover',
    },
    loadMoreButton: {
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    bannerImage: {
        width: '70%', // Full width of the page
        marginTop: '5%', // 10% space from the header
        display: 'block', // Ensures it's treated as a block element
        marginLeft: 'auto', // Centers the image horizontally
        marginRight: 'auto', // Centers the image horizontally
        
    },
};

export default Body;
