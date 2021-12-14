// Made by: Elias Fredriksson
// Medieinstitutet FED21S

import { CartItem } from "./CartItem";

//Used primarily for constructing customer objects from storage.
export interface ICustomer {
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    adress: string;
    region: string;
    delivery: string;
    cardNumber: string;
    cardCvc: string;

    ordernumbers: number[];
    cart: CartItem[];
}
