import { CartItem } from "./CartItem";

export interface ICustomer {
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    adress: string;
    region: string;
    delivery: string;
    cardNumber: number;
    cardCvc: number;

    ordernumbers: number[];
    cart: CartItem[];
}
