import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import "../container/App.css";
import AddABookButton from "../components/AddABookButton";
import { Route, HashRouter } from "react-router-dom";
import SearchBooks from "../components/SearchBooks";
import BookShelf from "../components/BookShelf";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      read: [],
      currentlyReading: [],
      wantToRead: [],
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: [...books] });
      this.filterBooksByShelf(books);
    });
  };

  filterBooksByShelf = (books) => {
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];
    books.forEach((book) => {
      if (
        book.shelf === "currentlyReading" &&
        !this.state.currentlyReading.includes(book.id)
      ) {
        currentlyReading.push(book);
      } else if (
        book.shelf === "wantToRead" &&
        !this.state.wantToRead.includes(book.id)
      ) {
        wantToRead.push(book);
      } else if (book.shelf === "read" && !this.state.read.includes(book.id)) {
        read.push(book);
      }
    });

    this.setState({
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      read: read,
    });
  };

  render() {
    const { read, currentlyReading, wantToRead } = this.state;
    return (
      <HashRouter basename="/">
        <div className="app">
          <Route
            exact
            path="/search"
            render={() => (
              <SearchBooks books={this.state.books} reload={this.reload} />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyBooks</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf
                      read={read}
                      currentlyReading={currentlyReading}
                      wantToRead={wantToRead}
                      reload={this.reload}
                    />
                  </div>
                </div>
                <AddABookButton />
              </div>
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default App;
