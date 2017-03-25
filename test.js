require('es6-promise').polyfill();
var json = require('comment-json');
var Client = require('node-rest-client').Client;
var jsonp = require('fetch-jsonp');
var client = new Client();
/*
client.get("https://api.harpercollins.com/api/v3/hcapim?apiname=catalog&format=JSON&authorname=Maguire&apikey=670ba0b6ca3f4949adfcf7cb300912b9", function (data, response) {
    // parsed response body as js object
    console.log(data);
});
*/
var result = jsonp("https://api.harpercollins.com/api/v3/hcapim?apiname=catalog&format=JSONP&authorname=Maguire&apikey=670ba0b6ca3f4949adfcf7cb300912b", {
  jsonCallback: 'jsoncallback',
  timeout: 3000
})
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      console.log('parsed json', json);
    })
    .catch(function(ex) {
      console.log('parsing failed: '+ ex);
    });
