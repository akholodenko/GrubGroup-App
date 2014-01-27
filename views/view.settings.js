var init_settings_view = function () {
	/**	Suggestion PLACE view	*/
	App.SettingsView = App.ParentView.extend({
		template: _.template(App.tpl.get('settings.view')),
		initialize: function () {
			console.log('init settings view');

			this.view_content_el = $('.view_content');

			// render UI
			this.renderHeader('GrubFor.me says eat at...');
			this.renderContent();
		},
		renderContent: function () {
			if(!$('.settings').hasClass('on')) $('.settings').addClass('on');

			this.view_content_el.html(this.template(App.user.settings));	// add template to header in UI

			$('#settings_driving, #settings_temp').iphoneStyle({
				checkedLabel: 'YES ',
				uncheckedLabel: 'NO',
				onChange: function (element, value) {
					//console.log(value);
					$('body').trigger(User.event_settings_driving_toggle, [value]);
				}
			});
		}
	});
};