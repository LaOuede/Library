const myLibrary = [];

const addBtn = document.querySelector('.addBtn');
const myBooks = document.querySelector('.myBooks');
const confirmBtn = document.querySelector('.confirmBtn');
const cancelBtn = document.querySelector('.cancelBtn');
const form = document.querySelector('#newBook');
const dialog = document.querySelector('#dialog');
const output = document.querySelector('output');
const btnDel = document.querySelector('.btnDel');

function Book(title, author, pages, read, review) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.review = review;

	this.info = function() {
		let infos = `<b>${title}</b><br>by<br><b>${author}</b><br><br>${pages} pages<br><br>`;
		return infos;
	}

	this.isRead = function() {
		this.read = !this.read;
	}
};

function addBookToLibrary(title, author, pages, read, review) {
	const newBook = new Book(title, author, pages, read, review);
	myLibrary.push(newBook);
	renderLibrary();
}


function renderLibrary() {
	myBooks.innerHTML = '';
	
	if (myLibrary.length === 0) {
		const noBook = document.createElement('li');
		noBook.textContent = "No book in the library yet...";
		myBooks.appendChild(noBook);
	} else {
		myLibrary.forEach((book, index) => {
			const newBook = document.createElement('div');
			newBook.className = 'book';
			const btnDel = createButton('Delete', 'btnDel', index);
			const isRead = (myLibrary[index].read) ? 'Read' : 'Not read';
			const btnRead = createButton(isRead, 'btnRead', index);
			
			newBook.innerHTML = book.info();
			newBook.appendChild(btnRead);
			newBook.appendChild(btnDel);
			myBooks.appendChild(newBook);
		});
	}
}

const createButton = (text, id, index) => {
	const button = document.createElement('button');
	button.textContent = text;
	button.setAttribute('data-index', index);
	button.id = id;

	if (id === 'btnRead') {
		((myLibrary[index].read)
			? button.style.borderColor = '#00FF0080'
			: button.style.borderColor = '#FF000080');
	}
	return button;
}

confirmBtn.addEventListener('click', (event) => {
	event.preventDefault();

	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const read = document.querySelector('#read').checked;
	const review = document.querySelector('#review').value;
	
	addBookToLibrary(title, author, pages, read, review);
	
	console.log(myLibrary);
	dialog.close();
	form.reset();
	document.body.classList.remove('dialog-open');
});

addBtn.addEventListener('click', () => {
	dialog.showModal();
	document.body.classList.add('dialog-open');
})

cancelBtn.addEventListener('click', (event) => {
	dialog.close();
	document.body.classList.remove('dialog-open');
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		dialog.close();
		document.body.classList.remove('dialog-open');
	}
});

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', (event) => {
		const index = event.target.getAttribute('data-index');
		if (event.target && event.target.id === 'btnDel') {
			myLibrary.splice(index, 1);
			renderLibrary();
		} else if (event.target && event.target.id === 'btnRead') {
			myLibrary[index].isRead();
			renderLibrary();
		};
	});
});

function mokeData() {
	addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
	addBookToLibrary('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 309, true);
	addBookToLibrary('A Game of Thrones', 'George R.R. Martin', 694, true);
	addBookToLibrary('The Lies of Locke Lamora', 'Scott Lynch', 722, false);
	addBookToLibrary('The Way of Kings', 'Brandon Sanderson', 1007, false);
	addBookToLibrary('The Eye of the World', 'Robert Jordan', 784, false);
	addBookToLibrary('The Chronicles of Narnia: The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 206, false);
	console.log(myLibrary);
	renderLibrary();
}

mokeData();