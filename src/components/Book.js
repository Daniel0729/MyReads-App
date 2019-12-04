import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import * as BooksAPI from './BooksAPI'
import Dropdown from './Dropdown'
import '../App.css'

class Book extends Component {
    static propTypes = {
        bookInfo: PropTypes.object.isRequired
    }

    render() {
        const {bookInfo, updateBookOnShelf} = this.props

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
}

export default Book