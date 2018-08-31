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
		<div class = "bookmark-element round">
			<p class="bookmark-title">${bookmark.title}
				<span class="bookmark-rating">${bookmark.rating}</span>
			</p>
		</div>
		`;
	};

	const generateExpandedBookmark = function() {
		return `

		`;
	};

	const render = function() {
		console.log('render ran');
		let bookmarks = store.bookmarks;

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


	const generateNewBookmarkHTML = function(bookmark) {
		//creates new bookmark
		return `
			<div class = "bookmark-element round">
				<p class="bookmark-title" data-item-id="${bookmark.id}">${bookmark.title}
						<span class="bookmark-rating">&#9675;&#9675;</span>
				</p>
			</div>
		`;
	};

	const generateExpandedBookmarkHTML = function(bookmark) {
		return 	`
		<div class = "bookmark-element round">
			<p class="bookmark-title" data-item-id="${bookmark.id}">${bookmark.title}
					<span class="bookmark-rating">&#9675;&#9675;</span>
			</p>
			<p class="bookmark-description js-bookmark-description">A search Engine that follows you everywhere!</p>
			<button class="edit-btn js-edit-btn round">edit</button> 
			<button class="delete-btn js-delete-btn round">delete</button>
		</div>
		`;
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
	};

	return {
		render,
		bindEventListeners
	};
}();