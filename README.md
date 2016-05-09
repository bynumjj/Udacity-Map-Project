# P4 Browser Rendering Optimization project
Created by Jeff Bynum   4/30/2016
This application is submitted to fulfill requirements for Udacity's Neighborhood Map project.


##Overview
This application provides program information related to the 2016 Edinurgh Festival Fringe, which will take place August 5th - 29th in Edinburgh, Scotland.  The Edinburgh Festival Fringe is the world's largest arts festival, which in 2015, spanned 25 days and featured 50,459 performances of 3,314 shows in 313 venues.


##Functionality
The application uses the GoogleMaps API to display a map of Edinburgh, Scotland.  Markers are created indicating the location of ten preprogrammed festival event (and my rental apartment).  When a marker is clicked, the marker will bounce for two seconds and an infowindow will appear.  The infowindow displays:

* A thumbnail image of the performer

* The name of the perfromer

* The name of the venue

* The venue address

* A link to a Wikipedia article related to the performer (accessed using Wikipedia's API)

When another marker is clicked, the first infowindow will close.  Only one window can be open at a time.

The header contains a hamburger icon that toggles a nav menu located on left side of the screen.  The menu lists the same ten festival events, each of which links to its respective marker.  When a link is clicked, its marker will bounce, the marker's infowindow will open, and the nav menu will close.

The header also contains a search bar.  As a user enters text, the application hides the menu items and the markers that don't match the search query.

The application is responsive and will change format to accomodate various screen sizes.


##Note
The application was originally intended to download a show's image, venue and address directly from the festival's API.  Relatively late in the process, I learned that their API is not compatible with JavaScript and could not be accessed by a user's browser.  Therefore, that information had to be hard-coded into the app.js file, and the Wikipedia link added to satisfy the second API requirement.


##Acknowledgements
This project makes use of GoogleMaps' API and Wikipedia's API.


## License
This project is released under the MIT License.


