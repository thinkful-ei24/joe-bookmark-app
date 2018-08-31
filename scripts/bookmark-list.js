const bookmarkList = function(){

	const generateAddBookmarkFormHTML = function(){
		//makes form to add new bookmarks
		return `
		<div class="add-bookmark-form js-add-bookmark-form round">
		<label for="title-of-new-bookmark">Title:</label>
		<input id="title-of-new-bookmark" type="text" class="title-of-new-bookmark js-title-of-new-bookmark round" required>
		<label for="url-of-new-bookmark">URL:</label>
		<input id="url-of-new-bookmark" type="text" class="url-of-new-bookmark js-url-of-new-bookmark round" required><br>
		<label for="desc-of-new-bookmark">Description:</label><br>
		<input id="desc-of-new-bookmark" type="text" class="desc-of-new-bookmark js-desc-of-new-bookmark round">
		<span>Rating:</span>
		<input type="radio" name="circles" value="1"> <span class="rating-name">1</span>
		<input type="radio" name="circles" value="2"> <span class="rating-name">2</span>
		<input type="radio" name="circles" value="3"> <span class="rating-name">3</span>
		<input type="radio" name="circles" value="4"> <span class="rating-name">4</span>
		<input type="radio" name="circles" value="5"> <span class="rating-name">5</span>
		<button class="cancel-add-btn round">cancel</button>
		<button class="add-bookmark-btn round">add</button>
		</div>
		`;
	};

	const generateNewBookmarkHTML = function() {
		//creates new bookmark and sends to store
	};

	const createNewBookmark = function(title, callback) {
		let newBookmark = JSON.stringify({
			title: title
		});
	};

	return {

	};
}();