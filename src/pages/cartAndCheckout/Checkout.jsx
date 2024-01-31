import React, { useEffect, useRef, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Form from '../modules/StripeForm'

const stripePromise = loadStripe("pk_test_51OMrrtSDwO9Kh3FvPRzDhaITyWwTxtbzEXqnfyq1niHrMXd9EkC3AjsjeCr9VIDoN2En8nLaZZLRh3D5HqxqoheJ00ldFkeOI8")

export default function Checkout() {
    const customer_first_name = localStorage.getItem("customer_first_name");
    const customer_last_name = localStorage.getItem("customer_last_name");
    console.log("customer",customer_first_name)
    const cartId = localStorage.getItem("_medusa_cart_id")
    const [clientSecret, setClientSecret] = useState()
    // const createPaymentSession = useCreatePaymentSession(cartId)
    // const setPaymentSession = useSetPaymentSession(cartId)
    // const { setCart } = useCart()
    const firstNameRef = useRef(customer_first_name);
    const lastNameRef = useRef(customer_last_name);
    const addressRef = useRef(null);
    const address2Ref = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const pincodeRef = useRef(null);
    const phoneRef = useRef(null);
    
    const handleComplete = () => {
        createPaymentSession.mutate(void 0, {
          onSuccess: ({ cart }) => {
            console.log("hicartPaymentsession",cart.payment_sessions)
          }
        })
    }
    const handleSetPaymentSession = (
    providerId
    ) => {
    setPaymentSession.mutate({
        provider_id: providerId,
    }, {
        onSuccess: ({ cart }) => {
        console.log(cart.payment_session)
        setClientSecret(cart.payment_session.data.client_secret)
        }
    })
    }
    const submitForm = (e) => {

        e.preventDefault();
        fetch(`http://35.200.144.243:9000/store/customers/me/addresses`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address: {
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value,
                address_1: addressRef.current.value,
                address_2: address2Ref.current.value,
                city: cityRef.current.value,
                province: stateRef.current.value,
                postal_code: pincodeRef.current.value,
                phone: phoneRef.current.value,
                country_code:"IN",
                },
            }),
          })
          .then((response) => response.json())
          .then(({ customer }) => {
            console.log(customer?.id)
        });
        fetch(`http://35.200.144.243:9000/store/carts/${cartId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shipping_address: {
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value,
                address_1: addressRef.current.value,
                address_2: address2Ref.current.value,
                city: cityRef.current.value,
                province: stateRef.current.value,
                postal_code: pincodeRef.current.value,
                phone: phoneRef.current.value,
                },
            }),
        })
        .then((response) => response.json())
        .then(({ cart }) => setCart(cart))
    }
    return (
        <div>
            <div className='flex flex-col  justify-center items-center p-10 mx-40'>
            <p className='font-bold text-3xl'>Checkout</p>
            <hr className='border border-black w-14 mt-4'></hr>
            <form className='mr-auto mt-4' onSubmit={(e) => {submitForm(e); handleComplete();}}>
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
            <button className='bg-black text-white rounded-md py-1 px-3 absolute left-[500px] top-[570px]' onClick={()=>handleSetPaymentSession('stripe')}>Proceed to Payment</button>
            <div className='w-[1000px] mt-10'>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{
                    clientSecret,
                }}>
                <Form clientSecret={clientSecret} cartId={cartId} />
            </Elements>
            )}
            </div>
            </div>
        </div>
    )
}
