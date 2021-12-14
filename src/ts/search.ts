import { Product } from "./models/Produkt";

export function search(search: string, searchPool: Product[]): Product[] {
    let hits: Product[] = [];
    searchPool.forEach((p: Product) => {
        if (isInName(search, p) || isInDescription(search, p)) {
            hits.push(p);
        }
    });
    return hits;
}

function isInName(search: string, p: Product): boolean {
    let name: string = p.name.toLowerCase();
    if (name.indexOf(search.toLowerCase()) != -1) {
        return true;
    } else {
        return false;
    }
}

function isInDescription(search: string, p: Product): boolean {
    let desc: string = p.description;
    if (desc.indexOf(search) != -1) {
        return true;
    } else {
        return false;
    }
}
