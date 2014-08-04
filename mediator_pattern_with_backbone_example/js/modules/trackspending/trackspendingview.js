define(['js/modules/trackspending/trackspendingcollection', 'js/modules/trackspending/trackspendingmodel'], function(trackSpendingCollection, trackSpendingModel) {

	var TrackSpendingView = Backbone.View.extend({
		tagName: "div",
		className: "track-spending-view",
		initialize: function() {
			console.log('Track Spending View initialized');

			//this.render();
		},
		render: function() {
			console.log('Track Spending View Rendered');
			this.$el.html('<p>Track Spending View</p>');
			return this;
		}
	});

	return TrackSpendingView;
});