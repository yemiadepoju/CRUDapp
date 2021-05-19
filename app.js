// install and require the packages needed 

var app = require('express') ()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

// set a variable refrence to mongoose schema 
var schema = mongoose.Schema

var url = 'mongodb://localhost:27017/paymentsDB' // this is the connection string

// connect to the database 
mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},(err) => {
    if (err) throw err;
    console.log('Voila! Database connected');
})


// create the schema 

var payLoadSchema = new schema(
    {
        message:String,
        data : {
            name: String,
            email:String,
            country: String
        }
    })

// // create the model collection from schema 
var payLoad = mongoose.model('payLoad', payLoadSchema);

// create the data

payLoad.create({
    message:'Hello ! Your request has been successfully added',
    data:{
        name:'Adeyemi Adepoju',
        email:'yemiadepoju001@gmail.com',
        country:'Nigeria'
    }
},(err,payLoad) => {
    if (err) throw err;
    console.log({newPayLoad : payLoad});
})

// let update the country which is an element passed in the data object

// payLoad.findByIdAndUpdate('60a2d624b2dbcb4b087aad67', {$set:{
//     'data.country':'Benin'
// }},(err,result) => {
//     if (err) throw err
//     result.save((err,done) =>{
//         if (err) throw err
//         console.log('databse updated successfully');
//     })
// })

// delete the data created
// payLoad.deleteOne({_id:'60a2d624b2dbcb4b087aad67'},(err,result) => {
//     if (err) throw err
//     console.log('database deleted');
// })

app.listen(8080, ()=>{console.log('Server created and runing on port 8080!');})