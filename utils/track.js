/**	TRACK CLASS	*/

Track = function () {}

Track.Key_User_Action = "user action";	// top level event for collecting data from perspective of user

Track.Key_Page_Load = "page load";
Track.Key_Click_Link = "click_link";
Track.Key_DenyLocation = "deny_location";
Track.Key_User = "user";

/*
Track.send_event = function (event)
{
	event.data.params.action = event.data.title;	
	event.data.title = Track.Key_User_Action;
	
	// user information for event
	if(App.user == null)
		event.data.params.guid = Utils.get_guid();
	else {	
		event.data.params.guid = App.user.guid;	
		event.data.params.zipcode = App.user.zipcode;
		event.data.params.city = App.user.city;
		event.data.params.latitude = App.user.latitude;			
		event.data.params.longitude = App.user.longitude;		
	}
	
	mixpanel.identify(event.data.params.guid);	// idetify user to MixPanel by GUID for unique data gathering
	mixpanel.track(event.data.title, event.data.params);	// send event beacon
}
*/

/**	send Event to google analytics	*/
Track.sendGAEvent = function (category, action, label, value) {
	if(label == undefined) label = '';
	if(value == undefined) value = 0;

	_gaq.push(['_trackEvent', category, action, label, value]);
	//console.log('GA: ' + category + '/' + action + '/' + label + '/' + value);
}

/**	send Place suggestion event	*/
Track.sendSuggestionEvent = function (location, name) {
	Track.sendGAEvent(Track.Key_Page_Load, 'suggestion', location);
	Track.sendGAEvent('suggestion', location, name);
	Track.sendGAEvent(Track.Key_User, 'location', location);	// send user location
	Track.sendGAEvent(Track.Key_User, 'guid', App.user.guid);	// send user guid
}

/** send Hold buttona ction */
Track.sendHoldButtonEvent = function (value) {
	if(value) value = 1;
	else value = 0;

	Track.sendGAEvent(Track.Key_User, 'action', 'hold button toggle', value);
}

/** send Next buttona ction */
Track.sendNextButtonEvent = function () {
	Track.sendGAEvent(Track.Key_User, 'action', 'next button click');
}