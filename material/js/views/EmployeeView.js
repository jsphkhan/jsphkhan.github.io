var app = app || {};

app.EmployeeView = Backbone.View.extend({
	tagName: 'li',
	className: 'employeeItem row',
	employeeTmpl: _.template($('#employee-item-template').html()),
	events: {
		'click #removeBtn' : 'removeEmployee',
		'dblclick .employee-name' : 'edit',
		'keypress .employee-edit-box' : 'save'
	},
	initialize: function() {
		console.log("Employee View initialized");
		this.listenTo(this.model, 'change:name', this.render);
	},
	render: function() {
		var HTML = this.employeeTmpl(this.model.toJSON());
		this.$el.html(HTML);
		return this;
	},
	removeEmployee: function() {
		this.model.destroy();
		this.remove();
	},
	edit: function(evt) {
		this.employeeNameEl = this.$el.find(".employee-name");
		this.employeeNameEl.addClass('hide');
		//get the reference of employee edit text input box
		this.employeeEditBoxEl = this.$el.find(".employee-edit-box");
		this.employeeEditBoxEl.removeClass('hide');
	},
	save: function(evt) {
		if(evt.keyCode === 13) {
			this.employeeEditBoxEl.addClass('hide');
			this.employeeNameEl.removeClass('hide');

			//save new data in model. this fires a change event
			this.model.save("name", this.employeeEditBoxEl.val());
		}
	}
});