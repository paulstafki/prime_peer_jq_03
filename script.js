var apikey = "726872792471deb0e73450f704aec8ba3f439350"; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
    $(".displayResults").append("<div class='masterDiv'></div>");//needs to be declared outside the for loop!!!
    																//remember this problem
    for (var i = 0; i < results.length; i++) {
    	var resultPlatforms = [];
    	for (var j = 0; j < results[i].platforms.length; j++) {
    		resultPlatforms.push(results[i].platforms[j].name);
    	}
    	// console.log("looped once!");

    	$(".masterDiv").append("<div class='clickyDiv'></div>"); 
    	var clickyDiv = $(".masterDiv").children().last(); 	
    	clickyDiv.append("<p>" + results[i].name + "</p>");
		clickyDiv.append("<img src="+results[i].image.icon_url+">");
		$(".masterDiv").append("<div class='showyDiv' style='display:none'></div>");
		var showyDiv = $(".masterDiv").children().last();
		showyDiv.append("<p class='additionalinfo'>" + results[i].description + "</p>");
		showyDiv.append("<p class='additionalinfo'>" + results[i].original_release_date + "</p>");
		showyDiv.append("<p class='additionalinfo'>" + resultPlatforms + "</p>");
	}
}



$(document).ready(function() {
	// Start the search here!
	$('#search').on('click', function(){
		event.preventDefault();
		var searchEntry = $("#mySearch:input").val();	
		search(searchEntry);
		console.log("wait for it... WAIT FOR IT!");
	});
	$(".displayResults").on('click', '.clickyDiv', function(){
    	$(this).next().toggle(2000);

	});
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	        console.log("Results Finished");

	    }
	});

}
