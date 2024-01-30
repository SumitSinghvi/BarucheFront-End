import { Link } from "react-router-dom";
import React, { useState } from "react";
import ChooseSize from "./ChooseSize";

export default function ProductGrid({ products }) {
  const [chooseSizeDrop, setchooseSizeDrop] = useState(false);
  const [productId, setProductId] = useState('');
  const toggleChooseSize = (ID) => {
    setchooseSizeDrop(prev => !prev)
    setProductId(ID);
  }
  console.log(products);
  return (
    <div className="grid grid-cols-3 gap-4 px-12 mb-20">
      {products?.map((product) => (
          <div key={product.title} className='pb-12'>
            <Link to={'/shirts/' + product.handle}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover mb-4"
              />
            </Link>
              <div className='flex justify-between'>
              <Link to={'/shirts/' + product.handle}>
                <div className='flex flex-col'>
                  <h2 className="text-xs font-bold mb-2">{product.title}</h2>
                  <p className="text-[12px]">{product.subtitle}</p>
                </div>
              </Link>
                <button onClick={()=> {toggleChooseSize(product.variants[0].id);}} className="text-xs h-8 px-4 border border-black ">₹ {(product.variants[0].calculated_price)/100}</button>
                {chooseSizeDrop && <ChooseSize productID={productId} />}
                {chooseSizeDrop && <button onClick={toggleChooseSize} className="fixed top-0 right-0 m-4 p-1 border rounded-md z-50">X</button>}
              </div>
          </div>
      ))}
    </div>
  );
}