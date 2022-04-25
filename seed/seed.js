import mongoose from "mongoose";
import faker from 'faker'
import Record from '../models/Records.js'


let recordsCreated = [];
(async function () {
    // IIFE
    // Connect to the DB
    mongoose.connect('mongodb+srv://Martin:Martin1234@cluster0.nordd.mongodb.net/Connections?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }, err=>{
        if(err) throw err;
        
    })
    // Delete all users
    
  
    // Delete all Records
    try {
      await Record.deleteMany({});
      console.log(`All records are goooone with the wind`);
    } catch (err) {
      console.log(err);
    }
  
    // Delete all Orders
 
  
    // Create 20 fake users

  

  
    // Create 20 fake records
    const recordPromises = Array(20)
      .fill(null)
      .map(() => {
        const recordData = {
          cover: faker.image.animals(400, 400),
          title: faker.random.words(),
          artist: faker.random.word() + ' ' + faker.random.word(),
          price: faker.commerce.price(10, 20),
          year: faker.date.future('2021', '4000').getFullYear(),
        };
  
        console.log(
          `Record ${recordData.title} from ${recordData.artist} has been created but not yet released`
        );
  
        const record = new Record(recordData);
        return record.save();
      });
  
    try {
      recordsCreated = await Promise.all(recordPromises);
      console.log(`****************************************************`);
      console.log(`All 20 fake records have been stored to the DB`);
      console.log(`****************************************************`);
    } catch (error) {
      console.log(error);
    }
  
    // Create some orders
   
  
    // Close the connection to the DB
    mongoose.connection.close();
  })();