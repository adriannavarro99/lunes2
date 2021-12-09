const { render } = require('ejs');
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rabit-db', { useNewUrlParser: true });
const { RabbitModel } = require("./models/AnimalModel");
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get ('/', function (request,response){
    RabbitModel
    .findAllRabbits({})
    .then( results => {
        console.log(results);
        response.render('index', {rabbits:results});
    })

})

app.get('/mongooses/new', function (request, response) {
    response.render('form');
});

app.post('/animal', function (request, response) {
    const name = request.body.name;
    const color = request.body.color;

    const newRabbit = {
        name,
        color,
    }
    RabbitModel
        .createAnimal(newRabbit)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log("Something went wrong")
        })

    response.redirect("/");

})

app.get('/animal/edit/:id', function (request, response) {
    RabbitModel
        .getRabbitById({ _id: request.params.id })
        .then(result => {
            response.render('edit', { rabbit: result });
        })
});

app.post('/animal/:id', function (request, response) {
    const name = request.body.name;
    const color = request.body.color;
    newRabbit = {
     
        name,
        color,

    }
    RabbitModel
 
 
    .updateAnimal(newRabbit)
    .then(result => {
        console.log(result);
        response.render('showAnimal', { rabbit: newRabbit });
    })
    .catch(err => {
        console.log("Something went wrong")
    })

    
});

app.get('/animal/:id', function(request,response){
    RabbitModel
    .getAnimalById({_id:request.params.id})
    .then( result =>{
        response.render('showAnimal', {rabbit:result})
    })
})

app.post('/animal/destroy/:id', function(request,response){

    RabbitModel
    .getAnimalById({_id:request.params.id})
    .then( result =>{
        result.remove();
        response.redirect('/');

    })

})






app.listen(8080, function () {
    console.log("The users server is running in port 8181.");
});