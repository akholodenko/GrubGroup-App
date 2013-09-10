/**	Utils class	*/

Utils = function () {}

Utils.getLocation = function (callback) {
  	if (navigator.geolocation)
	    navigator.geolocation.getCurrentPosition(callback, function showError(error) {
	    		var error_message = '';
			  	switch(error.code) 
			    {
				    case error.PERMISSION_DENIED:
				      error_message = "We were not allowed to identify your location."
				      Track.send_deny_geolocation_event();
				      break;
				    case error.POSITION_UNAVAILABLE:
				      error_message = "We had a problem identifying your location."
				      break;
				    case error.TIMEOUT:
				      error_message = "We had a problem identifying your location."
				      break;
				    case error.UNKNOWN_ERROR:
				      error_message = "We had a problem identifying your location."
				      break;
			    }

				console.log(error_message);
			    alert(error_message);

				//$('body').trigger(User.event_request_zipcode, []);	// get zipcode manually from user
			  });    
    else
		console.log("Geolocation is not supported by this browser.");
}

// returns GUID
Utils.get_guid = function () {
	var guid = null;

	// if browser supports localStorage
	if(typeof(Storage)!=="undefined") {
		// if user previously visited, retrieve GUI from localStorage
		if(localStorage.grubgroup_guid)
			guid = localStorage.grubgroup_guid;
		// if user is new, generate GUI and set in localStorage
		else {
			guid = UUID.create();
			localStorage.grubgroup_guid = guid;	// store new user's GUID for future reference
		}
	}
	// for this app instance, assign GUID
	else
		guid = UUID.create();

	return guid;
}