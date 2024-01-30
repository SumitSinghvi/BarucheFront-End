import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="bg-black">
        <div className="px-24 py-14 flex gap-12">
            <div className="flex flex-col text-white">
                <p className="text-xl  pb-4">SHOP</p>
                <p className="text-xs py-1">Suits</p>
                <p className="text-xs py-1">Shirts</p>
                <p className="text-xs py-1">Jackets</p>
                <p className="text-xs py-1">Pants</p>
                <p className="text-xs py-1">Linen</p>
            </div>
            <div className="flex flex-col text-white">
                <p className="text-xl  pb-4">ABOUT</p>
                <p className="text-xs py-1">How to Shop</p>
                <p className="text-xs py-1">Online</p>
                <p className="text-xs py-1">How it Works</p>
                <p className="text-xs py-1">About Us</p>
                <p className="text-xs py-1">Our Fabrics</p>
            </div>
            <div className="flex flex-col text-white">
                <p className="text-xl  pb-4">SUPPORT</p>
                <p className="text-xs py-1">Help/FAQs</p>
                <p className="text-xs py-1">Shipping</p>
                <p className="text-xs py-1">Track Your Order</p>
                <p className="text-xs py-1">Re-Order an Item</p>
                <p className="text-xs py-1">Alternation</p>
            </div>
            <div className="flex flex-col text-white ml-auto">
                <p className="text-xl  pb-4">CUSTOMER SUPPORT</p>
                <p className="text-xs py-1">Get in touch. Email us at</p>
                <p className="text-xs py-1 text-red-400">contact@baruche.com</p>
                <p className="text-xs py-1">or phone our team <span className='text-red-400'>91+ 9681-053-925</span></p>
                <div className="flex gap-4 pt-2">
                    <a href="https://www.instagram.com/sumit_jain.png/">. <i className="fab fa-facebook-square"></i></a>
                    <a href="https://www.instagram.com/sumit_jain.png/">. <i className="fab fa-instagram-square"></i></a>
                    <a href="https://www.instagram.com/sumit_jain.png/">. <i className="fab fa-twitter-square"></i></a>

                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}
