Udacity Neighborhood Map Project
Created by Jeff Bynum   5/12/2016
This application is submitted to fulfill requirements for Udacity's Neighborhood Map project.


##Overview
This web application uses GoogleMaps and Wikipedia APIs to provide program information related to the 2016 Edinurgh Festival Fringe, which will take place August 5th - 29th in Edinburgh, Scotland.  The Edinburgh Festival Fringe is the world's largest arts festival, which in 2015, spanned 25 days and featured 50,459 performances of 3,314 shows in 313 venues.


## Using the Application
1.  Download or fork the application from github repository:
https://github.com/bynumjj/Udacity-Map-Project

2.  Select index.com from browser to start the app.

3.  A googlemap of Edinburgh, Scotland will appear, as well as map markers identicating the locations of ten Festival shows that have been pre-loaded into the app.  Clicking on a map marker will open an info window containing the following information related to that show:

* A thumbnail image of the performer.

* The name of the performer.

* The name of the venue.

* The venue address.

* A link to the Wikipedia page related to the performer (accessed using Wikipedia's API)

When another marker is clicked, the first infowindow will close.  Only one window can be open at a time.

4.  Clicking on the hamburger icon in the header will toggle a sliding menu that lists the same ten festival events, each of which links to its respective marker.  When a link is clicked, its marker will bounce, the marker's infowindow will open, and the nav menu will close.

5. The header also contains a search bar.  As the user enters text, the application hides the menu items and the markers that don't match the search query.

6.  The application is responsive and will change format to accomodate various screen sizes.


##Note
The application was originally intended to download a show's image, venue and address directly from the Festival's API.  Relatively late in the process, I learned that their API is not compatible with JavaScript and could not be accessed by a user's browser.  Therefore, that information had to be hard-coded into the app.js file, and the Wikipedia link added to satisfy the second API requirement.


##Acknowledgements
This project makes use of GoogleMaps' API and Wikipedia's API.


## License
This project is released under the MIT License.


