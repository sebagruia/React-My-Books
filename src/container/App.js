import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import "../container/App.css";
import AddABookButton from "../components/AddABookButton";
import { Route, HashRouter } from "react-router-dom";
import SearchBooks from "../components/SearchBooks";
import Shelf from "../components/Shelfs";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: [...books] });
    });
  };

 

  render() {
    const { books } = this.state;
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
                  <Shelf books={books} reload={this.reload}/>
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
