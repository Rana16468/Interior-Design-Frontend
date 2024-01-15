import React from 'react';
import './Crad.css';

const Card = (props) => {
       const { cart, children } = props;

    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = total + shipping + tax;

    return (
        <>


       <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                        <div>
                                            <p className="text-4xl font-black leading-9 text-white">Summary</p>
                                            <div className="flex items-center justify-between pt-16">
                                                <p className="text-base leading-none text-white">Quantity</p>
                                                <p className="text-base leading-none text-white">{quantity}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-white">Total Price</p>
                                                <p className="text-base leading-none text-white">${total}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-white">Total Shipping:</p>
                                                <p className="text-base leading-none text-white">${shipping}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-white">Tax</p>
                                                <p className="text-base leading-none text-white">${tax}</p>
                                            </div>
                                      
                                            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                                <p className="text-2xl leading-normal text-white">Grand Total</p>
                                                <p className="text-2xl font-bold leading-normal text-right text-white">${grandTotal.toFixed(2)}</p>
                                            </div>
                                              {children} 
                                              </div>
                                          
                                        {/* <div>
                                            <button className="text-base rounded-sm leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                                Checkout
                                            </button>
                                        </div> */}

                                       
                                    </div> 
        </>
    );
};

export default Card;