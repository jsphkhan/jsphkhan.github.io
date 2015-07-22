//View
var app = app || {};

//this is my Sub View
app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template($('#bookTemplate').html()),
	events: {
		'click .delete': 'deleteBook',
		'dblclick .title': 'editBook',
		'keypress .edit': 'saveBook',
		'blur .edit': 'cancelEdit'
	},
	initialize: function() {
		console.log('Book Sub View Created');
		console.log(this.model.toJSON());
		this.listenTo(this.model, 'change:title', this.render);
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	deleteBook: function() {		
		//removes the model from collection and also sends a DELETE request to server - passes the model's id
		this.model.destroy();
		this.remove(); //removes the current view instance from DOM
	},
	editBook: function(e) {	
		var targetInputBox = this.$el.find(".edit");					
		$(e.target).addClass('none');
		targetInputBox.val($(e.target).text());
		targetInputBox.removeClass('none');
		targetInputBox.focus();
	},
	saveBook: function(e) {		
		if(e.which === 13) { //on press of ENTER KEY			
			//this.model.set("title", $(e.target).val());
			//sends a PUT request to server - passes model id, patch: true ensures that the request sends only the attributes that has changed.
			//when patch:true is set, then a PATCH request is sent to server with only the changed attribute and not the whole 
			this.model.save("title", $(e.target).val(), {patch: true}); 
			//update the UI
			this.cancelEdit(e);
		}
	},
	/*handleChange: function() {
		console.log('change');
		this.render();
	},*/
	cancelEdit: function(e) {
		//update the UI
		this.$el.find(".title").removeClass('none');
		$(e.target).addClass('none');
	}
});