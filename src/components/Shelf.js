import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import * as BooksAPI from './BooksAPI'
import Book from './Book'
import '../App.css'


class Shelf extends Component {
    static propTypes = {
        shelfInfo: PropTypes.object.isRequired
    }

    render() {
        const {shelfInfo, updateBookOnShelf} = this.props
        return (
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
    
}

export default Shelf