const marvelApp = {};
marvelApp.publicKey = '6dfb16dbb9427c1c0dde0f4dcf5f9884';
marvelApp.privateKey = 'c110b1366287649fb082c50e068a6b6cc2d56c5f';
const ts = new Date().getTime();
const stringToHash = ts + marvelApp.privateKey + marvelApp.publicKey;
const hash = md5(stringToHash);

marvelApp.getHeroes = () => {
    $.ajax({
        url: 'https://gateway.marvel.com:443/v1/public/creators?apikey=6dfb16dbb9427c1c0dde0f4dcf5f9884'
    }).then(function(res) {
        console.log(res);
    })
}

marvelApp.init = () => {
    marvelApp.getHeroes();
}


// document ready
$(function() {
    console.log("Ready");

    marvelApp.init();

});