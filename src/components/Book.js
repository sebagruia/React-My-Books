import React, { useState } from 'react';
import '../container/App.css';
import * as BooksAPI from '../BooksAPI';

const Book = ({id, title, author, preview}) => {
    const [selected, setSelected] = useState('');

    const handleSelect = (event) => {
        setSelected(event.target.value);
        console.log(event.target.value);
        BooksAPI.update(id, event.target.value);
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
                        <select value={selected} onChange={(event) => handleSelect(event)}>
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