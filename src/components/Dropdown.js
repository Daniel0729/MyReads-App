import React, { Component } from 'react'

class Dropdown extends Component {
    render() {
        const {updateBookOnShelf, book} = this.props
        return (
            <div className="book-shelf-changer">
                <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => updateBookOnShelf(book, event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default Dropdown
