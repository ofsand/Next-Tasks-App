type Product = {
	id: number;
	name: string;
	price: number;
};

const products: Product[] = [
	{ id: 1, name: "Keyboard", price: 29.99 },
	{ id: 2, name: "Mouse", price: 19.99 },
	{ id: 3, name: "Monitor", price: 199.99 },
	{ id: 4, name: "Chair", price: 199.99 },
];

console.log(filterByAttribute(products, { name: "Mouse" }));
// Output: [{ id: 2, name: 'Mouse', price: 19.99 }]

console.log(filterByAttribute(products, { price: 199.99 }));
// Output: [{ id: 3, name: "Monitor", price: 199.99 },{ id: 4, name: "Chair", price: 199.99 }]

function filterByAttribute(arr: any, filter: any) {
    // Implement the filterByAttribute function
}

