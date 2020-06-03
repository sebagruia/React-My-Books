import React from "react";
import Book from "../components/Book";

const BookShelfBooks = ({ books, reload }) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <Book
            key={book.id}
            book={book}
            books={books}
            id={book.id}
            title={book.title}
            author={book.authors}
            preview={book.imageLinks}
            reload={reload}
          />
        ))}
      </ol>
    </div>
  );
};

export default BookShelfBooks;
