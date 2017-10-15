import React from 'react';
import * as BooksAPI from './BooksAPI';
import bookShelf from './bookShelf';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books });
      }); 
  }
  
 
  render() {
    return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <bookShelf 
              allBooks={this.state.books.filter((book)=>(book.shelf === "currentlyReading"))}
              shelf='currentlyReading'
              />
            <div className="list-books-content">
              <div>
                <bookShelf 
                allBooks={this.state.books.filter((book)=>(book.shelf === "wantToRead"))}
                shelf='wantToRead'
                />
              </div>
              <div>    
                <bookShelf
                allBooks={this.state.books.filter((book)=>(book.shelf === "read"))}
                shelf='read'
                />
              </div>
            </div>
      </div>
    )
  }
}

export default BooksApp
