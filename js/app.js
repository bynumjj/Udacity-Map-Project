

var initialVenues = [
//NOTE:  This data could be downloaded from a server as a JSON
{
		number: 230,
		name: 'St Niniands Hall',
		address:  '40 Comely Bank',
		zipcode: "EH4 1AG",
		latlng: {lat: 55.959488, lng: -3.225575},
		imgSrc: '#',
		show: 'TBD',
		message: "test message",
		visible: true
},

{
		number: 12,
		name: 'Stand Comedy Club 3 & 4',
		address:  '28 York Place',
		zipcode: "EH1 3EP",
		latlng: {lat: 55.956461, lng: -3.190675},
		imgSrc: '#',
		show: 'TBD',
		message: "test message 2",
		visible: true
},

{
		number: 60,
		name: 'Canongate Kirk',
		address:  '153 Canongate',
		zipcode: "EH8 8BN",
		latlng: {lat: 55.951827, lng: -3.179609},
		imgSrc: '#',
		show: 'TBD',
		message: "test message 3",
		visible: true
}
];




var marker;

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.95162, lng: -3.187821},
    scrollwheel: true,
    zoom: 12
  }); // close var map


//iterates through venue array and creates markers for each location
// incorporate   marker.setMap(null)
for (var i = 0; i < 3; i++) {
var marker = new google.maps.Marker({
    position: initialVenues[i].latlng,
    map: map,
    //animation: google.maps.Animation.DROP,
    title: initialVenues[i].name

  });//end marker
}//end for loop


/*var infowindow = new google.maps.InfoWindow({
    content: initialVenues[i].message
  });

//marker.addListener('click', toggleBounce);
marker.addListener('click', function() {
infowindow.open(map, marker);
});

}//end marker for loop
*/

/*  Comment until I fix animation
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}  // end toggleBounce
*/
} // end initMap



/*  filter function - works
var searchTerm = "a"
var filter = function (searchTerm) {
initialVenues.forEach(function(venueItem){  //  fills up venueList array with venue objects from initialVenues
	if ((venueItem.name.toLowerCase().indexOf(searchTerm.toLowerCase())) === -1) {
		venueItem.visible = false
	}
	else {
		venueItem.visible = true
	} // end else
}); // end for Each
} // end filter

filter(searchTerm)

console.log("0   " + initialVenues[0].visible);
console.log("1   " + initialVenues[1].visible);
console.log("2   " + initialVenues[2].visible)

*/






/* knockout code to generate venue list for nav menu */

var Venue = function(data) {


this.name = ko.observable(data.name);
this.visible = ko.observable(data.visible);

}// end Venue()

// ViewModel code
var ViewModel = function() {

var self = this;
//this.searchTerm = ko.observable('')



this.searchTerm = ko.observable('');


filter = function (searchTerm) {
initialVenues.forEach(function(venueItem){  //  fills up venueList array with venue objects from initialVenues
	if ((venueItem.name.toLowerCase().indexOf(self.searchTerm().toLowerCase())) === -1) {
		venueItem.visible = false
	}
	else {
		venueItem.visible = true
	} // end else
console.log(venueItem.visible);


}); // end for Each
} // end filter


filter()














// test function for list clicking
bob = function() {
	console.log("yyy")
};




this.venueList = ko.observableArray([]); // will hold all new venues

initialVenues.forEach(function(venueItem){  //  fills up venueList array with venue objects from initialVenues
	self.venueList.push(new Venue(venueItem) )
});


//this.currentVenue = ko.observable(this.venueList()[0]);  //asssigns venue object to currentVenue
//don't need this to display in nav list.  used for click function
}// end ViewModel

/* This code could be used to add click functionality to select marker
this.incrementCounter = function() {
	self.currentCat().clickCount(self.currentCat().clickCount() + 1);
		};

// changes currentCat to cat clicked on in HTML list of cats
this.setCat = function(clickedCat) {
self.currentCat(clickedCat);
			}; // end setCat */



ko.applyBindings(new ViewModel());













//KEy  AIzaSyCVPY0V9qzsmmP-J0JL8Obl72Md73sKlXo