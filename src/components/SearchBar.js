import React, { Component } from 'react'
import { Link  } from 'react-router-dom'
import { Throttle } from 'react-throttle'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import '../App.css'


class SearchBar extends Component {
    state = {
        books: [],
        booksOnShelf: []
    }
    
    getBooksIDOnShelf = () => {
        BooksAPI.getAll().then((books) => {
            let booksOnshelfIDs = []
            books.forEach((book) => {
                booksOnshelfIDs.push(book.id)
            })
            this.setState({booksOnShelf: booksOnshelfIDs})
        })
    }

    componentDidMount() {
        this.getBooksIDOnShelf()
    }

    searchBook = (query) => {
        BooksAPI.search(query).then((books) => {
            let bookSearchResults = []
            if (books == null ||books.error) {
                this.setState({books: []})
            } 
            else {
                books.forEach((book) => {
                    if (!this.state.booksOnShelf.includes(book.id)) {
                        bookSearchResults.push(book)
                    }
                })
                this.setState({books: bookSearchResults})
            }
            
        })
      }
    
    addBookToShelf = (book, shelf) => {
        const refeshBookSearchResults = []
        BooksAPI.update(book, shelf).then((results) => {
            BooksAPI.getAll().then((books) => {
                const refeshbooksOnshelfIDs = []
                books.forEach((book) => {
                    refeshbooksOnshelfIDs.push(book.id)
                }) 
                this.state.books.forEach((bookData) => {
                    if (!refeshbooksOnshelfIDs.includes(bookData.id)) {
                        refeshBookSearchResults.push(bookData)
                    }
                })
                this.setState({books: refeshBookSearchResults})
            })
        })
    }
    
    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <Throttle time="1000" handler="onChange">
                    <input type="text" placeholder="Search by title or author" onChange={event=>this.searchBook(event.target.value)}/>
                </Throttle>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.state.books.length > 0 ? (this.state.books.map((book) => (
                       <li key={book.id}>
                        <Book 
                            bookInfo={book}
                            updateBookOnShelf={this.addBookToShelf}
                        />
                        </li>
                  ))): (
                      <h2>Please input an book name</h2>
                  )}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBar