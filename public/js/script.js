document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const bookTable = document.getElementById('bookTable').getElementsByTagName('tbody')[0];
  
    // Fetch and display books
    function fetchBooks() {
      fetch('/books')
        .then((response) => response.json())
        .then((data) => {
          bookTable.innerHTML = '';
          data.forEach((book) => {
            const row = bookTable.insertRow();
            row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><button onclick="deleteBook(${book.id})">Delete</button></td>
            `;
          });
        });
    }
  
    // Add a new book
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const isbn = document.getElementById('isbn').value;
  
      fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, isbn }),
      }).then(() => {
        fetchBooks();
        bookForm.reset();
      });
    });
  
    // Delete a book
    window.deleteBook = (id) => {
      fetch(`/books/${id}`, { method: 'DELETE' }).then(fetchBooks);
    };
  
    // Initial fetch
    fetchBooks();
  });