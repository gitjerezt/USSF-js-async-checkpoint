#!/usr/bin/env node

const fetch = require('node-fetch');
var Promise = require('bluebird');
const fs = require('fs');

var filePath = 'index.txt';
var pluckPokemonNamesFromFileAsync = function(filePath) {
    return new Promise(function (resolve, reject){
      try{
        fs.readFile(filePath, 'utf8', function (err, content) {
          //console.log('Example from callbackReview.js')
          if (err) {
            //console.log('fs.readFile failed :(\n', err)
            reject(err);
          } else {
            content = content.split('\n');
            //console.log('fs.readFile successfully completed :', content);
            resolve(content);
          }
        });
      }
      catch(err){
        reject(err)
      }
    });
  };
  var pokemonPromises = [];


  
// fetch('http://example.com/movies.json')
//        .then(response => response.json())
//          .then(data => console.log(data));)})
