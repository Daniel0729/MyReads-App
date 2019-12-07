import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


const Shelf = (props) => { 
    
    const {shelfInfo, updateBookOnShelf} = props
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfInfo.name}</h2>
            {shelfInfo.books.length} Books on the shelf
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfInfo.books.map((book) => (
                        <li key={book.id}>
                            <Book 
                                bookInfo={book}
                                updateBookOnShelf={updateBookOnShelf}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )

 }

Shelf.propTypes = {
    shelfInfo: PropTypes.object.isRequired
}

export default Shelf