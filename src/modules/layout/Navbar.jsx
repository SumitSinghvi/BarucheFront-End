import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { getCustomer, listCategories } from '../data';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownElement, setDropdownElement] = useState('');
    const customer_first_name = localStorage.getItem("customer_first_name");
    const toggleDropdown = (element) => {
        if(dropdownElement === '' || dropdownElement === element) {
            setIsDropdownOpen(prev => !prev);
        }          
        setDropdownElement(element)
    };
    
    useEffect(() => {
        const navSecondDiv = document.getElementById('navseconddiv');
        if (isDropdownOpen) {
          navSecondDiv.classList.remove('shadow-md');
          navSecondDiv.classList.add('shadow-sm');
        } else {
          navSecondDiv.classList.remove('shadow-sm');
          navSecondDiv.classList.add('shadow-md');
        }
        }, [isDropdownOpen]);

    return (
    <nav className='bg-white sticky top-0 z-10'>
        <div className='bg-black text-white uppercase h-4 text-[12px] flex justify-center items-center gap-12'>
            <p>Perfect fit Assurance</p>
            <p>fast delivery</p>
            <p>custom fitting</p>
        </div>
        <div id="navseconddiv" className='shadow-md relative z-10 flex items-center justify-center px-10 py-4'>
            <div className='text-xs flex gap-8 text-gray-600 font-semibold flex-1 mr-auto'>
                <button className='hover:border-b-2 hover:border-black' onClick={() => { toggleDropdown('Shop') }}>Shop</button>
                <button className='hover:border-b-2 hover:border-black' onClick={() => { toggleDropdown('Collections') }}>Collections</button>
                <button className='hover:border-b-2 hover:border-black' onClick={() => { toggleDropdown('About') }}>About</button>
            </div>
            <Link to='/' className='font-semibold flex-1'> 
            <p >BARUCHE</p>
            </Link> 
            <div className='flex gap-4 ml-auto items-center justify-center'>
                {customer_first_name == null && <Link to={'/sign-in'}>
                <button className='flex gap-2 cursor-pointer'><span className='text-xs'>Sign In</span><FaUser /></button>
                </Link>}
                {customer_first_name != null && <Link to={'/profile'}>
                <button className='flex gap-2 cursor-pointer'><span className='text-xs'>{customer_first_name}</span><FaUser /></button>
                </Link>}
                <div className='h-6 bg-gray-400 w-[1px]'></div>
                <Link to={'/cart'}><i><FaShoppingCart /></i></Link>
            </div>
        </div>
        <div>
            {isDropdownOpen && (<Dropdown whichelement={dropdownElement}/>)}
        </div>
    </nav>
  )
}
