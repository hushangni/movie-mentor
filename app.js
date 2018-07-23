const mentorApp = {};
const moviesURL = 'https://api.themoviedb.org/3/';
const baseMovieImageURL = 'https://image.tmdb.org/t/p/';
mentorApp.moviesKey = '0f074982f0e6a999d59865dff2184e86';
mentorApp.genres = {
    hero: ['romance', 'fantasy', 'action'],
    twist: ['horror', 'comedy', 'drama']
}
mentorApp.scrollPoints = ['#laziness', '#genre', '#time', '#ratings', '#result'];
mentorApp.scrollPath = 'file:///Users/shangnihu/Desktop/summer-2018-js/advanced/project3/index.html';
mentorApp.keywords = {
    romance: {
        important: {
            modern: ['shape of water', 'crazy, stupid, love', 'mamma mia', 'moonlight', 'the handmaiden', 'her', 'lion','moonrise kingdom', 'up'],
            timeless: ['forrest gump', 'la la land', 'brokeback mountain', 'pretty woman', '500 days', 'singing in the rain', 'letter from an unknown woman', 'amelie']
        },

        unimportant: {
            modern: ['twilight', 'benjamin button', 'fifty shades', 'the proposal', 'the theory of everything', 'passengers'],
            timeless: ['moulin rouge', 'sleepless in seattle', 'scott pilgrim vs', 'titanic', 'say anything']
        }
    },
    fantasy: {
        important: {
            modern: ['ready player', 'pan\'s labyrinth','doctor strange','curse black pearl','avatar','fantastic beasts', 'spiderwick', 'thor ragnarok', 'blade runner 2049', 'the martian'],
            timeless: ['imaginarium of doctor', 'thief of bagdad', 'spirited away', 'edward scissor', 'solomon kane', 'spirit of beehive', 'orpheus', 'ugetsu']
        },

        unimportant: {
            modern: ['narnia', 'night at museum', 'suicide squad', 'man of steel', 'percy jackson', 'ted', 'sausage party', 'click'],
            timeless: ['son of the mask', '10,000 BC', 'the mummy', 'green mile', 'donnie darko', 'aliens']
        }
    },
    action: {
        important: {
            modern: ['mad max', 'zootopia', 'baby driver', 'spider-man: homecoming', 'moana', 'kubo', 'impossible rogue mission', 'guardians of the', 'black panther', 'looper', 'dark knight'],
            timeless: ['king kong', 'adventures of robin hood', 'african queen', 'babe', 'raiders of the lost',  ]
        },

        unimportant: {
            modern: ['jurassic world', 'the first purge', 'kingsman', 'die hard', 'v for vendetta', 'sicario'],
            timeless: ['kill bill', 'fugitive', 'hunger games', 'assassins', 'equilibrium', 'first blood']
        }
    },
    horror: {
        important: {
            modern: ['get out', 'a quiet place', 'the cured', 'hereditary', 'are we not cats', 'the endless', 'the wailing'],
            timeless: ['28 days', 'the descent', 'insidious', 'the mist', 'battle royale', 'a tale of two sisters', 'the eye', 'mulholland drive', 'se7en', 'the usual suspects', 'the godfather', 'leon']
        },

        unimportant: {
            modern: ['winchester', 'cloverfield paradox', 'the first purge', 'train to busan', 'split', 'confessions', 'murder orient express'],
            timeless: ['rec', 'the witch', 'I saw the devil', 'shutter', 'ju-on', 'cabin in the woods', 'a perfect world', 'silence of the lambs']
        }
    },
    comedy: {
        important: {
            modern: ['get out', 'disaster artist', 'neighbors', 'silver linings', 'the millers', 'this is the end', 'pineapple express', 'grand budapest hotel', 'big sick', 'coco', 'deadpool', 'blockers', 'big hero'],
            timeless: ['year old virgin', 'monty python', 'borat', 'shaun of the dead', 'groundhog day', 'men in black', 'hot fuzz', 'school of rock', 'rush hour', 'dazed and confused', 'modern times']
        },

        unimportant: {
            modern: ['juno', 'trainwreck', 'the heat', 'horrible bosses', 'hangover', 'the interview', 'jumanji', 'ted'],
            timeless: ['the room', 'superbad', 'ghost busters', 'american pie', 'strangelove', 'harold and kumar white', 'white chicks', 'shanghai noon', 'austen powers', 'zoolander']
        }
    },
    drama: {
        important: {
            modern: ['moonlight', 'room', 'gone girl', 'black swan', 'no country for old', 'the pianist', 'grand budapest', 'isle of dogs', 'lady bird', 'selma', 'boyhood', 'dallas buyers'],
            timeless: ['slumdog millionaire', 'pulp fiction', 'memento', 'shawshank', 'ocean\'s eleven', 'the prestige', 'schindler\'s list', 'fight club', 'million dollar baby', 'old boy']
        },

        unimportant: {
            modern: ['now you see me', '12 years a slave', 'hacksaw ridge', '127 hours', 'red sparrow', 'i, tonya', 'mother!', 'killing of a sacred deer'],
            timeless: ['amadeus', 'city lights', 'rules of the game', 'the big sleep', 'grapes of wrath', '12 angry', 'metropolis']
        }
    }
};

// find the movie based on the keyword search
mentorApp.searchMovies = (keyword) => {
    let url = ''.concat(moviesURL, 'search/movie?api_key=', mentorApp.moviesKey, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        // process the returned data
        // create a movie object
        const movie = {
            title: data.results[0].original_title,
            posterURL: baseMovieImageURL+'w185'+ data.results[0].poster_path,
            desc: data.results[0].overview,
            rating: data.results[0].vote_average
        };

        document.getElementById('movie').innerHTML = `
        <h3 class="movie-title">${movie.title}</h3>
        <img src="${movie.posterURL}"/>
        <p class="movie-desc">${movie.desc}</p>
        <p> Rating: ${movie.rating}</p>
        `;
        
    })
}

// initialize
mentorApp.init = () => {
    // listen for submit buttons and grab user input to search with
    $('.results-button').on('submit', (e) =>{
        e.preventDefault();

        // grab appropriate data from user selection
        mentorApp.userEnergy = $('input[name=energy]:checked').val();
        $('input[name=movie-genre]:checked').val() == 'hero' ? mentorApp.userGenre = mentorApp.genres.hero[mentorApp.userEnergy] : mentorApp.userGenre = mentorApp.genres.twist[mentorApp.userEnergy];
        mentorApp.userReleaseDate = $('input[name=time-period]:checked').val();
        mentorApp.userRating = $('input[name=rating]:checked').val();

        // select appropraite keyword category for movie search
        const possibleKeywords = mentorApp.keywords[mentorApp.userGenre][mentorApp.userRating][mentorApp.userReleaseDate];
        // generate randomindex for movie keyword selection
        const randomIndex = Math.floor((Math.random() * possibleKeywords.length));
        mentorApp.searchMovies(possibleKeywords[randomIndex]);
    });
}

//smooth scrolls to the given target
mentorApp.smoothScroll = function(e) {
    for (let i = 0; i < mentorApp.scrollPoints.length; i++) {
        console.log(e.currentTarget.action);
        if (e.currentTarget.action == `${mentorApp.scrollPath}${mentorApp.scrollPoints[i]}`) {
            document.querySelector(mentorApp.scrollPoints[i]).scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
}

// listen for form submits to perform smooth scroll effect
$('form').on('submit', (e) => {
    console.log(e);
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