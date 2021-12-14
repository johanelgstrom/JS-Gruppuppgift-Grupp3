import { CartItem } from "./CartItem";

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
