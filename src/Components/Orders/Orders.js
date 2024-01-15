import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../Utilites/fakeDb';
import Card from '../Card/Card';
import ReviewItem from '../ReviewItem/ReviewItem';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Orders = () => {
      const { initialCart } = useLoaderData();  // { products: products, initialCart: initialCart }
    const [cart, setCart] = useState(initialCart);

    const {setFinalProduct}=useContext(AuthContext);
      setFinalProduct(initialCart);

    

     const handleRemoveItem = (id) => {
        console.log(id);
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

     const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <>

            <div className="container mx-auto">
       
             <div className="mt-1  grid lg:grid-cols-12 sm:grid-cols-6 gap-1 ">
        
               <div className="col-span-8 md:col-span-9 sm:col-span-3  p-2">


                 <div className='m-auto grid lg:grid-cols-1 md:grid-cols-1 gap-2 sm:grid-cols-1'>
                   
              {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>No Items for Review. Please <Link to="/">Shop more</Link></h2>
                } 
            </div>

            

                </div>

                <div className="col-span-4 md:col-span-3 sm:col-span-3 p-4 rounded-sm bg-[#172554]">

                  
                  <Card clearCart={clearCart} cart={cart}>
                    <Link to='/payment' >
                        <button className="btn btn-outline btn-primary mt-3">Proceed Shipping</button>
                    </Link>
                  </Card>  
                
            </div>


                  </div>
                    </div>
                
         
        </>
    );
};

export default Orders;