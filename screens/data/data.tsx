const data = {
    users: [
        {
            id: 1,
            username: "Uday",
            password: "1234",
            email: "john.doe@example.com",
            phone: "+1234567890",
            profileImage: "https://example.com/images/johndoe.jpg"
        },
        {
            id: 2,
            username: "Kaushik",
            password: "1234",
            email: "jane.smith@example.com",
            phone: "+0987654321",
            profileImage: "https://example.com/images/janesmith.jpg"
        }
    ],
    products: [
        {
            id: 101,
            name: "Red Roses",
            category: "Flowers",
            price: 19.99,
            image: "https://example.com/images/redroses.jpg",
            stock: 25
        },
        {
            id: 102,
            name: "Sunflowers",
            category: "Flowers",
            price: 15.99,
            image: "https://example.com/images/sunflowers.jpg",
            stock: 30
        }
    ],
    orders: [
        {
            orderId: 201,
            userId: 1,
            productId: 101,
            quantity: 2,
            totalPrice: 39.98,
            orderDate: "2024-12-07T10:00:00Z"
        },
        {
            orderId: 202,
            userId: 2,
            productId: 102,
            quantity: 1,
            totalPrice: 15.99,
            orderDate: "2024-12-06T15:30:00Z"
        }
    ],
    settings: {
        theme: "light",
        notifications: true,
        language: "en"
    }
};

export default data;
