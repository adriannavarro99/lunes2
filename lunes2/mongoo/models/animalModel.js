const mongoose= require('mongoose');


const rabbitSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    color:{
        type:String,
        required:true,

    }
});

const Rabbit = mongoose.model('rabbit', rabbitSchema);

const RabbitModel={
    createAnimal: function(newRabbit){
        return Rabbit.create(newRabbit)
    },
    getAnimalById : function( _id ){
        return Rabbit.findOne({ _id });
    },

    
    updateAnimal: function (newRabbit){
        return Rabbit.updateOne(newRabbit)
    },

    findAllAnimal: function (){
        return Rabbit.find();
    },

    


}

module.exports={RabbitModel};