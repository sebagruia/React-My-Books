import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import '../container/App.css';
import AddABookButton from '../components/AddABookButton';
import { Route, HashRouter } from 'react-router-dom';
import SearchBooks from '../components/SearchBooks';
import Book from '../components/Book';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      read: [],
      currentlyReading: [],
      wantToRead: []
    }
  }

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: [...books] });
        this.filterBooksByShelf(books);
      })
  }

  filterBooksByShelf = (books) => {
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];
    books.forEach((book) => {
      if (book.shelf === "currentlyReading" && !this.state.currentlyReading.includes(book.id)) {
        currentlyReading.push(book);
      }
      else if (book.shelf === "wantToRead" && !this.state.wantToRead.includes(book.id)) {
        wantToRead.push(book);
      }
      else if (book.shelf === "read" && !this.state.read.includes(book.id)) {
        read.push(book);
      }
    })

    this.setState({
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      read: read
    });
  }


  render() {

    return (
      <HashRouter basename="/">
        <div className="app">

          <Route exact path="/search" render={() =>
            <SearchBooks books={this.state.books}
              reload={this.reload} />
          } />

          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyBooks</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.currentlyReading.map((book) =>

                            (<Book key={book.id}
                              book={book}
                              books={this.state.books}
                              id={book.id}
                              title={book.title}
                              author={book.authors}
                              preview={book.imageLinks}
                              reload={this.reload}
                            />)
                          )
                        }
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.wantToRead.map((book) =>

                            (<Book key={book.id}
                              book={book}
                              books={this.state.books}
                              id={book.id}
                              title={book.title}
                              author={book.authors}
                              preview={book.imageLinks}
                              reload={this.reload}
                            />)
                          )
                        }
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.read.map((book) =>

                            (<Book key={book.id}
                              book={book}
                              books={this.state.books}
                              id={book.id}
                              title={book.title}
                              author={book.authors}
                              preview={book.imageLinks}
                              reload={this.reload}
                            />)
                          )
                        }
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <AddABookButton />
            </div>
          )} />
        </div>
      </HashRouter>

    )
  }
}

export default App;
