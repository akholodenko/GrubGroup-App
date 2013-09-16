var init_geolocation_denied_view = function () {
	/**	Suggestion PLACE view	*/
	App.GeolocationDeniedView = App.ParentView.extend({
		initialize: function () {
			console.log('init geolocation denied view');

			// render header UI
			this.renderHeader('GrubFor.me says eat at...');
			this.renderContent();
		},
		renderContent: function () {
			var geo_template = _.template(App.tpl.get('geolocation_denied.view'));
			this.view_content_el.html(geo_template());	// add template to header in UI
		}
	});
};