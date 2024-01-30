import { Link } from 'react-router-dom'
import React from 'react'

export default function Dropdown({whichelement}) {
    const goBusiness = () => {
        location.href = '/all-shirts/business-shirts'
    }
    const goCasual = () => {
        location.href = '/all-shirts/casual-shirts'
    }
    return ( whichelement === 'Shop' ?
        <div className='w-full absolute bg-white shadow-md'>
            <div className='flex px-10 py-4 gap-20 lesssizetext'>
                <div className='flex flex-col gap-1.5 hover:cursor-pointer'>
                    <p className='font-bold text-xs mb-1 hover:underline'>DRESS SHIRTS</p>
                    <Link onClick={goBusiness}> <p className='hover:underline'>Business shirts</p> </Link>
                    <Link onClick={goCasual}> <p className='hover:underline'>Casual shirts</p> </Link>
                    {/* <Link to='/all-shirts/work-shirts'> <p className='mb-4 hover:underline'>Work shirts</p> </Link>
                    <Link to='/all-shirts/overshirts'> <p className='font-bold text-xs hover:underline'>OVERSHIRTS</p> </Link>
                    <Link to='/all-shirts/polo-shirts'> <p className='font-bold text-xs hover:underline'>POLO SHIRTS</p> </Link>
                    <Link to='/all-shirts/t-shirts'> <p className='font-bold text-xs hover:underline'>T-SHIRTS</p> </Link> */}
                </div>
                {/* <div className='flex flex-col gap-1.5 hover:cursor-pointer'>
                    <p className='font-bold text-xs hover:underline'>PANTS</p>
                    <p className='hover:underline'>Chinos</p>
                    <p className='hover:underline'>Suit pants</p>
                    <p className='mb-4 hover:underline'>Shorts</p>
                    <p className='font-bold text-xs hover:underline'>SUITS</p>
                    <p className='hover:underline'>Suit jackets</p>
                    <p className='hover:underline'>Suit pants</p>
                </div>
                <div className='flex flex-col gap-1.5 hover:cursor-pointer'>
                    <p className='font-bold text-xs hover:underline'>FABRICS</p>
                    <p className='hover:underline'>Fabrics sample kit</p>
                    <p className='hover:underline'>Suit fabrics</p>
                    <p className='hover:underline'>Shirt fabrics</p>
                    <p className='hover:underline'>Chino fabrics</p>
                    <p className='hover:underline'>Polo shirt fabrics</p>
                    <p className='mb-4 hover:underline'>T-shirt fabrics</p>
                </div>
                <div className='flex flex-col gap-1.5 hover:cursor-pointer'>
                    <p className='font-bold text-xs hover:underline'>OTHERS</p>
                    <p className='hover:underline'>Belts</p>
                    <p className='hover:underline'>Ties</p>
                </div> */}
            </div>
        </div>
        : whichelement === 'Collections' ?
        <div className='w-full absolute bg-white shadow-md'>
            <div className='flex px-10 py-4 gap-20 lesssizetext'>
                <div className='flex flex-col gap-1.5 hover:cursor-pointer'>
                    <p className='font-bold text-xs mb-1 hover:underline'>Collections</p>
                    <p className='hover:underline'>Summer</p>
                    <p className='hover:underline'>Winter</p>
                    <p className='mb-4 hover:underline'>Vintage</p>
                </div>
            </div>
        </div> 
        :
        <div className='w-full absolute bg-white shadow-md'>
            <div className='flex px-10 py-4 gap-20 lesssizetext'>
                <div className='flex flex-col gap-1.5 hover:cursor-pointer'>
                    <p className='font-bold text-xs mb-1 hover:underline'>ABOUT US</p>
                    <p className='hover:underline'>How it works</p>
                    <p className='hover:underline'>What we do</p>
                    <p className='mb-4 hover:underline'>Ethically produced</p>
                </div>
                <div className='flex flex-col gap-1.5 hover:cursor-pointer'>
                    <p className='font-bold text-xs hover:underline'>CUSTOMER SERVICE</p>
                    <p className='hover:underline'>Track your order</p>
                    <p className='hover:underline'>Contact us</p>
                    <p className='hover:underline'>FAQs</p>
                    <p className='hover:underline'>Free remake guarantte</p>
                </div>
            </div>
        </div>
    )
}
