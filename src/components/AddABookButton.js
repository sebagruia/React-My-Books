import React from 'react';
import '../container/App.css';
import {Link} from 'react-router-dom';
 
const AddABookButton = ()=>{
    return(
        <div className="open-search">
              <Link className="add-a-book-link" role="button" to="/search" >Add a book</Link>
        </div>
    );
}

export default AddABookButton;