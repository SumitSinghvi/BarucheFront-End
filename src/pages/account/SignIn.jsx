import { Link } from 'react-router-dom'
import React, { useRef } from "react";
import { logCustomerIn } from '../../modules/account/actions';
import { getCustomer } from '../../modules/data';

export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const errorRef = useRef(null);
    const handleAction = (action) => {
        return () => {
          const emailValue = emailRef.current.value;
          const passwordValue = passwordRef.current.value;
    
          if (!emailValue || !passwordValue) {
            errorRef.current.innerText = "Please enter both email and password.";
            return;
          }
    
          action(emailValue, passwordValue);
        };
    };

    const handleLogin = (email, password) => {
        console.log('logging in')
        logCustomerIn(email, password)
        .then(()=>{
            getCustomer().then((data) => {
                localStorage.setItem('customer_first_name', data.first_name);
                localStorage.setItem('customer_last_name', data.last_name);
                location.href = '/';
            })
        })
        .catch((err) => {
            errorRef.current.innerText = "Invalid email or password. Please try again.";
            // Handle error state or UI changes upon authentication failure
        });
    };

    return (
        <div>
            <div className='flex flex-col justify-center items-center mt-14 mb-10'>
                <p className='text-3xl mb-10'>Welcome Back!</p>
                <div className='border flex flex-col w-[400px]'>
                    <input ref={emailRef} placeholder='Email' className='border-b p-2 text-xs tracking-wider' type="text" />
                    <input ref={passwordRef} placeholder='Password' className='p-2 text-xs tracking-wider' type="text" />   
                </div>
                <button onClick={(e) => {e.preventDefault(); handleAction(handleLogin)();}} className='uppercase bg-black text-white w-[400px] text-xs mt-6 py-2'>LOG IN</button>
                <button className='text-xs py-2 text-gray-600'>Forgot Password?</button>
                <p ref={errorRef}></p>
                <Link to={'/sign-up'} className='flex flex-col'>
                    <hr className='my-6'/>
                    <button className='text-xs text-gray-400 py-2'>Don't have an account yet?</button>
                    <button className='uppercase border border-black w-[400px] text-xs mb-4 py-2'>Create a new account</button>
                </Link>
            </div>
        </div>
    )
}