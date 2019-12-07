import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'


const Book = (props) => {
    const {bookInfo, updateBookOnShelf} = props
    return(
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail ?  bookInfo.imageLinks.smallThumbnail : ''})`}}></div>
                <Dropdown 
                updateBookOnShelf={updateBookOnShelf}
                book={bookInfo}
                />
            </div>
            <div className="book-title">{bookInfo.title}</div>
            {bookInfo.authors && bookInfo.authors.map((author) => (
                <div key={author} className="book-authors">{author}</div>    
            ))}
            {bookInfo.averageRating && (<div>Rating {bookInfo.averageRating}</div>)}
        </div>
    )
}

Book.propTypes = {
    bookInfo: PropTypes.object.isRequired
}

export default Book