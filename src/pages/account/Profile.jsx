import React, { useEffect, useState } from 'react'
import { getCustomer, listCustomerOrders } from '../../modules/data'
import { CiDeliveryTruck } from "react-icons/ci";
import { signOut } from '../../modules/account/actions';

export default function Profile() {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
          try {
              const data = await getCustomer();
              const orders = await listCustomerOrders();
              setOrders(orders);
              setCustomer(data); 
              console.log(data);
              console.log(orders);
          } catch (error) {
              console.error('Error fetching customer data:', error);
          }
      };
  
      fetchData(); // Call the function when the component mounts
    }, []);

    const HandleLogOut = () => {
        localStorage.clear();
        signOut().then(()=>{
          location.href = '/';
        });

    }
  return (
    <div>
      {true && <div className='flex flex-col  justify-center items-center p-10 mx-32'>
            <p className='font-bold text-3xl'>Hi, {customer?.first_name}</p>
            <hr className='border border-black w-24 mt-4'></hr>
            <div className="py-10">
              <div className="border-t w-[1200px] py-2">
                <p className="pt-10 font-semibold mx-4 text-xl">All Orders</p>
                {orders?.length == 0 && (
                  <div className="text-gray-500 m-4">No orders yet</div>
                )}
                {orders?.length > 0 && (
                  <div className="w-[800px] mx-2 my-4">{(<div>{
                    orders.map((element) => (
                      <div key={element.id} className="bg-gray-100 rounded-md px-1.5 py-4 mb-4">
                        {element.items.map((item) => (
                          <div key={item.id} className='flex flex-col justify-between p-1 border bg-white mb-2'>
                            <div className="flex items-center mx-4"><CiDeliveryTruck className="text-2xl"/> <p className="ml-1.5 capitalize text-xs"> {element.status} <span className="block">delivery in few days</span></p></div>
                            <div className="flex bg-gray-100 mx-4 mt-4 mb-1">
                            <img src={item.thumbnail} alt="productThumbnail" className='w-[100px] h-[100px] rounded-md' />
                            <div className='m-2'>
                              <p className='text-xs font-bold'>{item.title}</p>
                              <p className='text-xs'>{item.variant.title}</p>
                              <p className="text-xs">quantity: {item.quantity}</p>
                              <p className="text-xs">₹{item.total/100}</p>
                            </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                    }</div>)}</div>
                )}
              </div>
              <div className="border-y w-[1200px] py-2 text-center">
                <p className="py-10 font-semibold underline">Your Details</p>
                <div className="flex justify-center">
                  <div className="flex-1 flex-col items-center flex">
                    <p className="text-left font-bold">Shipping address</p>
                    <div>
                      {customer?.shipping_addresses.length > 0 ? (
                        <div>
                          {customer.shipping_addresses.map((element, index) => (
                            <div key={index} className="border text-left text-gray-500 rounded-md p-2 m-2">
                              <p>{element.address_1}</p>
                              <p>{element.address_2}</p>
                              <p>{element.city}, {element.postal_code}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        "No address added yet"
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex-col items-center flex">
                    <p className="text-left font-bold">Phone number</p>
                    <p>{customer?.phone || "No phone"}</p>
                  </div>
                  <div className="flex-1 flex-col items-center flex">
                    <p className="text-left font-bold">E-mail address</p>
                    <p className="text-gray-500 py-2">{customer?.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <button className="border bg-gray-300 py-1 px-2 rounded-md mt-4" onClick={HandleLogOut}>Log Out</button>
              </div>
            </div>
        </div>}
    </div>
  )
}
