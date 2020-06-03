import React, { Fragment } from "react";
import BookShelfBooks from "../components/BookShelfBooks";

const BookShelf = ({ read, currentlyReading, wantToRead, reload }) => {
  const redingStates = [
    { title: "Currently Reading", books: currentlyReading },
    { title: "Want to Read", books: wantToRead },
    { title: "Read", books: read },
  ];
  return (
    <div className="bookshelf">
      {redingStates.map((readingState) => (
        <Fragment>
          <h2 className="bookshelf-title">{readingState.title}</h2>
          <BookShelfBooks books={readingState.books} reload={reload} />
        </Fragment>
      ))}
    </div>
  );
};

export default BookShelf;
