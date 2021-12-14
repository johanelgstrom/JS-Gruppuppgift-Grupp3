// Made by: Elias Fredriksson
// Medieinstitutet FED21S

import { Product } from "./models/Product";

//Looks through the given list of products and return a list of the products
//which have the search term in their name or description.
export function search(search: string, searchPool: Product[]): Product[] {
    let hits: Product[] = [];
    searchPool.forEach((p: Product) => {
        if (isInName(search, p) || isInDescription(search, p)) {
            hits.push(p);
        }
    });
    return hits;
}

//Returns true or false depending if the given string is in the
// given products name.
function isInName(search: string, p: Product): boolean {
    let name: string = p.name;
    if (name.indexOf(search) != -1) {
        return true;
    } else {
        return false;
    }
}

//Returns true or false depending if the given string is in the
//given products description.
function isInDescription(search: string, p: Product): boolean {
    let desc: string = p.description;
    if (desc.indexOf(search) != -1) {
        return true;
    } else {
        return false;
    }
}
