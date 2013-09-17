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
			if(!$('navbar').length) {	// if doesn't already exist
				var header_template = _.template(App.tpl.get('header.component'));
				this.$el.html(header_template({'text' : text}));	// add template to header in UI

				// add view UI container and spinner until content loads
				this.$el.append("<div class='view_content'><img class='loader_image' src='images/ajax-loader.gif'/></div>");
				this.view_content_el = $('.view_content');

				$('.settings').on('click', this.settings_click);
			}
		},
		renderFooter: function () {},
		settings_click: function (e) {
			console.log('settings');

			if($('.settings').hasClass('on')) {
				app.navigate("home", {trigger: true, replace: true});
				$('.settings').removeClass('on');
			}
			else {
				$('.settings').addClass('on');
				app.navigate("settings", {trigger: true, replace: true});
			}
		}
	});
};