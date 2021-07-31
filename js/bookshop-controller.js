'use strict'



function onInit() {
    console.log('hello');
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHTML = books.map(function (book) {
        return `<tr class="${getRowColor()}"><td>${book.id}</td><td>${book.name}</td><td>${book.price}</td>
        <td><button class="update" onclick="onUpdateBook(${book.id})">UPDATE</td>
        <td><button class="delete" onclick="onRemoveBook(${book.id})">DELETE</button></td>
        <td><button class="read" onclick="onReadBook(${book.id})">READ</td>` 
    })
    strHTML.unshift('<thead><td>ID</td><td>TITLE</td><td>PRICE</td><td colspan=3>ACTIONS</td></thead>')
    var elTable = document.querySelector('table')
    elTable.innerHTML = strHTML.join('')
    renderPages()
}

function renderPages(){
    var pages = getPagesNum()
    console.log(pages);
    var strHTML = []
    strHTML= pages.map(function(page){
        return `<button class="${isShown(page) ? 'shown' : ''}" onclick="onSetPage(${page})">${page}</button>`
    })
    console.log(strHTML);
    document.querySelector('.pages').innerHTML = strHTML.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var bookName = document.querySelector('[name=bookname]').value
    var bookPrice = document.querySelector('[name=bookprice]').value
    addBook(bookName, bookPrice)
    document.querySelector('[name=bookname]').value = ''
    document.querySelector('[name=bookprice]').value = ''
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('set new price')
    updateBook(bookId, newPrice)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    document.querySelector('.modal img').src = book.img
    document.querySelector('.info').innerText = getLoremIpsum(50)
    document.querySelector('.modal').classList.toggle('hidden')
    document.querySelector('.rate').innerText = book.rating
    var elBtns = document.querySelector('.main button')
    elBtns.foreach(function(btn){
        btn.disable=true
    })
    renderBooks()
}

function onCloseModal() {
    document.querySelector('.modal').classList.toggle('hidden')
    renderBooks()
}

function onRateUp(){
    document.querySelector('.rate').innerText = updateRate(true)
    renderBooks()
}

function onRateDown(){
    document.querySelector('.rate').innerText = updateRate(false)
    renderBooks()
}

function onSetSort(sortBy){
    console.log('im hererrerere');
    setSort(sortBy)
    console.log('what the');
    renderBooks()
}

function onNextPage(){
    nextPage()
    renderBooks()
}

function onPreviousPage(){
    previousPage()
    renderBooks()
}
function onSetPage(pageNum){
    setPage(pageNum)
    renderBooks()
}