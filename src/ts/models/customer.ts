import { ICustomer } from "./ICustomer";
import { CartItem } from "./CartItem";
import { Product } from "./Produkt";

export class Customer {
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

    constructor() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.mobile = "";
        this.adress = "";
        this.region = "";
        this.delivery = "";
        this.cardNumber = "";
        this.cardCvc = "";
        this.ordernumbers = [];
        this.cart = [];
    }

    getCustomer(): Customer {
        //In real life, this customer object would not be taken from storage first.
        //It would get fetched from a database once the user has logged in. And if
        //it was logged in already in the same session; it would get the customer
        //object from sessionstorage.
        let Icustomer: ICustomer = JSON.parse(
            sessionStorage.getItem("customer")
        );
        if (Icustomer == null) {
            return new Customer();
        } else {
            let customer: Customer = new Customer();
            customer.firstname = Icustomer.firstname;
            customer.lastname = Icustomer.lastname;
            customer.email = Icustomer.email;
            customer.mobile = Icustomer.mobile;
            customer.adress = Icustomer.adress;
            customer.region = Icustomer.region;
            customer.delivery = Icustomer.delivery;
            customer.cardNumber = Icustomer.cardNumber;
            customer.cardCvc = Icustomer.cardCvc;
            customer.ordernumbers = Icustomer.ordernumbers;
            customer.cart = Icustomer.cart;
            return customer;
        }
    }

    storeCustomer(): void {
        sessionStorage.setItem("customer", JSON.stringify(this));
    }

    addProductToCart(product: Product): void {
        for (let i = 0; i < this.cart.length; i++) {
            let item = this.cart[i];
            if (item.product.id == product.id) {
                item.quantity++;
                this.storeCustomer();
                return;
            }
        }

        this.cart.push(new CartItem(product));
        this.storeCustomer();
    }

    removeProductFromCart(product: Product): void {
        let recalculatedCart: CartItem[] = [];
        this.cart.forEach((item: CartItem) => {
            if (item.product.id == product.id) {
                if (item.quantity > 1) {
                    item.quantity--;
                    recalculatedCart.push(item);
                }
            } else {
                recalculatedCart.push(item);
            }
        });
        this.cart = recalculatedCart;
        this.storeCustomer();
    }

    emptyCart(): void {
        this.cart = [];
        this.storeCustomer();
    }
}
