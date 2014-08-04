//Require JS Module
//decouple it
define(['js/modules/accountsummary/accountsummarycollection', 'js/mediator/mediator'], function(AccountSummaryCollection, mediator) {

	var AccountSummaryView = Backbone.View.extend({
		tagName: "div",
		className: "account-summary-view",
		//template: $('#accountSummaryTemplate').html(),
		compiledTemplate: Handlebars.compile($('#accountSummaryTemplate').html()),
		collection: null,
		events: {
			"click #btn" : 'handleClick',
			"click .data-row" : 'handleClick'
		},
		handleClick: function(e) {
			//alert('jhjhj');
			//this.$el.parent().html(transactionListView.el);
			//console.log('jllkjlkj: ' + e.currentTarget.id);
			if(this.collection.length > 0 && this.collection) {
				var clickedModel = this.collection.get(e.currentTarget.id);   //retrieve the model from the collection
			}
			mediator.publish('handleRowClick', clickedModel.toJSON()); //notify the mediator with the model data
		},
		initialize: function() {
			console.log('Account Summary View initialized');			
			//this.render();
		},
		render: function() {
			console.log('Account Summary View Rendered');
			var self = this;
			this.$el.html('<h3>Account Summary View</h3>');

			self.collection = new AccountSummaryCollection();
			self.collection.fetch({
				url: "js/modules/accountsummary/data.json",
				type: "GET",
				beforeSend: function() {
					console.log('-------------- Making a call for Account Summary Data');
				},
				success: function(resp) {
					console.log("-------------- Account Summary Data Call success", resp.toJSON());

					var HTML = self.compiledTemplate({results: resp.toJSON()});
					self.$el.append(HTML);
				},
				error: function(error) {
					console.log("-------------- Account Summary Data Call error", error);
				},
				complete: function() {
					console.log('-------------- Account Summary Data Call complete');
				}
			});

			return this;
		}
	});

	return AccountSummaryView;
});