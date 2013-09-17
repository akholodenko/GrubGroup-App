var init_settings_view = function () {
	/**	Suggestion PLACE view	*/
	App.SettingsView = App.ParentView.extend({
		initialize: function () {
			console.log('init settings view');

			this.view_content_el = $('.view_content');

			// render UI
			this.renderHeader('GrubFor.me says eat at...');
			this.renderContent();
		},
		renderContent: function () {
			if(!$('.settings').hasClass('on')) $('.settings').addClass('on');

			//var geo_template = _.template(App.tpl.get('geolocation_denied.view'));
			//this.view_content_el.html(geo_template());	// add template to header in UI
			this.view_content_el.html("settings coming soon");	// add template to header in UI
		}
	});
};