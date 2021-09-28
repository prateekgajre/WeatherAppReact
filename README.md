# WeatherAppReact
Weather Application using React Typescript

There are two files in this project
1. Weather Api
2. Weather Front End

1. Weather Api
How to Run Weather Api?
There was cors exception when using API urls directly in the front end so I created the backend to handle cors exception. To start the server, follow the below 2 steps
Step 1: npm install
Step 2: npm start

The server would start at port 4001 that is http://localhost:8080/

2. Weather Front End
To start the font end
Step 1: npm install
Step 2: npm start

The app should start on port 3000 that is http://localhost:3000

Few Functions by the Weather App.
1. A search bar which asynchronously searched the city when the user starts to type the city name.
2. When the user selects a city, a grid would appear which would show current weather and few other stats
3. Along with this, a bar chart appears below the weather grid, the chart shows weather temperature for the next few days
4. User can click on any bar from the chart, then the weather grid updates to show the weather report for the selected bar.
5. A loading indicator is setup such that when the user clicks on the city name from search bar, till the Api fetches relevant data, the loading indicator is enabled. 
(Since the data fetching time of the Api is very low, it is hard to observe the loading indicator funtionality)
6. In css stylesheet, use of media element, such that the design is flexible with multiple screen sizes.


