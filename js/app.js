

var map, infowindow, marker;

var initialShows = [

{
		show: "My Condo",
		venue: '',
		address:  '4 North East Circus Place',
		zipcode: "EH3 6SP",
		LatLng: {lat: 55.957603, lng: -3.203525},
		imgSrc: 'images/mycondo.png',
},

{
		show: 'American Idiot',
		venue: 'Greenside',
		address:  '1 b Royal Terrace',
		zipcode: "EH7 5AB",
		LatLng: {lat: 55.957466, lng: -3.182602},
		imgSrc: 'images/americanidiot.jpg'
},

{
		show: 'Colin Cloud',
		venue: 'Underbelly Med Quad',
		address:  'Teviot Place',
		zipcode: "EH8 9AG",
		LatLng: {lat: 55.944410, lng: -3.190305},
		imgSrc: 'images/colincloud.jpg'
},

{
		show: 'Fawlty Towers',
		venue: 'Best Restaurant',
		address:  '16 Drummond Street',
		zipcode: "EH8 9TX",
		LatLng: {lat: 55.947355, lng: -3.185113},
		imgSrc: 'images/fawltytowers.jpg'
},

{
		show: 'Kit Hesketh-Harvey',
		venue: 'G & V Royal Mile Hotel',
		address:  '1 George IV Bridge',
		zipcode: "EH1 1AD",
		LatLng: {lat: 55.948985, lng: -3.192447},
		imgSrc: 'images/kithesketh.jpg'
},

{
		show: "Jesus Christ Superstar",
		venue: 'Edinburgh Tabernacle',
		address:  '41-43 Inverleith Gardens',
		zipcode: "EH3 5PR",
		LatLng: {lat: 55.970603, lng: -3.213589},
		imgSrc: 'images/Superstar.jpg'
},

{
		show: 'Hardeep Singh Kohli',
		venue: 'Pleasance Dome',
		address:  'Potterrow',
		zipcode: "EH8 9AL",
		LatLng: {lat: 55.946225, lng: -3.187396},
		imgSrc: 'images/hardeepsingh.jpg'
},

{
		show: 'Stewart Lee',
		venue: 'The Stand Comedy Club',
		address:  '5 York Place',
		zipcode: "EH1 3EB",
		LatLng: {lat: 55.955710, lng: -3.192245},
		imgSrc: 'images/stewartlee.jpg',
},

{
		show: "Paul Merton",
		venue: 'Pleasance Courtyard',
		address:  '60 Pleasance',
		zipcode: "EH8 9TJ",
		LatLng: {lat: 55.947379, lng: -3.182045},
		imgSrc: 'images/paulmerton.jpg',
},

{
		show: 'Puddles Pity Party',
		venue: 'Assembly George Square Gardens',
		address:  'George Square',
		zipcode: "EH8 9HL",
		LatLng: {lat: 55.944257, lng: -3.189112},
		imgSrc: 'images/puddles.jpg',
},

{
		show: "Joe Stilgoe",
		venue: 'Assembly Checkpoint',
		address:  '3 Bristo Place',
		zipcode: "EH1 1EY",
		LatLng: {lat: 55.946298, lng: -3.189972},
		imgSrc: 'images/joestilgoe.jpg',
}

];

// Toggles nav drawer when markers or menu are clicked
var menu = document.querySelector('#menu');
      var venueMenu = document.querySelector('#venueMenu')
      var drawer = document.querySelector('.nav');

      menu.addEventListener('click', function(e) {
        drawer.classList.toggle('open');
        e.stopPropagation();
      });

      venueMenu.addEventListener('click', function() {
        drawer.classList.remove('open');
        });

// Venue() defines show and venue as ko observables, initiates the AJAX request, creates markers and click functions and adds them to venue items as a property.
var Venue = function(data) {

var self = this;

this.show = ko.observable(data.show);
this.venue = ko.observable(data.venue);
this.address = data.address;
this.zipcode = data.zipcode;
this.latlng = data.latlng;
this.imgSrc = data.imgSrc;
// Defines the Wikipedia query that will be submitted with the AJAX request.
this.wikiQuery = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.show() + '&prop=revisions&rvprop=content&format=json&callback=wikiCallback'

// The contentString will be appended to marker infowindows
this.contentString = "<p>"+ "<img height='120px' src =" + this.imgSrc + '>' + "<br/>" + this.show() + "<br/>" + this.venue() + "<br/>" + this.address + '<br/>' + '%wiki%' + "</p>"

// Including all marker functions in the AJAX request was necessary to make sure the AJAX request had finished before assigning content to the infowindow.  Otherwise, the content was undefined.

$.ajax({
    url: this.wikiQuery,
    dataType: 'jsonp',
    success:  function(response) {
	var articleSubject = response[0];
	var link = 'http://en.wikipedia.org/wiki/' + articleSubject;
	var wikiLink = '<a href="' + link + '">'  + self.show() + '</a>';
	self.content = self.contentString.replace('%wiki%', wikiLink)

		// creates markers
self.marker = new google.maps.Marker({
    position: data.LatLng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: data.show
  });	// end self.marker

		//adds click functions to markers
self.marker.addListener('click', (function() {
		//adds content to infowindow
	infowindow.setContent(self.content);
		//opens infowindow
	infowindow.open(map, this);
		// adds bounce animation
	if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  } 	// end else
  		// stops marker bounce
	setTimeout(function() {self.marker.setAnimation(null)}, 750);
		//shuts nav drawer
	drawer.classList.remove('open');
  } 	// end function
)); 	// end marker.addListener
} 		// end success
}).fail(function() {
	alert('Your wikipedia request has failed')
	}); // end ajax

this.pop = function(item) {
	google.maps.event.trigger(self.marker, 'click')
}

}	// end Venue()

var ViewModel = function() {

var self = this;

this.searchTerm = ko.observable("");
this.showList = ko.observableArray([]);

// adds each venue to the observable array venueList
initialShows.forEach(function(item){
	self.showList.push(new Venue(item))
});

// pushes shows that match search term into filteredList array
// filteredList will populate Shows menu
// hides non-selected markers
// closes non-selected infowindow
this.filteredList = ko.computed(function() {
		var filter = self.searchTerm().toLowerCase();
		if (!filter) {
		self.showList().forEach(function(item) {
		item.marker.setVisible(true);

		});// close forEach
			return self.showList();
		} // close if
		else {
			return ko.utils.arrayFilter(self.showList(), function(item) {
				var string = item.show().toLowerCase();
				var showMarker = (string.indexOf(filter) >= 0);
				item.marker.setVisible(showMarker);
				infowindow.close();
				return showMarker
			}); // end else
		}  // end function
	}, self);  // end filteredList

		//	var vm = ko.dataFor(document.body);
		//	vm.showList()
}  // end ViewModel

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.946298, lng: -3.189972},
    scrollwheel: true,
    zoom: 13

  });
	// creates one window whose properties are reset when a marker is clicked
infowindow = new google.maps.InfoWindow

ko.applyBindings(new ViewModel());
}


// GoogleMaps key:  AIzaSyCVPY0V9qzsmmP-J0JL8Obl72Md73sKlXo