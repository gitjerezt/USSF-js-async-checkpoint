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

//brute force 
pluckPokemonNamesFromFileAsync(filename).then(function(pokemonNames) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonNames[0])
    .then(response => response.json())
      .then(data => {
        var pokemonTypes = data.types.map(element => element.type.name);
        var obj = {};
        obj[pokemonNames[0]]  = pokemonTypes;
        console.log(obj);
      })
        .catch(err => console.log(err));
  
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonNames[1])
    .then(response => response.json())
      .then(data => {
        var pokemonTypes = data.types.map(element => element.type.name);
        var obj = {};
        obj[pokemonNames[1]]  = pokemonTypes;
        console.log(obj);
      })
        .catch(err => console.log(err));  
})
  .catch(err => console.log(err)); 