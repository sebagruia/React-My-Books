import React, { Fragment } from "react";
import BookShelfBooks from "../components/BookShelfBooks";

const BookShelf = ({ read, currentlyReading, wantToRead, reload }) => {
  const redingStates = [
    { id:1, title: "Currently Reading", books: currentlyReading },
    { id:2, title: "Want to Read", books: wantToRead },
    { id:3, title: "Read", books: read },
  ];
  return (
    <div className="bookshelf">
      {redingStates.map((readingState) => (
        <Fragment key={readingState.id}>
          <h2 className="bookshelf-title">{readingState.title}</h2>
          <BookShelfBooks books={readingState.books} reload={reload} />
        </Fragment>
      ))}
    </div>
  );
};

export default BookShelf;
