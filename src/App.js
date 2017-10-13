import React from 'react';
import * as BooksAPI from './BooksAPI';
import CurrentRead from './CurrentRead';
import WantRead from './WantRead';
import AlreadyRead from './AlreadyRead';
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
              <CurrentRead 
              allBooks={this.state.books.filter((book)=>(book.shelf === "currentlyReading"))}
              />
            <div className="list-books-content">
              <div>
                <WantRead allBooks={this.state.books.filter((book)=>(book.shelf === "wantToRead"))}/>
              </div>
              <div>    
                <AlreadyRead allBooks={this.state.books.filter((book)=>(book.shelf === "read"))}/>
              </div>
            </div>
      </div>
    )
  }
}

export default BooksApp
