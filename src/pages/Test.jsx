import {
    signUp,
    logCustomerIn,
    updateCustomerName,
    updateCustomerEmail,
    updateCustomerPhone,
    updateCustomerPassword,
    addCustomerShippingAddress,
    signOut,
} from "../modules/account/actions";
import {
    addToCart,
    deleteLineItem,
    getOrSetCart,
    retrieveCart,
    updateLineItem,
} from "../modules/cart/actions";

export default function Test() {
    
    return ( <div className="flex flex-col gap-4 bg-black text-white">
        <button onClick={signUp}>Sign</button>
        <button onClick={logCustomerIn}>Login</button>
        <button onClick={updateCustomerName}>Update</button>
        <button onClick={updateCustomerEmail}>UpdateEmail</button>
        <button onClick={updateCustomerPhone}>UpdatePhone</button>
        <button onClick={updateCustomerPassword}>UpdatePass</button>
        <button onClick={addCustomerShippingAddress}>AddShipping</button>
        <button onClick={signOut}>logOut</button>
        <button onClick={getOrSetCart}>createCart</button>
        <button onClick={retrieveCart}>GetCart</button>
        <button onClick={()=>addToCart({variantId:"variant_01HMY6R9MQC7QG00BS5V0EVP3Y",quantity:1})}>addItem</button>
        <button onClick={()=>updateLineItem({lineId:'item_01HN606MCGX21BEC83KZ6S7056',quantity:2})}>UpdateItem</button>
        <button onClick={()=>deleteLineItem('item_01HN606MCGX21BEC83KZ6S7056')}>removeItem</button>
    </div>) 
}