import React, {useState} from 'react'
import { addToCart } from '../cart/actions';

export default function ChooseSize({productID}) {
    const handleAddItem = async (productID, quantity) => {
        try {
            const cart = await addToCart({ variantId: productID, quantity: quantity });
            console.log(cart);
            console.log("Added to cart");
            location.reload();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }
    const [quantity, setQuantity] = useState(1);  
    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10) || 0);
    };  
    return (
        <div className="fixed top-0 right-0 h-full w-[400px] bg-white z-50 flex flex-col justify-center items-center">
        <div className="text-left">
            <div className='flex'>
            <p className="text-xl font-bold mb-2">Quantity</p>
            <input 
            type="number"
            placeholder="Enter Quantity"
            className="text-xs text-center"
            value={quantity}
            onChange={handleQuantityChange}
            ></input>
            <button onClick={()=>handleAddItem(productID, quantity)} className="text-xs bg-black text-white p-2 rounded-md border">Add to Cart</button>
            </div> 
        </div>
        </div>
    );
}
