'use strict'

var gNextId;
const PAGE_SIZE = 5
var gCurrPage = 0;
var gIsDark = false;
var gCurrBook;
var gBooks;
var gImges = [
    "/images/book0.jfif",
    "/images/book1.jfif",
    "/images/book2.jfif",
    "/images/book3.jfif",
    "/images/book4.jfif"
]

_createBooks()

function _creatBook(name, price) {
    if (!gNextId || gNextId === NaN) {
        getNextId()
    }
    return {
        id: gNextId++,
        name,
        price,
        img: `./images/book${getRandomInteger(0,4)}.jfif`,
        rating: 0
    }
}

function getNextId() {
    console.log(gNextId);
    var ids = gBooks.map(function (book) {
        return book.id
    })
    console.log(ids);
    gNextId = Math.max(...ids) + 1
    console.log(gNextId);
}

function _createBooks() {
    console.log('im creating books');
    var books = loadFromStorage('booksDB')
    if (!books || !books.length) {
        gNextId = 101
        books = []
        books.push(_creatBook('Book', 0))
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage('booksDB', gBooks)
}

function nextPage() {
    gCurrPage++
    gIsDark = false;
    if (gCurrPage * PAGE_SIZE > gBooks.length) gCurrPage = 0;
}
function previousPage() {
    gCurrPage--
    gIsDark = false;
    if (gCurrPage < 0) {
        gCurrPage = Math.ceil(gBooks.length / PAGE_SIZE)-1;
    }
}

function setPage(pageNum) {
    gCurrPage = pageNum - 1
}

function getPagesNum() {
    var pages = []
    var numOfPages = Math.ceil(gBooks.length / PAGE_SIZE)
    for (var i = 1; i <= numOfPages; i++) {
        pages.push(i)
    }
    return pages
}

function isShown(pageNum) {
    if (pageNum === (gCurrPage + 1)) return true
    return false
}

function getBooks() {
    var firstBookOnPage = PAGE_SIZE * gCurrPage
    return gBooks.slice(firstBookOnPage, firstBookOnPage + PAGE_SIZE)
}

function getBookById(bookId) {
    gBooks.forEach(function (currBook) {
        if (currBook.id === bookId) {
            gCurrBook = currBook
        }
    })
    return gCurrBook
}

function removeBook(bookId) {
    gBooks.forEach(function (book, idx) {
        if (book.id === bookId) gBooks.splice(idx, 1)
    })
    _saveBooksToStorage()
}

function addBook(bookName, bookPrice) {
    if (!bookName || !bookPrice) {
        gIsDark = gIsDark ? false : true
        return
    }
    gBooks.unshift(_creatBook(bookName, bookPrice))
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    gBooks.forEach(function (book) {
        if (book.id === bookId) {
            console.log('im changing the price');
            book.price = newPrice;
        }
    })
    _saveBooksToStorage()
}

function getDetails(bookId) {
    gBooks.find(function (book) {
        return book.id === bookId
    })
}

function updateRate(isUp) {

    if (isUp && gCurrBook.rating < 9) gCurrBook.rating++
    if (!isUp && gCurrBook.rating > 0) gCurrBook.rating--
    _saveBooksToStorage()
    return gCurrBook.rating
}

function setSort(sortBy) {
    console.log('now hererer');
    if (sortBy === 'name') sortByName()
    if (sortBy === 'price') sortByPrice()
}

function sortByName() {
    gBooks = gBooks.sort(function (book1, book2) {
        console.log('finally herer by name');
        return book1.name.localeCompare(book2.name)
    })

}
function sortByPrice() {
    gBooks = gBooks.sort(function (book1, book2) {
        console.log('finally herer by price');
        return book1.price - book2.price
    })
}

function getRowColor() {
    gIsDark = gIsDark ? false : true;
    return gIsDark ? 'dark' : ''
}