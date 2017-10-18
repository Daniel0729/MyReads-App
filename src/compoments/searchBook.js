import React from 'react';
import * as BooksAPI from '../BooksAPI';
import '../App.css';
import { Link } from 'react-router-dom';

class SearchBook extends React.Component {
    state = {
        searchBooks:[],
        booksOnShelf: this.props.bookOnShelf
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            booksOnShelf:nextProps.bookOnShelf
        });
    }

    searchBook =(query) => {
        if (query) {
            BooksAPI.search(query).then(Response => {
                if (!Response.error) {
                    for (let book of this.state.booksOnShelf) {
                        Response = Response.filter((b) => b.id !== book.id);
                    }
                    let temp = Response.map(function(book) {
                        book.shelf = 'none';
                        return book;
                    });
                    temp = temp.concat(this.state.booksOnShelf);
                    this.setState({
                        searchBooks: temp
                    })
                }
                else {
                    console.log(Error(`something wrong`));
                    this.setState({
                        searchBooks:[]
                    })
                    
                }
            })
        }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onChange={event=>this.searchBook(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {(this.state.searchBooks.length !== 0) ? (this.state.searchBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                                        </div>
                                        <div className="book-shelf-changer">
                                            <select defaultValue={book.shelf} onChange={(event) => this.props.onUpdateShelf(event.target.value,book)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    {book.authors && ( book.authors.map((author) => (
                                        <div key={author} className="book-authors">${author}</div>
                                    )))}   
                                </div>
                            </li>))) : (
                                <div>
                                    en... try to input another title or author
                                </div>
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default SearchBook

          