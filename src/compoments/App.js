import React from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from './bookShelf';
import SearchBook from './searchBook';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books });
      }); 
  }

  // update the book's shelf, works both on the display book page and search page
  updateShelf = (shelf,book) => {
    BooksAPI.update(book,shelf)
    let selectBook = this.state.books.filter((b) => (book.id === b.id));
    if (selectBook.length === 0) {
      BooksAPI.getAll().then((books) => {
        this.setState({books: books});
      }) 
    }
    else {
      let otherBook = this.state.books.filter((b) => (book.id !== b.id));
      selectBook[0].shelf = shelf;
      let temp = selectBook.concat(otherBook);
      this.setState({books: temp});
    }
    
    
  }
  
  //render three bookshelf and searchBook and sign them differnet route
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <BookShelf 
              allBooks={this.state.books.filter((book)=>(book.shelf === "currentlyReading"))}
              shelf='currentlyReading'
              onUpdateShelf={this.updateShelf}
              />
            <div className="list-books-content">
              <div>
                <BookShelf 
                allBooks={this.state.books.filter((book)=>(book.shelf === "wantToRead"))}
                shelf='wantToRead'
                onUpdateShelf={this.updateShelf}
                />
              </div>
              <div>    
                <BookShelf
                allBooks={this.state.books.filter((book)=>(book.shelf === "read"))}
                shelf='read'
                onUpdateShelf={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        
        <Route path='/search' render={() => (
          <div>
            <SearchBook 
            onUpdateShelf={this.updateShelf}
            bookOnShelf={this.state.books}/>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
