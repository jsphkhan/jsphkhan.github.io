//View
var app = app || {};

//this is my Main View
app.LibraryView = Backbone.View.extend({
	el: "#books",
	events: {
		'click #add': 'addBook',
		'keyup #filter': 'filterData'
	},
	initialize: function() { //initialBooks
		//console.log(initialBooks);		
		this.collection = new app.Library(); //initialBooks - where initialBooks is an array of JSON data
		this.collection.fetch({
			reset: true, //imp
			type: 'GET', //not mandatory since it is GET by default
			beforeSend: function() {
				console.log('Sending GET request..........');
			},
			success: function(collection) {  //response is a collection object
				console.log('Success.........', collection);
				//this.render();
			},
			failure: function() {

			},
			complete: function() {
				console.log('Request sending complete.......');
			}
		}); //fetch the books data from server - /api/books
		this.listenTo(this.collection, 'reset', this.render);	//reset event is thrown after fetching since reset:true	
		this.listenTo(this.collection, 'add', this.renderBook);		
	},
	render: function() {
		var self = this;
		self.collection.forEach(function(model) {
			self.renderBook(model);
		});		
	},
	renderBook: function(item) {
		//console.log('collection Add event called');
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append(bookView.render().el);
	},
	addBook: function(e) {
		e.preventDefault();		
		var formData = {};
		$( '#addBook div' ).children( 'input' ).each( function( i, el ) {
		if( $( el ).val() != '' ){
		formData[ el.id ] = $( el ).val();
		}
		});
		//this.collection.add( new app.Book( formData ) );	 //add does not send a HTTP post
		this.collection.create(formData);	 //create sends a HTTP POST to server
	},
	filterData: function() {	//NOT WORKING RIGHT NOW	
		console.log($("#filter").val());
		console.log(this.collection.toJSON());
		return this.collection.models.filter(function(model) {
			console.log(model.get('title') === $("#filter").val());			
			return (model.get('title') === $("#filter").val());//model.get('title').search($("#filter").val());
		});
	}
});