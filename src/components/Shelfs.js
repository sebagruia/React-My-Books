import React from "react";
import BookShelf from "../components/BookShelf";

const Shelfs = ({ books,reload }) => {
  const shelfsNames = [{id:1, name:"currentlyReading"}, {id:2, name:"wantToRead"}, {id:3, name:"read"}];
  return shelfsNames.map((shelfName) => <BookShelf key={shelfName.id} shelfName={shelfName.name} books={books} reload={reload} />);
};

export default Shelfs;
