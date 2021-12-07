export class Customer {
    firstname: string;
    lastname: string;
    mobile: string;
    adress: string;
    region: string;
    delivery: string;
    cardNumber: number;
    cardCvc: number;

    constructor(
        fName: string,
        lName: string,
        mobile: string,
        adress: string,
        region: string,
        delivery: string,
        cardNum: number,
        cardCvc: number
    ) {
        this.firstname = fName;
        this.lastname = lName;
        this.mobile = mobile;
        this.adress = adress;
        this.region = region;
        this.delivery = delivery;
        this.cardNumber = cardNum;
        this.cardCvc = cardCvc;
    }
}
