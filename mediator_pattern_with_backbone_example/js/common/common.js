require(['js/modules/accountsummary/accountsummaryview', 'js/modules/transactionlist/transactionlistview', 'js/modules/trackspending/trackspendingview'], function(accountSummaryView, transactionListView, trackSpendingView) {

	var MainView = Backbone.View.extend({
		el: "#container",
		events: {
			'click button#as':'handleAs',
			'click button#tl':'handleTl',
			'click button#ts':'handleTS'
		},
		handleAs: function() {
			console.log('Account Summary Click');
			this.$el.find('#holder').html(accountSummaryView.el);

		},
		handleTl: function() {
			console.log('Transaction List Click');
			this.$el.find("#holder").html(transactionListView.el);

		},
		handleTS: function() {
			console.log('Track Spending Click');
			this.$el.find("#holder").html(trackSpendingView.el);

		},
		initialize: function() {
			console.log('Started', Backbone);
		},
		render: function() {

		}
	});
	

	new MainView();
});