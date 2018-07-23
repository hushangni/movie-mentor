const mentorApp = {};
const moviesURL = 'https://api.themoviedb.org/3/';
const baseMovieImageURL = 'https://image.tmdb.org/t/p/';
mentorApp.moviesKey = '0f074982f0e6a999d59865dff2184e86';
mentorApp.genres = {
    hero: ['romance', 'fantasy', 'action'],
    twist: ['horror', 'mystery', 'drama']
}

mentorApp.keywords = {
    romance: {
        important: {
            modern: ['shape of water'],
            timeless: []
        },

        unimportant: {
            modern: ['twilight'],
            timeless: []
        }
    },
    fantasy: {
        important: {
            modern: ['ready player', 'pan\'s labyrinth','doctor strange','curse black pearl','avatar','fantastic beasts', 'spiderwick', 'thor ragnarok', 'blade runner 2049'],
            timeless: ['imaginarium of doctor', 'thief of bagdad', 'spirited away', 'edward scissor', 'solomon kane', 'spirit of beehive', 'orpheus', 'ugetsu']
        },

        unimportant: {
            modern: ['narnia', 'night at museum', 'suicide squad', 'man of steel', 'percy jackson', 'ted', 'sausage party', 'click'],
            timeless: ['son of the mask', '10,000 BC', 'the mummy', 'green mile', 'donnie darko', 'aliens']
        }
    }
};
mentorApp.actionKeywords = {
    important: [

    ],
    unimportant: [

    ]
};
mentorApp.horrorKeywords = {
    important: [

    ],
    unimportant: [
    
    ]
};
mentorApp.mysteryKeywords = {
    important: [

    ],
    unimportant: [
    
    ]
};
mentorApp.dramaKeywords = {
    important: [

    ],
    unimportant: [
    
    ]
};

mentorApp.scrollPoints = ['#laziness', '#genre', '#time', '#ratings', '#result'];
mentorApp.scrollPath = 'file:///Users/shangnihu/Desktop/summer-2018-js/advanced/project3/index.html?';

mentorApp.searchMovies = (keyword) => {
    let url = ''.concat(moviesURL, 'search/movie?api_key=', mentorApp.moviesKey, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        //process the returned data

        const movie = {
            title: data.results[0].original_title,
            posterURL: baseMovieImageURL+'w185'+ data.results[0].poster_path,
            desc: data.results[0].overview,
            rating: data.results[0].vote_average
        };

        document.getElementById('movie').innerHTML = `
        <h3>${movie.title}</h3>
        <img src="${movie.posterURL}"/>
        <p>${movie.desc}</p>
        <p> Rating: ${movie.rating}</p>
        `;
        
    })
}

// initialize
mentorApp.init = () => {
    // mentorApp.getMovies();
    // grab user inputs on final submit
    $('.results-button').on('submit', (e) =>{
        e.preventDefault();

        mentorApp.userEnergy = $('input[name=energy]:checked').val();
        $('input[name=movie-genre]:checked').val() == 'hero' ? mentorApp.userGenre = mentorApp.genres.hero[mentorApp.userEnergy] : mentorApp.userGenre = mentorApp.genres.twist[mentorApp.userEnergy];
        mentorApp.userReleaseDate = $('input[name=time-period]:checked').val();
        mentorApp.userRating = $('input[name=rating]:checked').val();

        const possibleKeywords = mentorApp.keywords[mentorApp.userGenre][mentorApp.userRating][mentorApp.userReleaseDate];
        const randomIndex = Math.floor((Math.random() * possibleKeywords.length));
        mentorApp.searchMovies(possibleKeywords[randomIndex]);

        console.log('user energy: ', mentorApp.userEnergy);
        console.log('user genre: ', mentorApp.userGenre);
        console.log('user release date: ', mentorApp.userReleaseDate);
        console.log('user rating: ', mentorApp.userRating);

    });
}

//smooth scrolls to the given target
mentorApp.smoothScroll = function(e) {
    for (let i = 0; i < mentorApp.scrollPoints.length; i++) {
        if (e.currentTarget.action == `${mentorApp.scrollPath}${mentorApp.scrollPoints[i]}`) {
            document.querySelector(mentorApp.scrollPoints[i]).scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
}

// smooth scroll effect
$('form').on('submit', (e) => {
    e.preventDefault();
    mentorApp.smoothScroll(e);
});



// document ready
$(function() {
    console.log("Ready");
    mentorApp.init();

    // listen for restart button click
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        location.reload();
        $('html').scrollTop(0);
    })


    // konami code unicorn fun
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