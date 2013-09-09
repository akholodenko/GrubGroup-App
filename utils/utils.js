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
			    
			    $('.tip').text(error_message).show();

				$('body').trigger(User.event_request_zipcode, []);	// get zipcode manually from user
			  });    
    else
    	$('.tip').text("Geolocation is not supported by this browser.").show();
}