import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom'


import Shelf from './components/Shelf'
import SearchBar from './components/SearchBar'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelfs: []
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      let shelfs = []
      books.forEach(book => {
        let existShelf = shelfs.filter(shelf => shelf.id === book.shelf)
        if (existShelf.length > 0) {
          existShelf[0].books.push(book) 
        }
        else {
          let newShelf = {}
          newShelf.name = book.shelf
          newShelf.id = book.shelf
          newShelf.books = []
          newShelf.books.push(book)
    
          shelfs.push(newShelf)
    
        }
      })
      this.setState({ shelfs: shelfs})
    })
  } 

  updateBookOnShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks()
    })
  }


  componentDidMount() {
    this.getAllBooks()
  }
  

  render() {
    return (
      <Router>
        <Switch>
            <Route exact path='/' render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      {
                        this.state.shelfs.map(shelf => (
                          <Shelf 
                            shelfInfo={shelf}
                            key={shelf.id}
                            updateBookOnShelf={this.updateBookOnShelf}
                          />
                        ))
                      }
                    </div>
                  </div>
                  <div>
                    <Link className="open-search" to='/search' >Add a book</Link>
                  </div>
              </div>
              )}>
              </Route>
            <Route exact path='/search' render={({history}) => (
              <SearchBar />
            )}/>
            <Route render={() => (
              <h1>404</h1>
            )}/>
        </Switch>
      </Router>
    )
  }
}

export default BooksApp
