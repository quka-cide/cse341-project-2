const Book = require('../models/book')

//GET all books
async function getBooks(req, res) {
    try {
        const books = await Book.find()
        res.json(books)
    } catch(error) {
        res.status(500).json({ message: 'Error fetching books', error})
    }
}

//GET one book
async function getOneBook(req, res) {
    try {
        const book = await Book.findById(req.params.id)
        if(!book) {
            res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json(book)
    } catch(error) {
        res.status(500).json({ message: 'Error Fetching book', error})
    }
}

//POST
async function createBook(req, res) {
    try {
        const { title, author, genre, rating, review, pages, status, userId } = req.body

        if(!title || !author) {
            res.status(400).json('Title and author are required!')
        }

        const book = new Book({
            title,
            author,
            genre,
            rating,
            review,
            pages,
            status,
            userId
        })

        const savedBook = await book.save()
        res.status(201).json(savedBook)
    } catch(error) {
        res.status(500).json({ message: 'Error creating book', error })
    }
}

//PUT
async function updateBook(req, res) {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(400).json({ message: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
}

//DELETE
async function deleteBook(req, res) {
    try {
        const deletedBook = await Book.findOneAndDelete({ _id: req.params.id })

        if(!deletedBook) {
            res.status(404).json({ message: 'Book not found'})
        }
        res.json({ message: 'Book deleted successfully'})
    } catch(error) {
        res.status(500).json({ message: 'Error deleting book', error })
    }
}

module.exports = {
    getBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook,
}