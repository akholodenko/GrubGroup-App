/**	user class	*/
User = function () {
	this.guid = null;
	this.latitude = null;
	this.longitude = null;
	this.zipcode = null;

	this.settings = new Object();

	$('body').on(User.event_settings_driving_toggle, this, this.settings_driving_toggle);
}

/**	event types	*/
User.event_created = 'user_created';
User.event_exists = 'user_exists';
User.event_location_set = 'location_set';
User.event_geolocation_denied = 'location_denied';
User.event_settings_driving_toggle = 'settings_driving_toggle';

/**	initialize current user	*/
User.init = function () {
	Utils.getLocation(User.create);	//init geolocation
}

/** static function that is triggered as a geolocation callback, which creates an instance of the user */
User.create = function (position) {
	App.user = new User();
	App.user.set_guid();	// set user's GUI
	App.user.set_settings();	// load user settings (if previously visited)
	
	// set geolocation in user object instance
	App.user.latitude = position.coords.latitude;
	App.user.longitude = position.coords.longitude;

	$('body').trigger(User.event_created, ['']);
}

/**	set user's global unique identifier (GUI)	*/
User.prototype.set_guid = function () {	
	this.guid = Utils.get_guid();
}

/**	set user's settings from local storage	*/
User.prototype.set_settings = function () {
	var settings = Utils.get_settings();

	if(settings === false) this.settings.is_driving = false;
	else this.settings = settings;
}

/**	update user's setting for driving (affects radius for places)	*/
User.prototype.settings_driving_toggle = function (e, is_driving) {
	var that = e.data;

	that.settings.is_driving = (is_driving == undefined) ? false : is_driving;

	Utils.set_settings(that.settings);	// update settings in local storage
}