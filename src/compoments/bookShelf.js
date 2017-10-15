import React, { Component } from 'react';



class CurrentRead extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            booksCurrent:nextProps.allBooks
        });
    }
    state={
        booksCurrent: this.props.allBooks
    }

    handleChange(value,book) {
        //BooksAPI.update(book,value).then(Response => console.log(Response));
        let selectBook = this.state.booksCurrent.filter((b) => (book.id === b.id));
        let otherBook = this.state.booksCurrent.filter((b) => (book.id !== b.id));
        selectBook[0].shelf = value;
        let temp = selectBook.concat(otherBook);

        this.setState({booksCurrent: temp});
    }
    render() {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.state.booksCurrent.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
                                <div className="book-authors">{book.authors[0]}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        )
    }
}
export default CurrentRead;

