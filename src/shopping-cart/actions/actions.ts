"use client";

import { getCookie, hasCookie, setCookie } from "cookies-next";

/* Se puede hacer con server actions
cookie: cart
{
    'uui-123-1':4,
    'uui-123-2':2,
    'uui-123-3':1,
}

*/

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");

    //Se podria verificar que cookieCart sea un objecto que tenga la firma { [id: string]: number }

    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (id in cookieCart) {
    delete cookieCart[id];

    setCookie("cart", JSON.stringify(cookieCart));
  }
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  const itemsInCart = (cookieCart[id] -= 1);

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};
