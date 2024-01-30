import {
    getCart,
    createCart,
    addItem,
    removeItem,
    updateItem
} from '../data'


export async function getOrSetCart() {
    const cartId = localStorage.getItem('_medusa_cart_id');
    let cart
  
    if (cartId) {
      cart = await getCart(cartId).then((cart) => cart)
    }
    if (!cart) {
      cart = await createCart().then((res) => res)
      cart && localStorage.setItem("_medusa_cart_id", cart.id);
      console.log(cart)
    }
    return cart
}
  
export async function retrieveCart() {
    const cartId = localStorage.getItem("_medusa_cart_id");
  
    if (!cartId) {
      return null
    }
  
    try {
      const cart = await getCart(cartId).then((cart) => cart)
      return cart
    } catch (e) {
      console.log(e)
      return null
    }
}
  
export async function addToCart({
    variantId,
    quantity,
  }) {
    const cart = await getOrSetCart().then((cart) => cart)
  
    if (!cart) {
      return "Missing cart ID"
    }
  
    if (!variantId) {
      return "Missing product variant ID"
    }
  
    try {
      await addItem({ cartId: cart.id, variantId, quantity })
      console.log(cart)
    } catch (e) {
      return "Error adding item to cart"
    }
}
  
export async function updateLineItem({
    lineId,
    quantity,
  }) {
    const cartId = localStorage.getItem("_medusa_cart_id")
  
    if (!cartId) {
      return "Missing cart ID"
    }
  
    if (!lineId) {
      return "Missing lineItem ID"
    }
  
    if (!cartId) {
      return "Missing cart ID"
    }
  
    try {
      await updateItem({ cartId, lineId, quantity })
      console.log(cart)
    } catch (e) {
      return e.toString()
    }
}
  
export async function deleteLineItem(lineId) {
    const cartId = localStorage.getItem("_medusa_cart_id")
  
    if (!cartId) {
      return "Missing cart ID"
    }
  
    if (!lineId) {
      return "Missing lineItem ID"
    }
  
    if (!cartId) {
      return "Missing cart ID"
    }
  
    try {
      await removeItem({ cartId, lineId })
      console.log(cart)
    } catch (e) {
      return "Error deleting line item"
    }
}