// Book Class
class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	
	info() {
		let infos =`<b>${this.title}</b><br>by<br><b>${this.author}</b><br><br>${this.pages} pages<br><br>`;
		return infos;
	}
	
	isRead() {
		this.read = !this.read;
	}
}

// Library Class
class Library {
	constructor() {
		this.myLibrary = [];
		this.addBtn = document.querySelector('.addBtn');
		this.myBooks = document.querySelector('.myBooks');
		this.confirmBtn = document.querySelector('.confirmBtn');
		this.cancelBtn = document.querySelector('.cancelBtn');
		this.form = document.querySelector('#newBook');
		this.dialog = document.querySelector('#dialog');
		this.output = document.querySelector('output');
		this.btnDel = document.querySelector('.btnDel');
		this.handleEventsListeners();
	}

	handleEventsListeners() {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				this.dialog.close();
				document.body.classList.remove('dialog-open');
			}
		})

		this.addBtn.addEventListener('click', () => {
			this.dialog.showModal();
			document.body.classList.add('dialog-open');
		})
		
		this.cancelBtn.addEventListener('click', () => {
			dialog.close();
			document.body.classList.remove('dialog-open');
		})

		this.form.addEventListener('submit', (event) => {
			event.preventDefault();
			
			const title = document.querySelector('#title').value;
			const author = document.querySelector('#author').value;
			let pages = document.querySelector('#pages').value || '-';
			const read = document.querySelector('#read').checked;
			
			const newBook = new Book(title, author, pages, read);
			this.myLibrary.push(newBook);
			console.log(this.myLibrary);
			this.renderLibrary();
			this.dialog.close();
			this.form.reset();
			document.body.classList.remove('dialog-open');
		})
		
		document.addEventListener('click', (event) => {
			const index = event.target.getAttribute('data-index');
			if (event.target && event.target.id === 'btnDel') {
				this.myLibrary.splice(index, 1);
				this.renderLibrary();
			} else if (event.target && event.target.id === 'btnRead') {
				this.myLibrary[index].isRead();
				this.renderLibrary();
			};
		})
	}

	addBookToLibrary(title, author, pages, read) {
		const newBook = new Book(title, author, pages, read);
		this.myLibrary.push(newBook);
		this.renderLibrary();
	}

	renderLibrary() {
		this.myBooks.innerHTML = '';
	
		if (this.myLibrary.length === 0) {
			const noBook = document.createElement('li');
			noBook.textContent = "No book in the library yet...";
			this.myBooks.appendChild(noBook);
		} else {
			this.myLibrary.forEach((book, index) => {
				const newBook = document.createElement('div');
				newBook.className = 'book';
				const btnDel = this.createButton('Delete', 'btnDel', index);
				const isRead = (this.myLibrary[index].read) ? 'Read' : 'Not read';
				const btnRead = this.createButton(isRead, 'btnRead', index);
				
				newBook.innerHTML = book.info();
				newBook.appendChild(btnRead);
				newBook.appendChild(btnDel);
				this.myBooks.appendChild(newBook);
			});
		}
	}

	createButton(text, id, index) {
		const button = document.createElement('button');
		button.textContent = text;
		button.setAttribute('data-index', index);
		button.id = id;
	
		if (id === 'btnRead') {
			((this.myLibrary[index].read)
				? button.style.borderColor = '#00FF0080'
				: button.style.borderColor = '#FF000080');
		}
		return button;
	}
}

// Moke data
document.addEventListener('DOMContentLoaded', () => {
	const library = new Library();

	library.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
	library.addBookToLibrary('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 309, true);
	library.addBookToLibrary('A Game of Thrones', 'George R.R. Martin', 694, true);
	library.addBookToLibrary('The Lies of Locke Lamora', 'Scott Lynch', 722, false);
	library.addBookToLibrary('The Way of Kings', 'Brandon Sanderson', 1007, false);
	library.addBookToLibrary('The Eye of the World', 'Robert Jordan', 784, false);
	library.addBookToLibrary('The Chronicles of Narnia: The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 206, false);
	console.log(library.myLibrary);

	library.renderLibrary();
});