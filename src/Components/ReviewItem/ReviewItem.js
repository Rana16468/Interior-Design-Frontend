import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({ product, handleRemoveItem }) => {
       const { _id, name, price, quantity, shipping, img } = product;
  
    return (
        <>
           

   
       
   <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-36 md:rounded-none md:rounded-l-lg" src={img} alt=""/>
    <div className=" p-4 leading-normal text-white">
       <p>{name}</p>
                    <p><small>Price: ${price}</small></p>
                    <p><small>Shipping: ${shipping}</small></p>
                    <p><small>Quantity: {quantity}</small></p>

    </div>

    <div className="flex justify-end">
          <button onClick={() => handleRemoveItem(_id)} className='btn btn-outline btn-sm  btn-success m-2'> delete</button>
     </div>

    
     
      </div>
       
    
   
        </>
    );
};

export default ReviewItem;