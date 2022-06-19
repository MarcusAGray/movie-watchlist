<h1>Movie Watchlist</h1>

A React app that lets a user search and save movies in a watchlist. 

<img src="https://user-images.githubusercontent.com/17533749/174473183-e5ce96bd-ef49-4c23-a0b3-1e95e0293a53.png" width="500">


<h2>Overview</h2>

A user can search for movies using the <a href=" https://www.omdbapi.com/">OMDb API</a>. They can add a movie of their choice to their watchlist, which is saved in local storage. A user can also remove movies from their watchlist.


<h2>Approach taken</h2>
For a search to occur and a movie's data to be displayed (rating, genre, etc) two api calls are needed. One to search and, having retrieved a list of movie IDs, a call for a movie's data using its ID. 
<br><br>

<img src="https://user-images.githubusercontent.com/17533749/174473225-cdbd12dc-8695-440b-b310-39888a48c07d.png" width="600">


A React component is created for each movie ID found, and each component makes an api call for the data of its corresponding movie.
The search function is configured in such a way that the program will check for movies already stored in local Storage before making the api call for that movie's data. This is an attempt to limit the number of api calls made and reduce the chance of encountering a server error.


<img src="https://user-images.githubusercontent.com/17533749/174474258-6b59d439-8046-4e5b-a939-90441eaa8fc0.png" width="800">


<h2>Scripts</h2>

To install all dependencies;

### npm install

In the project directory, you can run;

### npm start

Runs the app in the development mode.


