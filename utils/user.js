/**	user class	*/
User = function () {
	this.guid = null;
	this.latitude = null;
	this.longitude = null;
	this.zipcode = null;
}

/**	event types	*/
User.event_created = 'user_created';
User.event_exists = 'user_exists';
User.event_location_set = 'location_set';

/**	initialize current user	*/
User.init = function () {
	Utils.getLocation(User.create);	//init geolocation
}

/** static function that is triggered as a geolocation callback, which creates an instance of the user */
User.create = function (position) {
	App.user = new User();
	App.user.set_guid();	// set user's GUI
	
	// set geolocation in user object instance
	App.user.latitude = position.coords.latitude;
	App.user.longitude = position.coords.longitude;	

	$('body').trigger(User.event_created, ['']);
}

/**	set user's global unique identifier (GUI)	*/
User.prototype.set_guid = function () {	
	this.guid = Utils.get_guid();
}