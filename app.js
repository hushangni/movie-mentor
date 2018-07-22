const mentorApp = {};
let mentorApp.laziness;

// const lcboURL = 'http://lcboapi.com/products';
// mentorApp.lcboKey = 'MDo4NzIyYzRkYS03MDI1LTExZTgtYjRhOC00ZjdlMzc1NjY3ZmM6WWJhYUVhMnkzN0lxSUVER2ozSnYwd0RCMXZEQ3NQaGl2MEFT';

// mentorApp.getDrinks = () => {
//     $.ajax({
//         url: lcboURL,
//         method: 'GET',
//         dataType: 'jsonp',
//         data: {
//             apikey: mentorApp.lcboKey
//         }
//     }).then(function(res) {
//         console.log(res);
//     })
// }

const moviesURL = 'https://api.themoviedb.org/3/';
mentorApp.moviesKey = '0f074982f0e6a999d59865dff2184e86';

const baseMovieImageURL = 'https://image.tmdb.org/t/p/';
let configData = null;
let movieToSearch = 'captain';

mentorApp.getMovies = () => {
    let url = "".concat(moviesURL, 'configuration?api_key=', mentorApp.moviesKey); 
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
        mentorApp.searchMovies(movieToSearch);
    })
    .catch(function(err){
        alert(err);
    });
}

mentorApp.searchMovies = (keyword) => {
    let url = ''.concat(moviesURL, 'search/movie?api_key=', mentorApp.moviesKey, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        //process the returned data
        console.log("movie returned:", data.results[0]);

        const movie = {
            title: data.results[0].original_title,
            posterURL: baseMovieImageURL+'w185'+ data.results[0].poster_path,
            desc: data.results[0].overview,
            rating: data.results[0].vote_average
        };
        // const moviePosterURL = data.results[0].poster_path;
        // const movieTitle = data.results[0].original_title;

        document.getElementById('movie').innerHTML = `
        <h3>${movie.title}</h3>
        <img src="${movie.posterURL}"/>
        <p>${movie.desc}</p>
        <p> Rating: ${movie.rating}</p>
        `;
        
    })
}


mentorApp.init = () => {
    // mentorApp.getDrinks();
    mentorApp.getMovies();
}


// document ready
$(function() {

    console.log("Ready");

    mentorApp.init();

    const pressed = [];
    const secretCode = 'movie';
    window.addEventListener('keyup', (e) => {
        console.log(e.key);
        pressed.push(e.key);
        pressed.splice(-secretCode.length - 1, pressed.length - secretCode);
        console.log(pressed);
        if (pressed.join('').includes(secretCode)) {
            console.log('You activated unicorns!');
            cornify_add();
        }
    });


});