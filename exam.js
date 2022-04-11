var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');
console.log("Chargement de la base de données");
let database = JSON.parse(fs.readFileSync('pokedex.json'));


var app = express();
//Activation du serveur statique
app.use(serve_static(__dirname+"/public"));

//let Obj  = class Obj {
	//constructor(x, y) {
	//  this.nom = x;
	 // this.image = y;
	//}  } 
	//let Objet = new Obj ();
	//


	app.get('/categories', function (req, res) {
		let resultat = [];
		 
		database.pokemons.forEach(function(poke){
			console.log(poke);
			poke.types.forEach(function(element) {	
				resultat.push({"label" :element.nom , "clef" : element.nom });
			} ) ; 
		
		} ) 
		console.log(resultat.length);
		res.send(resultat);
	})
app.get('/pokemonsParCat/:categorie', function (req, res) {
	let resultat = [];
  if (req.params.categorie=='all') {
	  
	  database.pokemons.forEach(function(poke){
		resultat.push(poke);
		 }) ;
		
  }

  else{
  
  	database.pokemons.forEach(function(poke){
		  console.log(poke);
		  poke.types.forEach(function(element) {
  		if (element.nom.indexOf(req.params.categorie)!=-1){ 
			  resultat.push(poke);
			  
		  } } ) ; 
		  
	  }); 
	  console.log(resultat.length);}
  	
  	res.send({statut:'OK', pokemons:resultat});
	  
});


app.get('/pokemonsParNom/:chaine', function (req, res) {
	if (req.params.chaine=='all') res.send({statut:'OK', Pokemons:database.pokemons.nom});
	else{
		let resultat = [];
		
		database.pokemons.forEach(function(poke){
			console.log(poke);
			
			if (poke.nom.includes(req.params.chaine.toLowerCase() ) ) {
				resultat.push(poke);
			 }
		});
		console.log(resultat.length);
		res.send({statut:'OK', pokemons:resultat});
	}
  });

  // non utilisés    //////
  app.get('/pokemons', function (req, res) {
	let resultat = [];
	 
	database.pokemons.forEach(function(poke){
		
		resultat.push({"nom" : poke.nom , "image" : poke.image});
		//console.log(poke.nom);
		 }) ;
	console.log(resultat.length);
	//res.send({Pokemons:resultat});
	res.send(resultat);
	
	} )
	/////////////////////////////
	
//Récupération du serveur http de l'application
var serveur = http.Server(app);

//Ecoute sur un seul port
serveur.listen(8080, function()
{
	console.log("Serveur en écoute sur le port 8080");
});