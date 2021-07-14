#!/usr/bin/env node

const fetch = require('node-fetch');
var Promise = require('bluebird');
const fs = require('fs');

var filename = process.argv[2];

if (filename === undefined) {
  console.log('Error: File must be passed as an arg e.g. $printPokemonType index.txt');
  return;    
}
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
            resolve(content);
          }
        });
      }
      catch(err){
        reject(err)
      }
  });
};
var pokemonWithTypesList;
pluckPokemonNamesFromFileAsync(filename).then(function(pokemonNames) {
  var pokemonPromises = [];
  pokemonNames.forEach(function(name, index) {
    pokemonPromises[index]= fetch('https://pokeapi.co/api/v2/pokemon/' + name)
    .then(response => response.json())
      .then(function(data) {
        var pokemonTypes = data.types.map(element => element.type.name);
        var pokemonObj = {};
        pokemonObj['name']  = name;
        pokemonObj['type']  = pokemonTypes;
        return pokemonObj;
      })
        .catch(err => console.log(err));      
  });
  Promise.all(pokemonPromises)
    .then(function(pokemonObjects) {
      pokemonWithTypesList = pokemonObjects
      pokemonWithTypesList.forEach(function(element) {
        var str = element['name'] + ': ' + element['type'].join(', ');
        console.log(str);
      });
    });
})
.catch(err => console.log(err)); 
