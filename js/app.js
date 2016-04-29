

var map, infowindow, marker;


var initialShows = [

{
		show: 'Jason Byrne',
		venue: 'Assembly Hall',
		address:  'Mound Place',
		zipcode: "EH1 2LU",
		LatLng: {lat: 55.949863, lng: -3.195508},
		imgSrc: 'images/jasonbyrne.jpg',
		windowContent: 'test message Jason Byrne'
},

{
		show: 'The Elephant Man',
		venue: 'Gilded Ballon',
		address:  'Teviot Row House',
		zipcode: "EH8 9AJ",
		LatLng: {lat: 55.944899, lng: -3.188864},
		imgSrc: 'images/elephantman.jpg',
		windowContent: 'test message elephant man'
},

{
		show: 'Fawlty Towers',
		venue: 'Best Restaurant',
		address:  '16 Drummond Street',
		zipcode: "EH8 9TX",
		LatLng: {lat: 55.947355, lng: -3.185113},
		imgSrc: 'images/fawltytowers.jpg',
		windowContent: "test message fawlty towers"
},

{
		show: 'Kit Hesketh-Harvey',
		venue: 'G & V Royal Mile Hotel',
		address:  '1 George IV Bridge',
		zipcode: "EH1 1AD",
		LatLng: {lat: 55.948985, lng: -3.192447},
		imgSrc: 'images/kithesketh.jpg',
		windowContent: "test message Kit Heskety"
},

{
		show: "Jesus Christ Superstar",
		venue: 'Edinburgh Tabernacle',
		address:  '41-43 Inverleith Gardens',
		zipcode: "EH3 5PR",
		LatLng: {lat: 55.970603, lng: -3.213589},
		imgSrc: 'images/Superstar.jpg',
		windowContent: "test message superstar"
},

{
		show: 'Hardeep Singh Kohli',
		venue: 'Pleasance Dome',
		address:  'Potterrow',
		zipcode: "EH8 9AL",
		LatLng: {lat: 55.946225, lng: -3.187396},
		imgSrc: 'images/hardeepsingh.jpg',
		windowContent: "test message Hardeep"
},

{
		show: 'Stewart Lee',
		venue: 'The Stand Comedy Club',
		address:  '5 York Place',
		zipcode: "EH1 3EB",
		LatLng: {lat: 55.955710, lng: -3.192245},
		imgSrc: 'images/stewartlee.jpg',
		windowContent: "test message Stewart Lee"
},

{
		show: "Paul Merton",
		venue: 'Pleasance Courtyard',
		address:  '60 Pleasance',
		zipcode: "EH8 9TJ",
		LatLng: {lat: 55.947379, lng: -3.182045},
		imgSrc: 'images/paulmerton.jpg',
		windowContent: "test message Paul Merton"
},

{
		show: 'Puddles Pity Party',
		venue: 'Assembly George Square Gardens',
		address:  'George Square',
		zipcode: "EH8 9HL",
		LatLng: {lat: 55.944257, lng: -3.189112},
		imgSrc: 'images/puddles.jpg',
		windowContent: 'test message PUddles'
},

{
		show: "Joe Stilgoe",
		venue: 'Assembly Checkpoint',
		address:  '3 Bristo Place',
		zipcode: "EH1 1EY",
		LatLng: {lat: 55.946298, lng: -3.189972},
		imgSrc: 'images/joestilgoe.jpg',
		windowContent: "test message joe Stilgoe"
}

];


// creates the map

// Venue() turns initial input data into ko.observable format.
// creates markers and click functions and adds them to venue items
// as a property.
var Venue = function(data) {

var self = this;

this.show = ko.observable(data.show);
this.venue = ko.observable(data.venue);
this.address = data.address;
this.zipcode = data.zipcode;
this.latlng = data.latlng;
this.imgSrc = data.imgSrc;
this.wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.show() + '&prop=revisions&rvprop=content&format=json&callback=wikiCallback'

this.contentString = "<p>"+ "<img height='120px' src =" + this.imgSrc + '>' + "<br/>" + this.show() + "<br/>" + this.venue() + "<br/>" + this.address + '<br/>' + '%wiki%' + "</p>"
//

$.ajax({
    url: this.wikiURL,
    dataType: 'jsonp',
    success:  function(response) {
	var articleSubject = response[0];
	var link = 'http://en.wikipedia.org/wiki/' + articleSubject;
	var wikiLink = '<a href="' + link + '">'  + self.show() + '</a>';
	self.content = self.contentString.replace('%wiki%', wikiLink)

// creates markers
this.marker = new google.maps.Marker({
    position: data.LatLng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: data.show
  });// end var marker

//adds click functions to markers
this.marker.addListener('click', (function() {
		//adds content to infowindow
	infowindow.setContent(self.content);
		//opens infowindow
	infowindow.open(map, this);
		// adds bounce animation
	if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }  // close else
  	// limits how long markers bounce after click
	setTimeout(function() {self.marker.setAnimation(null)}, 2050);
  } // close function
)); // close marker.addListener

    console.log(this.wiki)
    } // end success
}).fail(function() {
	alert('Your wikipedia request has failed')
	}); // end ajax

}// end Venue()

// ViewModel code
var ViewModel = function() {

var self = this;

this.searchTerm = ko.observable("");
this.showList = ko.observableArray([]);

// adds each venue to observable array venueList
initialShows.forEach(function(item){
	self.showList.push(new Venue(item))
});


this.hide = function() {
this.visible
	this.marker.event('click')
}

// pushes filtered shows into filteredList array
// hides non-selected markers
// closes infowindow
this.filteredList = ko.computed(function() {
		var filter = self.searchTerm().toLowerCase();
		if (!filter) {
			return self.showList();
		} else {
			return ko.utils.arrayFilter(self.showList(), function(item) {
				var string = item.show().toLowerCase();
				var showMarker = (string.indexOf(filter) >= 0);
				item.marker.setVisible(showMarker)
				infowindow.close()
				return showMarker
			}); // end else
		}  // end function
	}, self);  // end filteredList

}  // end ViewModel

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.946298, lng: -3.189972},
    scrollwheel: true,
    zoom: 14

  });
	// creates one window whose properties are reset when a marker is clicked
infowindow = new google.maps.InfoWindow

ko.applyBindings(new ViewModel());  //initializes ViewModel
}

// GoogleMaps key:  AIzaSyCVPY0V9qzsmmP-J0JL8Obl72Md73sKlXo