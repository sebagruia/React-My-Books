import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import * as BooksAPI from '../BooksAPI';
import '../container/App.css';

class SearchBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchedBooks: []
        }
    }


    search = (event) => {
        this.setState({ query: event.target.value });
        if (event.target.value !== "") {
            BooksAPI.search(event.target.value)
                .then((books) => {
                    if (!Array.isArray(books)) {
                        this.setState({ searchedBooks: [] });
                    }
                    else {
                        this.setState({ searchedBooks: books });
                    }

                })
                .catch((err) => {
                    console.error('Unable to fetch searched Books', err);
                })
        }
        else {
            this.setState({ searchedBooks: [] });
        }
    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" role="button" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input value={this.state.query} onChange={(event) => this.search(event)} type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.query === "" || this.state.searchedBooks.length === 0 ?
                                <h4 className="search-display">Searching for {`"${this.state.query}"`}</h4>
                                : this.state.searchedBooks.map((book) =>
                                    <Book key={book.id}
                                        book={book}
                                        books={this.props.books}
                                        id={book.id}
                                        title={book.title}
                                        author={book.authors}
                                        preview={book.imageLinks}
                                        reload = {this.props.reload}
                                         />
                                )
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;