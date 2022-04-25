import mongoose from 'mongoose';
const { Schema, model } = mongoose;



const DailySchema = new Schema({

  dailyNutritions:{
    protein:[Number],
    carbs:[Number],
    fats:[Number],
    cc:[Number]
}
});

const Daily = model('Daily', DailySchema);
export default Daily;