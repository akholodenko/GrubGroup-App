var init_suggestion_view = function () {

	/**	Suggestion PLACE view	*/
	App.SuggestionView = Backbone.View.extend({
		el: $(".app"),
		template: _.template(App.tpl.get('suggestion.view')),
		initialize: function () {
			console.log('init suggestion view');

			this.model = new App.Place();
			this.model.on(App.event.suggestion_loaded, this.render, this);
			this.model.fetch_suggestion();
		},
		render: function () {
			console.log('RENDER SUGGESTION');
			this.$el.html(this.template(this.model.toJSON()));	// add template to view in UI
			return this;
		}
	});
};