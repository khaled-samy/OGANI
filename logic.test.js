const { searchProduct, filterProduct, editProduct } = require("./js/logic");

describe("Test buyer page", () => {
    test("Should return items when searching for it", () => {
        const actual = searchProduct("ball", [{
                id: 1,
                category: "food",
                price: 100.0,
                productName: "Hamburger",
                image: "../assets/images/hamburger.jpeg",
            },
            {
                id: 2,
                category: "sports",
                price: 10.0,
                productName: "Ball",
                image: "../assets/images/ball.jpeg",
            },
            {
                id: 3,
                category: "drink",
                price: 5.99,
                productName: "Orange Juice",
                image: "../assets/images/orange.jpeg",
            },
        ]);
        const expected = [{
            id: 2,
            category: "sports",
            price: 10.0,
            productName: "Ball",
            image: "../assets/images/ball.jpeg",
        }, ];
        expect(actual).toEqual(expected);
    });

    test("Should return items when filtered by catagory and price", () => {
        const actual = filterProduct("food", "low", [{
                id: 0,
                category: "electronics",
                price: 30.0,
                productName: "HP Laptop",
                image: "../assets/images/laptop.jpg",
            },
            {
                id: 1,
                category: "food",
                price: 100.0,
                productName: "Hamburger",
                image: "../assets/images/hamburger.jpeg",
            },
            {
                id: 2,
                category: "sports",
                price: 10.0,
                productName: "Ball",
                image: "../assets/images/ball.jpeg",
            },
            {
                id: 3,
                category: "drink",
                price: 5.99,
                productName: "Orange Juice",
                image: "../assets/images/orange.jpeg",
            },
            {
                id: 4,
                category: "electronics",
                price: 300.0,
                productName: "Mobile",
                image: "../assets/images/mobile.jpeg",
            },
            {
                id: 5,
                category: "food",
                price: 130.0,
                productName: "Steak",
                image: "../assets/images/steak.jpeg",
            },
            {
                id: 6,
                category: "sports",
                price: 35.0,
                productName: "Basket Ball",
                image: "../assets/images/basketball.jpeg",
            },
            {
                id: 7,
                category: "fruit",
                price: 20.0,
                productName: "Pineapple",
                image: "../assets/images/pineapple.jpeg",
            },
        ]);
        const expected = [{
                id: 1,
                category: "food",
                price: 100,
                productName: "Hamburger",
                image: "../assets/images/hamburger.jpeg",
            },
            {
                id: 5,
                category: "food",
                price: 130,
                productName: "Steak",
                image: "../assets/images/steak.jpeg",
            },
        ];
        expect(actual).toEqual(expected);
    });

    test("Should Edit Item value", () => {
        const actual = editProduct("1", "price", 50.0, [{
                id: 0,
                category: "electronics",
                price: 30.0,
                productName: "HP Laptop",
                image: "../assets/images/laptop.jpg",
            },
            {
                id: 1,
                category: "food",
                price: 100.0,
                productName: "Hamburger",
                image: "../assets/images/hamburger.jpeg",
            },
        ]);
        const expected = [{
                id: 0,
                category: "electronics",
                price: 30.0,
                productName: "HP Laptop",
                image: "../assets/images/laptop.jpg",
            },
            {
                id: 1,
                category: "food",
                price: 50.0,
                productName: "Hamburger",
                image: "../assets/images/hamburger.jpeg",
            },
        ];
        expect(actual).toEqual(expected);
    });
});