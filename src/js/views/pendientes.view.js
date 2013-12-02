var app = app || {};
app.AppView = Backbone.View.extend({
	el : '#pendientesapp',
	initialize : function() {
		this.$input = this.$('#new-todo');
		this.$main = this.$('#main');
		this.listenTo(app.Pendientes, 'add', this.addOne);
	},
	addOne : function(pendiente) {
		var view = new app.PendienteView({
			model : pendiente
		});
		$('#todo-list').append(view.render().el);
	},
});

app.PendienteView = Backbone.View.extend({
	tagName : 'li',
	template: _.template( $('#item-template').html() ),
	events : {
		'dblclick label' : 'edit',
		'keypress .edit' : 'updateOnEnter',
		'blur .edit' : 'close'
	},
	initialize : function() {
		this.listenTo(this.model, 'change', this.render);

	},

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$input = this.$('.edit');
		return this;
	},

	edit : function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close : function() {
		var value = this.$input.val().trim();
		if (value) {
			this.model.save({
				title : value
			});
		}
		this.$el.removeClass('editing');
	},

	updateOnEnter : function(e) {
		if (e.which === ENTER_KEY) {
			this.close();
		}
	}

});
