var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = "https://www.iloveny.com/things-to-do/outdoor-adventures/beaches/";
var SEARCH_WORD = "beach";
var MAX_PAGES_TO_VISIT = 1000;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;
pagesToVisit.push(START_URL);
startCrawl();

function startCrawl(){
  setTimeout(function(){
    crawl()
    }, 3000);
}
function crawl() {
  if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
    console.log("Reached max limit of number of pages to visit.");
    return;
  }
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    startCrawl();
  } else {
    console.log(nextPage);
    visitPage(nextPage, startCrawl);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function visitPage(url, callback) {
  pagesVisited[url] = true;
  numPagesVisited++;
  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     var $ = cheerio.load(body);
     var isWordFound = searchForWord($, SEARCH_WORD);
     if(isWordFound) {
       console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
       collectInternalLinks($);
       callback();
     } else {
       console.log( "Collecting internal links ");
       collectInternalLinks($);
       callback();
     }
  });
}

function searchForWord($, word) {
  var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
}
