const insideApp = {};

const lcboURL = 'http://lcboapi.com/products';
const moviesURL = 'https://api.themoviedb.org/3/movie/550';

insideApp.lcboKey = 'MDo4NzIyYzRkYS03MDI1LTExZTgtYjRhOC00ZjdlMzc1NjY3ZmM6WWJhYUVhMnkzN0lxSUVER2ozSnYwd0RCMXZEQ3NQaGl2MEFT';
insideApp.moviesKey = '0f074982f0e6a999d59865dff2184e86';

insideApp.getDrinks = () => {
    $.ajax({
        url: lcboURL,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            apikey: insideApp.lcboKey
        }
    }).then(function(res) {
        console.log(res);
    })
}

insideApp.getMovies = () => {
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${insideApp.moviesKey}`,
        method: 'GET',
        dataType: 'jsonp',
    }).then(function(res) {
        console.log(res);
    })
}

insideApp.init = () => {
    insideApp.getDrinks();
    insideApp.getMovies();
}


// document ready
$(function() {
    console.log("Ready");

    insideApp.init();

    // Konami code
    // const pressed = [];
    // const secretCode = 'stayin';
    // window.addEventListener('keyup', (e) => {
    //     pressed.push(e.key);
    //     pressed.splice(-secretCode.length - 1, pressed.length - secretCode);
    //     console.log(pressed);
    //     if (pressed.join('').includes(secretCode)) {
    //         console.log('DING DING!');
    //         cornify_add();
    //     }
    // });


});