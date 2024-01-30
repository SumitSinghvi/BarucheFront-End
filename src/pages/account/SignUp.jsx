import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../modules/account/actions';

export default function SignUp() {
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const verifyPasswordRef = useRef(null);
  
    const [passwordError, setPasswordError] = useState(null);
    const handleRegister = ({firstName, lastName, email, password}) => {
      signUp(email, password, firstName, lastName)
        .then(()=>{
          location.href = '/';
        })
        .catch((err) => {
            setPasswordError("Invalid email or password. Please try again.");
        });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Check if passwords match
      if (passwordRef.current.value !== verifyPasswordRef.current.value) {
        setPasswordError('Passwords do not match');
        return;
      }
      
      // Reset password error if passwords match
      setPasswordError(null);
      
      // Continue with registration
      handleRegister({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      
      console.log('submitted');
    };
    return (
        <div>
            <div className='flex flex-col justify-center items-center my-16'>
              <p className='text-3xl'>Create a New Account</p>
              <p className='text-xl text-gray-600 mt-4 tracking-widest'>
                For faster checkout and order tracking
              </p>
              <div className='border flex flex-col my-10 w-[400px]'>
                <input
                  ref={firstNameRef}
                  placeholder='First name'
                  className='border-b p-2 text-xs tracking-wider'
                  type='text'
                />
                <input
                  ref={lastNameRef}
                  placeholder='Last name'
                  className='border-b p-2 text-xs tracking-wider'
                  type='text'
                />
                <input
                  ref={emailRef}
                  placeholder='Email'
                  className='border-b p-2 text-xs tracking-wider'
                  type='email'
                />
                <input
                  ref={passwordRef}
                  placeholder='Password'
                  className='border-b p-2 text-xs tracking-wider'
                  type='password'
                />
                <input
                  ref={verifyPasswordRef}
                  placeholder='Verify Password'
                  className='border-b p-2 text-xs tracking-wider'
                  type='password'
                />
              </div>
              {passwordError && (
                <p className='text-red-500 text-xs'>{passwordError}</p>
              )}
              <button
                onClick={handleSubmit}
                className='uppercase bg-black text-white w-[400px] text-xs my-4 py-2'
              >
                Create Account
              </button>
              <Link to={'/sign-in'} className='flex flex-col'>
                <button>Already have an account?</button>
                <button className='uppercase border border-black w-[400px] text-xs my-4 py-2'>
                  Log in
                </button>
              </Link>
            </div>
        </div>
    );
}
    