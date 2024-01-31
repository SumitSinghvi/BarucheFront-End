import React, { useEffect, useState } from 'react'
import { PiHandbagThin } from "react-icons/pi";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { retrieveCart, updateLineItem } from '../../modules/cart/actions';

export default function Cart() {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    const fetchCart = async () => {
      const cartDetails = await retrieveCart().then((cart) => cart);
      console.log(cartDetails);
      setCart(cartDetails);
    }
    fetchCart();
  },[])

  const handleUpdateItem = (id, quantity) => {
    updateLineItem({ lineId: id, quantity: quantity }).then(() => location.reload());
  }
  return (
    <div>
        <div className='flex flex-col  justify-center items-center p-10 mx-32'>
          <p className='font-bold text-3xl'>Shopping Cart</p>
          <hr className='border border-black w-24 mt-4'></hr>
          <div className='flex gap-4 p-4 font-thin'>
            <li>Free remake guarantee</li>
            <li>Quick deliveries</li>
            <li>Superior quality</li>
          </div>
          {!cart &&
          (<div className='text-9xl justify-center items-center flex flex-col my-10 border-y py-4'>
            <PiHandbagThin className='text-gray-400'/>
            <p className='text-xl font-thin'>Your shopping cart is currently empty</p>
          </div>)
          }
          {cart && cart.items.length == 0 && 
          (<div className='text-9xl justify-center items-center flex flex-col my-10 border-y py-4'>
            <PiHandbagThin className='text-gray-400'/>
            <p className='text-xl font-thin'>Your shopping cart is currently empty</p>
          </div>)
          }
          <div>
          {cart && Object.keys(cart).length !== 0 &&
          (<div className='border-t-2'>
            {cart.items.map((item) => (
              <div key={item.id} className='flex justify-between py-4 border-b-2'>
                <img src={item.thumbnail} alt="productThumbnail" className='w-1/6 rounded-md' />
                <div className='m-4 px-2 mr-auto'>
                  <p className='text-xl font-bold'>{item.title}</p>
                  <p className='text-xs py-2'>{item.variant.product.subtitle}</p>
                  <div className='flex mt-2'>
                    <CiSquareMinus className='text-3xl cursor-pointer' onClick={() => handleUpdateItem(item.id, item.quantity-1)}/>
                    <p>{item.quantity}</p>
                    <CiSquarePlus className='text-3xl cursor-pointer' onClick={() => handleUpdateItem(item.id, item.quantity+1)}/>
                  </div>
                </div>
                <p>₹{item.total/100}</p>
              </div>
            ))}
          </div>)    
          }
          </div>
          {cart && Object.keys(cart).length !== 0 &&
          (<div className='flex justify-between py-4 text-gray-500 text-lg w-[1100px]'>
            <div>
              <p>Apply Discount Code</p>
              <div>
              <input type="text" name="discountCoupon" id="discountCoupon" className='border mt-2'/>
              <button className=' bg-black text-white px-3'><span className='text-xs'>Apply</span></button>
              </div>
            </div>
            <div className='w-[400px] flex flex-col'>
              <div className='justify-between flex'><p>Subtotal</p><p>₹{cart.total/100}</p></div>
              <div className='justify-between flex'><p>Delivery</p><p>₹0</p></div>
              <div className='justify-between flex'><p>Discounts</p><p>₹0</p></div>
              <div className='justify-between flex'><p>Amount to pay</p><p>₹{cart.total/100}</p></div>
              <Link to={'/checkout'} className='ml-auto'>
              <button className='py-2 px-4 mt-4 border bg-black text-white'>Go to Checkout</button>
              </Link>
            </div>
          </div>)
          }
        </div>
    </div>
  )
}
