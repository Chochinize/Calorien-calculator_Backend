import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import moment from 'moment';


const ProductModel = new Schema({
  name:String,
  nutritions:{
    Oats:{protein:Number,carbs:Number,fats:Number,cc:Number,_id:false},
    Meal:{protein:Number,carbs:Number,fats:Number,cc:Number,_id:false},
    Rise:{protein:Number,carbs:Number,fats:Number,cc:Number,_id:false},
    Crannberyes:{protein:Number,carbs:Number,fats:Number,cc:Number,_id:false},
    Iceberg:{protein:Number,carbs:Number,fats:Number,cc:Number,_id:false},
}
});



  
  let Prod = mongoose.models.nutritions || mongoose.model('nutrition',ProductModel);
  export default Prod

  // <div className="grid grid-cols-2  relative border-2 border-black gap-4  place-items-center h-screen ">
  
//   <div className="justify-self-center  ">
//   <div className="flex justify-between">
//     <select className="form-select appearance-none
//       block
//       w-full
//       px-3
//       py-1.5
//       text-base
//       font-normal
//       text-gray-700
//       bg-white bg-clip-padding bg-no-repeat
//       border border-solid border-gray-300
//       rounded
//       transition
//       ease-in-out
//       m-0
//       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" >

//         <option value="Rise">Rise</option>
//         <option value="Oats">Oats</option>
//         <option value="Chicken">Chicken</option>
//     </select>
//     <input type='number' className=' focus:outline-2' onChange={onChangeHandler} />
//     <div className='flex flex-col '> 

 
    {/* <div className='p-4 flex justify-between w-48'>
      <div>protein</div>
      <div>protein</div>
      
    </div>
    <div className='p-4 flex justify-between 48'>
      <span>carbs</span>
      <span>carbs</span>
      </div>
    <div className='p-4 flex justify-between 48'>
      <span>{cal.map((calories)=>{
          
          

        
        })}</span>
      <span>carbs</span>
      </div>
     */}
   
    
//     </div>
//   </div>

// </div>
  

//   <div className='border-2 border-black   '>09</div>
// </div>