import React, { Fragment } from "react";
import BookShelfBooks from "../components/BookShelfBooks";

const BookShelf = ({ shelfName, books, reload }) => {
   const booksInTheShelf = books.filter(book=>book.shelf===shelfName);
  return (
    <div className="bookshelf">
        <Fragment>
          <h2 className="bookshelf-title">{shelfName}</h2>
          <BookShelfBooks books={booksInTheShelf} reload={reload} />
        </Fragment>
      
    </div>
  );
};

export default BookShelf;
