const bookmarkList = function(){

	$.fn.extend({
		serializeJson: function() {
			const formData = new FormData(this[0]);
			const o = {};
			formData.forEach((val, name) => o[name] = val);
			return JSON.stringify(o);
		}
	});

	const generateAddBookmarkFormHTML = function(){
		//makes form to add new bookmarks
		return `
		<div class=" add-bookmark-box js-add-bookmark-box round">
			<label for="add-bookmark-form visually-hidden">Add a new bookmark</label>
			<form id="add-bookmark-form" class="add-bookmark-form js-add-bookmark-form">
				<label for="title-of-new-bookmark">Title:</label>
				<input id="title-of-new-bookmark" type="text" class="title-of-new-bookmark js-title-of-new-bookmark round" required>
				<label for="url-of-new-bookmark">URL:</label>
				<input id="url-of-new-bookmark" type="text" class="url-of-new-bookmark js-url-of-new-bookmark round" required><br>
				<label for="desc-of-new-bookmark">Description:</label><br>
				<input id="desc-of-new-bookmark" type="text" class="desc-of-new-bookmark js-desc-of-new-bookmark round">
				<span>Rating:</span>
				<select class="rating-selection">
					<option name="circles" value="1"> <span class="rating-name">1</span></option>
					<option name="circles" value="2"> <span class="rating-name">2</span></option>
					<option name="circles" value="3"> <span class="rating-name">3</span></option>
					<option name="circles" value="4"> <span class="rating-name">4</span></option>
					<option name="circles" value="5"> <span class="rating-name">5</span></option>
				</select>
				<button class="cancel-add-btn round">cancel</button>
				<button type="submit" class="add-bookmark-btn round">add</button>
			</form>
		</div>
		`;
	};

	const generateBookmarkHTML = function(bookmark) {
		return `
		<div class = "bookmark-element round" data-item-id="${bookmark.id}">
			<p class="bookmark-title">${bookmark.title}
				<span class="bookmark-rating">${bookmark.rating}</span>
			</p>
		</div>
		`;
	};

	const generateBookmarksString = function(list) {
		const bookmarks = list.map( function(bookmark) {
			if(bookmark.expand === true) {
				return generateExpandedBookmarkHTML(bookmark);
			} else{
				return generateBookmarkHTML(bookmark);
			}
		});
		return bookmarks.join('');
	};

	const generateExpandedBookmarkHTML = function(bookmark) {
		return `
			<div class = "bookmark-element round" data-item-id="${bookmark.id}">
				<p class="bookmark-title">${bookmark.title}
						<span class="bookmark-rating">${bookmark.rating}</span>
				</p>
				<p class="bookmark-description">${bookmark.desc}</p>
				<span class="bookmark-url"><a href="${bookmark.url}">${bookmark.url}</a></span>
				<button class="edit-btn js-edit-btn round">edit</button> 
				<button class="delete-btn js-delete-btn round">delete</button>
			</div>
		`;
	};

	const getIdFromBookmark = function(bookmark) {
		return $(bookmark)
			.closest('.bookmark-element')
			.data('item-id');
	};

	const findBookmarkById = function(id) {
		 return store.bookmarks.find(bookmark => bookmark.id === id);
	};

	const handleExpandBookmark = function(){
		console.log("event listener expand working");
		$('.bookmark-list').on('click', '.bookmark-element', function(event) {
			const id = getIdFromBookmark($(this));
			console.log(id);
			const bookmarkToExpand = findBookmarkById(id);
			console.log(bookmarkToExpand);
			bookmarkToExpand.expand = !bookmarkToExpand.expand;
			render();
		});
	};

	const handleDeleteBookmark = function(){
		console.log("delete button waiting...");
		$('.bookmark-list').on('click', '.delete-btn', function(event) {
			const id = getIdFromBookmark($(this));
			api.deleteBookmark(id, 
				function(data) {console.log("success")}, 
				function(data) {console.log('error')});
		});
		api.getBookmarks();
		render();
	};

	const render = function() {
		console.log('render ran');
		api.getBookmarks((bookmarklist) => {
			bookmarklist.forEach((item) => store.addBookmark(item));
		});
		let bookmarks = store.bookmarks;
		const html = generateBookmarksString(bookmarks);
		$('.bookmark-list').html(html);
	};

	const handleNewBookmarkForm = function() {
		$('.main-options').submit(function(event) {
			event.preventDefault();
			const newBookmarkFormHTML = generateAddBookmarkFormHTML();
			$('.bookmark-list').html(newBookmarkFormHTML);
			handleNewBookmarkFormSubmit();
		});
	};

	const handleNewBookmarkFormSubmit = function() {
		console.log("handelNewBookmarkFormSubmit is running");
		$('.add-bookmark-form').submit(function(event) {
			event.preventDefault();
			console.log("preventing default");
			const bookmarkInfo = getBookmarkDataFromForm();
			api.createNewBookmark(bookmarkInfo, 
				function(data) {console.log("Bookmark Added")},
				function(data) {console.log("Error Ocurred")});
			console.log("post request sent");
			render();
		});
	};

	const getBookmarkDataFromForm = function() {
		const title = $('.add-bookmark-form .title-of-new-bookmark').val();
		const link = $('.add-bookmark-form .url-of-new-bookmark').val();
		const desc = $('.add-bookmark-form .desc-of-new-bookmark').val();
		const rating = $('.add-bookmark-form .rating-selection').val();

		return {
			title: title,
			url: link,
			desc,
			rating,
		};
	};

	// const handleNewBookmarkSubmit= function(title) {
	// 	$('.js-new-bookmark-form').submit(function(event) {
	// 		event.preventDefault();
	// 		const newTitle = $('.js-title-of-new-bookmark').val();
	// 		$('.js-title-of-new-bookmark').val('');
	// 		api.createNewBookmark(
	// 			newTitle,
	// 			newBookmark => {
	// 				store.addBookmark(newBookmark);
	// 			},
	// 			// render();
	// 		)
	// 	};

	// 	};

	const bindEventListeners = function() {
		handleNewBookmarkForm();
		handleExpandBookmark();
		handleDeleteBookmark();
	};

	return {
		render,
		bindEventListeners
	};
}();