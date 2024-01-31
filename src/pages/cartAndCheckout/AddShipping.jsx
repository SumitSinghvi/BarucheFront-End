import React, { useRef } from 'react'
import { getCustomer, listShippingOptions, updateCart } from '../../modules/data'

export default function AddShipping() {
    const customer_first_name = localStorage.getItem("customer_first_name");
    const customer_last_name = localStorage.getItem("customer_last_name");
    const firstNameRef = useRef(customer_first_name);
    const lastNameRef = useRef(customer_last_name);
    const addressRef = useRef(null);
    const address2Ref = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const pincodeRef = useRef(null);
    const phoneRef = useRef(null);
    const cardId = localStorage.getItem("_medusa_cart_id");
    
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const shipping_address = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            address_1: addressRef.current.value,
            address_2: address2Ref.current.value,
            city: cityRef.current.value,
            province: stateRef.current.value,
            postal_code: pincodeRef.current.value,
            phone: phoneRef.current.value,
        }

        updateCart(cardId, { shipping_address }).then((res) => {
            console.log(res);
        })
        
    }

  return (
    <div>
        <div className='flex flex-col  justify-center items-center p-10 mx-40'>
            <p className='font-bold text-3xl'>Checkout</p>
            <hr className='border border-black w-14 mt-4'></hr>
            <form className='mr-auto mt-4' onSubmit={(e) => { handleSubmitForm(e);}}>
                {customer_first_name == null && <div className="mb-1 flex gap-1">
                    <input type="text" ref={firstNameRef} name='first_name' id='first_name' placeholder="First Name" className="mt-1 p-2 w-full border rounded-md" required/>
                    <input type="text" ref={lastNameRef} name='last_name' id='last_name' placeholder="Last Name" className="mt-1 p-2 w-full border rounded-md" required/>
                </div>}
                <div className="mb-1">
                    <input type="text" ref={addressRef} name='address_1' id='address' placeholder="Address Line 1" className="mt-1 p-2 w-full border rounded-md" required/>
                    <input type="text" ref={address2Ref} name='address_2' id='address2' placeholder="Address Line 2" className="mt-1 p-2 w-full border rounded-md" required/>
                </div>

                <div className="mb-1">
                    <input type="text" ref={cityRef} name='city' id='city' placeholder="City" className="mt-1 p-2 w-full border rounded-md" required/>
                </div>

                <div className="mb-1 flex gap-1">
                    <input type="text" ref={stateRef} name='State' id='state' placeholder="State" className="mt-1 p-2 w-full border rounded-md" required/>
                    <input type="text" ref={pincodeRef} name='postal_code' id='pincode' placeholder="Pincode" className="mt-1 p-2 w-full border rounded-md" required/>
                </div>

                <div className="mb-2">
                    <input type="tel" ref={phoneRef} name='phone' id='phone' placeholder="Phone Number" className="mt-1 p-2 w-full border rounded-md" required/>
                </div>
                <button type="submit" className="bg-black text-white py-2 px-4 rounded-md">Use this address</button>
            </form>
        </div>
    </div>
  )
}
