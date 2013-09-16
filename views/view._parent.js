var init_parent_view = function () {

	/**	Suggestion PLACE view	*/
	App.ParentView = Backbone.View.extend({
		el: $(".app"),
		view_content_el: null,
		footer_el: null,
		initialize: function () {
			console.log('init parent view');
		},
		renderHeader: function (text) {
			var header_template = _.template(App.tpl.get('header.component'));
			this.$el.html(header_template({'text' : text}));	// add template to header in UI

			// add view UI container and spinner until content loads
			this.$el.append("<div class='view_content'><img class='loader_image' src='images/ajax-loader.gif'/></div>");
			this.view_content_el = $('.view_content');
		},
		renderFooter: function () {

		}
	});
};