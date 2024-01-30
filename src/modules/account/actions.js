import {
    addShippingAddress,
    authenticate,
    createCustomer,
    deleteShippingAddress,
    getToken,
    logOutCustomer,
    updateCustomer,
    updateShippingAddress,
} from "../data";

export async function signUp(email,password,first_name,last_name) {
    const customer = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    }
  
    try {
      await createCustomer(customer).then(() => {
        localStorage.setItem('customer_first_name',customer.first_name)
      })
      await getToken({ email: customer.email, password: customer.password }).then(
        (token) => {
          console.log(token)
        }
      )
    } catch (error) {
      console.log(error)
    }
}

export async function logCustomerIn(email,password) {
  try {
    await getToken({ email:email, password:password }).then((token) => {
      localStorage.setItem('_medusa_token',token)
      console.log(token)
    })
  } catch (error) {
    console.log(error)
  }
}

export async function updateCustomerName() {
  const customer = {
    first_name: 'sumittt',
  }

  try {
    await updateCustomer(customer).then(() => {
      console.log("updatedName")
    })
  } catch (error) {
    console.log(error)
  }
}
export async function updateCustomerEmail() {
  const customer = {
    email: 'user101@gmail.com',
  }

  try {
    await updateCustomer(customer).then(() => {
      console.log("updatedEmail")
    })
  } catch (error) {
    console.log(error)
  }
}

export async function updateCustomerPhone() {
  const customer = {
    phone: '1252365286',
  }

  try {
    await updateCustomer(customer).then(() => {
      console.log("updated")
    })
  } catch (error) {
    console.log(error)
  }
}

export async function updateCustomerPassword() {
  const email = 'user42@gmail.com'
  const new_password = 'new'
  const old_password = 'supersecret'
  const confirm_password = 'new'

  const isValid = await authenticate({ email:email, password: old_password })
    .then(() => true)
    .catch(() => false)

  if (!isValid) {
    return {
      success: false,
      error: "Old password is incorrect",
    }
  }

  if (new_password !== confirm_password) {
    return {
      success: false,
      error: "Passwords do not match",
    }
  }

  try {
    await updateCustomer({ password: new_password }).then(() => {
      console.log("updated pass");
    })

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
    }
  }
}

export async function addCustomerShippingAddress() {
  const customer = {
    address: {
      first_name: 'sumit',
      last_name: 'some',
      company: 'null',
      address_1: 'dhaka',
      address_2: 'null',
      city: 'dhaka',
      postal_code: '564165',
      province: 'adwad',
      country_code: 'in',
      phone: '515163125',
    },
  }

  try {
    await addShippingAddress(customer).then((what) => {
      console.log(what)
    })
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.toString() }
  }
}

export async function updateCustomerShippingAddress(addressId) {

  const address = {
    first_name: 'mhikaasa',
    last_name: 'mhikaasa',
    address_1: 'mikasa',
    address_2: 'mikasa',
    company: 'mikasa',
    city: 'mikasa',
    postal_code: 'mikasa',
    province: 'mikasa',
    country_code: 'mikasa',
    phone: 'mikasa',
  } 

  try {
    await updateShippingAddress(addressId, address).then(() => {
      console.log("updated")
    })
    return { success: true, error: null, addressId }
  } catch (error) {
    return { success: false, error: error.toString(), addressId }
  }
}

export async function deleteCustomerShippingAddress(addressId) {
  try {
    await deleteShippingAddress(addressId).then(() => {
      console.log("deleted")
    })
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.toString() }
  }
}

export async function updateCustomerBillingAddress(
  
) {
  const customer = {
    billing_address: {
      first_name: 'mikasa',
      last_name: 'mikasa',
      company: 'mikasa',
      address_1: 'mikasa',
      address_2: 'mikasa',
      city: 'mikasa',
      postal_code: 'mikasa',
      province: 'mikasa',
      country_code: 'mikasa',
      phone: 'mikasa',
    },
  }

  try {
    await updateCustomer(customer).then(() => {
      console.log("updated")
    })
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.toString() }
  }
}

export async function signOut() {
  try {
    await logOutCustomer()
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.toString() }
  }
}
