import { medusaClient } from "../modules/config";

// Cart actions
export async function createCart(data = {}) {

    return medusaClient.carts
        .create(data)
        .then(({ cart }) => cart)
        .catch((err) => {
        console.log(err);
        return null;
        });
}

export async function updateCart(cartId, data) {

    return medusaClient.carts
        .update(cartId, data)
        .then(({ cart }) => cart)
        .catch((error) => console.log(error));
}

export async function getCart(cartId) {

    return medusaClient.carts
        .retrieve(cartId)
        .then(({ cart }) => cart)
        .catch((err) => {
        console.log(err);
        return null;
        });
}

export async function addItem({ cartId, variantId, quantity }) {
    return medusaClient.carts.lineItems
        .create(cartId, { variant_id: variantId, quantity:quantity })
        .then(({ cart }) => cart)
        .catch((err) => {
        console.log(err);
        return null;
        });
}

export async function updateItem({ cartId, lineId, quantity }) {

    return medusaClient.carts.lineItems
        .update(cartId, lineId, { quantity })
        .then(({ cart }) => cart)
        .catch((err) => console.log(err));
}

export async function removeItem({ cartId, lineId }) {

    return medusaClient.carts.lineItems
        .delete(cartId, lineId)
        .then(({ cart }) => cart)
        .catch((err) => {
        console.log(err);
        return null;
        });
}

export async function createPaymentSessions(cartId) {
  
    return medusaClient.carts
      .createPaymentSessions(cartId)
      .then(({ cart }) => cart)
      .catch((err) => {
        console.log(err);
        return null;
      });
}
  
export async function setPaymentSession({ cartId, providerId }) {
    return medusaClient.carts
      .setPaymentSession(cartId, { provider_id: providerId })
      .then(({ cart }) => cart)
      .catch((err) => console.log(err));
}
  
export async function completeCart(cartId) {
  
    return medusaClient.carts
      .complete(cartId)
      .then((res) => res)
      .catch((err) => console.log(err));
}
  
  // Order actions
export async function retrieveOrder(id) {
  
    return medusaClient.orders
      .retrieve(id)
      .then(({ order }) => order)
      .catch((err) => console.log(err));
}

export async function getToken(credentials) {
  return medusaClient.auth
    .getToken(credentials)
    .then(({ access_token }) => {
      access_token && localStorage.setItem("_medusa_token", access_token)
      return access_token
    })
    .catch((err) => {
      throw new Error("Wrong email or password.")
    })
}
  
export async function authenticate(credentials) {
    try {
      const { customer } = await medusaClient.auth.authenticate(credentials);
      return customer;
    } catch (err) {
      console.log(err);
    }
}
  
export async function getSession() {
    try {
      const { customer } = await medusaClient.auth.getSession();
      return customer;
    } catch (err) {
      console.log(err);
    }
}
  
  // Customer actions
export async function getCustomer() {
    const headers = getHeader();
    return medusaClient.customers.retrieve(headers).then(({ customer }) => customer)
    .catch((err) => null)
}

const getHeader = () => {
  const jwt_token = localStorage.getItem("_medusa_token");
  const headers = {Authorization: `Bearer ${jwt_token}`};
  return headers;
}
  
export async function createCustomer(data) {
    try {
      const { customer } = await medusaClient.customers.create(data);
      return customer;
    } catch (err) {
      console.log(err);
    }
}
  
export async function updateCustomer(data) {
    try {
      const { customer } = await medusaClient.customers.update(data);
      return customer;
    } catch (err) {
      console.log(err);
    }
}

export async function logOutCustomer() {
  const headers = getHeader();
  try {
    medusaClient.auth.deleteSession(headers)
      .then((x) => {
        console.log(x);
      })
  } catch (err) {
    console.log(err);
  }
}
  
export async function addShippingAddress(data) {
    try {
      const { customer } = await medusaClient.customers.addresses.addAddress(data);
      return customer;
    } catch (err) {
      console.log(err);
    }
}
  
export async function deleteShippingAddress(addressId) {
    try {
      const { customer } = await medusaClient.customers.addresses.deleteAddress(addressId);
      return customer;
    } catch (err) {
      console.log(err);
    }
}
  
export async function updateShippingAddress(addressId, data) {
    try {
      const { customer } = await medusaClient.customers.addresses.updateAddress(addressId, data);
      return customer;
    } catch (err) {
      console.log(err);
    }
}
  
export async function listCustomerOrders(limit = 10, offset = 0) {
  const headers = getHeader();  
  try {
      const { orders } = await medusaClient.customers.listOrders({ limit, offset },headers);
      return orders;
    } catch (err) {
      console.log(err);
    }
}
// product functions
export async function getProductsById({ ids }) {
  
    try {
      const { products } = await medusaClient.products.list({ id: ids });
      return products;
    } catch (err) {
      console.log(err);
      return null;
    }
}
  
export async function retrievePricedProductById({ id, regionId }) {
  
    try {
      const { product } = await medusaClient.products.retrieve(`${id}?region_id=${regionId}`);
      return product;
    } catch (err) {
      console.log(err);
      return null;
    }
}
  
export async function getProductByHandle(handle) {
  
    try {
      const { products } = await medusaClient.products.list({ handle });
      const product = products[0];
      return { product };
    } catch (err) {
      throw err;
    }
}

export async function retrieveCollection(id) {
  try {
    const { collection } = await medusaClient.collections.retrieve(id, {
      next: {
        tags: ["collections"],
      },
    });
    return collection;
  } catch (err) {
    throw err;
  }
}

export async function getCollectionsList(offset = 0, limit = 100) {
  try {
    const { collections } = await medusaClient.collections.list(
      { limit, offset },
      { next: { tags: ["collections"] } }
    );
    const count = collections.length;
    return {
      collections,
      count,
    };
  } catch (err) {
    throw err;
  }
}

export async function getCollectionByHandle(handle) {
  try {
    const { collections } = await medusaClient.collections.list(
      { handle: [handle] },
      { next: { tags: ["collections"] } }
    );
    return collections[0];
  } catch (err) {
    throw err;
  }
}

export async function getProductsByCollectionHandle({
  pageParam = 0,
  limit = 100,
  handle,
  countryCode,
}) {
  try {
    const { id } = await getCollectionByHandle(handle);
    const { response, nextPage } = await getProductsList({
      pageParam,
      queryParams: { collection_id: [id], limit },
      countryCode,
    });
    return {
      response,
      nextPage,
    };
  } catch (err) {
    throw err;
  }
}

// Category actions
export async function listCategories() {
  try {
    
    const { product_categories } = await medusaClient.productCategories.list(
      { expand: "category_children" }
    );
    return product_categories;
  } catch (err) {
    throw err;
  }
}

export async function getCategoriesList(offset = 0, limit = 100) {
  try {
    const { product_categories, count } =
      await medusaClient.productCategories.list(
        { limit, offset },
      );
    return {
      product_categories,
      count,
    };
  } catch (err) {
    throw err;
  }
}

export async function getCategoryByHandle(categoryHandle) {
  try {
    return medusaClient.productCategories.list({ handle: categoryHandle })
    .then(({product_categories})=> product_categories[0])
  } catch (err) {
    throw err;
  }
}

export async function getProductsByCategoryHandle({id}) {
  try {
    return medusaClient.products.list({
      category_id: [id],
      currency_code:"inr",
    })
    .then(({products}) => products)
  } catch (err) {
    throw err;
  }
}
