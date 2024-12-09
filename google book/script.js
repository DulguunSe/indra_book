
const API_KEY = 'AIzaSyBidPQMTEWpACTDAO55PUhK_PT4JDbyKvY';
const CATEGORIES = ['code', 'health', 'personal', 'technology', 'literature', 'math'];
const API_URL_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';
const MAX_BOOKS = 100;

async function fetchBooks() {
    const container = document.getElementById('books-container');
    for (const category of CATEGORIES) {
        const url = `${API_URL_BASE}${category}&key=${API_KEY}&maxResults=${Math.min(10, MAX_BOOKS / CATEGORIES.length)}`;
        console.log('Fetching:', url); // Log the URL
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch books for category: ${category} - ${response.statusText}`);
            const data = await response.json();
            console.log('Response:', data); // Log the response
            displayBooks(data.items, container);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }
}

function displayBooks(books, container) {
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';
        const title = book.volumeInfo.title || 'No Title';

        bookCard.innerHTML = `
            <img src="${thumbnail}" alt="${title}" class="book-thumbnail">
            
        `;

        // Add click event to redirect to book details page
        bookCard.addEventListener('click', () => {
            window.location.href = `read-book.html?id=${book.id}`;
        });

        container.appendChild(bookCard);
    });
}

// Fetch and display books on page load
fetchBooks();
