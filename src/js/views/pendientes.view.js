var app = app || {};
var ENTER_KEY=13;

app.PendienteView = Backbone.View.extend({
	tagName : 'li',
	template : _.template($('#item-template').html()),
	events : {
		'keypress .edit' : 'updateOnEnter',
		'blur .edit' : 'close',
		'click .toggle' : 'togglecompleted',
		'click .destroy' : 'clear'
	},

	initialize : function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('completed', this.model.get('completed'));
		this.$input = this.$('.edit');
		return this;
	},

	togglecompleted : function() {
		this.model.changeState();
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
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter : function(e) {
		if (e.which === ENTER_KEY) {
			this.close();
		}
	},

	clear : function() {
		this.model.destroy();
	}
});

