import React from 'react';
import '../container/App.css';
import * as BooksAPI from '../BooksAPI';

const Book = ({book, books, title, author, preview,reload}) => {


    const changeShelf = (event) => {
        BooksAPI.update(book, event.target.value)
            .then((response)=>{
                reload();
            });
        
    }

    const synchronizeShelfNameOnSearchedBooks = (book)=>{
        for(let categorizedBook of books){
            if(categorizedBook.id === book.id){
                return categorizedBook.shelf;
            }
        }
        return 'none';
    }
    
    return (
        
        <li>
            <div className="book">
                <div className="book-top">
                    {
                        preview !== undefined ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:'url(' + preview.thumbnail + ')' }}></div>
                        : <div className="book-cover" style={{ width: 128, height: 193, background:"white" }}>
                            <h5 className="no-book-cover">No Book Cover </h5>
                        </div>
                    }
                    <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : synchronizeShelfNameOnSearchedBooks(book)} onChange={(event) => changeShelf(event)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>
        </li>

    );
}

export default Book;