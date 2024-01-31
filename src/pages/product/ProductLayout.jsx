import React, { useState, useEffect } from "react";
import { getProductByHandle } from "../../modules/data";
import { addToCart } from "../../modules/cart/actions";

const ProductLayout = () => {
    const ProductHandle = location.href.split('shirts/')[1];
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ProductDetail = await getProductByHandle(ProductHandle);
                setProduct(ProductDetail.product);
                console.log(ProductDetail.product);
            } catch (error) {
              console.error('Error fetching customer data:', error);
            }
        };
  
        fetchData();
    }, [ProductHandle]);
    const [dropDown,setDropDown] = useState(false);
    const toggleDropDown = () => {
        setDropDown(prev => !prev);

    };

    const handleAddItem = async (id, quantity) => {
        try {
            const cart = await addToCart({ variantId: id, quantity: quantity });
            console.log(cart);
            console.log("Added to cart");
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }
    

    console.log(product);
    return (
        <div>
        {product &&  (
                <div className='grid grid-cols-2'>
                    <div>
                        <img src={product.images[0].url} alt="product"></img>
                    </div>
                    <div>
                        <p className='text-xs text-grey-400 mx-6 my-2'>HOME &gt;&gt; ALL OVERSHIRTS &gt;&gt;</p>
                        <p className='text-3xl font-semibold mx-6'>{product.subtitle}</p>
                        <p className='text-sm mx-6 my-1'>{product.title}</p>
                        <p className='text-sm my-4 mx-6'>₹ {product.variants[0].calculated_price / 100}</p>
                        <p className='w-[700px] mx-6 text-xs my-4 tracking-wider leading-5'>{product.description}</p>
                        <button className='bg-black text-white mx-6 px-4 py-2 uppercase text-sm'>choose size</button>
                        <button onClick={() => handleAddItem(product.variants[0].id,1)} className='bg-black text-white mx-6 px-4 py-2 uppercase text-sm'>Add to Cart</button>
                        <p className='text-xs mx-6 my-4'>&gt; Free Shipping &gt; 30 days Alteration Period &gt; Fit Guarrantee</p>
                        <button onClick={toggleDropDown} className={`border border-black mx-6 mt-4 w-[680px] text-start py-2 px-4 ${!dropDown ? '' : 'border-b-0'}`}>Product features</button>
                        {dropDown && (
                        <p className='border border-black mx-6 w-[680px] text-start px-4 py-4 text-sm border-t-0 font-semibold'>Collar <span className='underline font-medium'>Cuban</span></p>
                        )}
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <p className='text-2xl font-semibold'>{product.title}</p>
                        <hr className='border border-black my-4 w-24'></hr>
                        <p className='text-sm'>{product.material}</p>
                        <p className='my-6 mx-6 text-center text-xs'>Glen check twill weave in shades of gray. 100% wool combines softness and a natural breathability.</p>
                    </div>
                    <div>
                        <img src={product.images[1].url} alt="fabric"></img>
                    </div>
                </div>
        )}
        </div>
    )
}

export default ProductLayout
