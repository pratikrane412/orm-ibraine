// src/api/mockData.js

export const fetchTharProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Thar Roxx - Front Seat Organizer",
          price: 3990,
          oldPrice: 5999,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/Untitled-135_1.jpg?v=1758710226", // Use your actual image paths
          rating: 4.5,
          isSale: true,
          category: "Thar"
        },
        {
          id: 2,
          title: "Thar Roxx - Rear Seat Organizer",
          price: 3990,
          oldPrice: 5999,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/Untitled-47_2.jpg?v=1756810436",
          rating: 5,
          isSale: false,
          category: "Thar"
        },
        {
          id: 3,
          title: "Thar Roxx - Fuel Lid Cover",
          price: 1790,
          oldPrice: 2500,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/Untitled-37_2_0b41ae43-f511-4c20-b0b3-7f332d76e5f8.jpg?v=1756810245",
          rating: 5,
          isSale: false,
          category: "Thar"
        },
        {
          id: 4,
          title: "Thar Roxx - Passenger Grab Handle",
          price: 3990,
          oldPrice: 4500,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/Passenger_Grab_Handle_Bag_2.0.jpg?v=1754732382",
          rating: 4.5,
          isSale: true,
          category: "Thar"
        },
        {
          id: 5,
          title: "Thar Roxx - ORM Wheel Spacers",
          price: 12000,
          oldPrice: 14000,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/50mmspacers_2_118dd281-9bc5-4a4a-8d03-8d73077e4e89.png?v=1765366173", // Repeat images for demo
          rating: 5,
          isSale: false,
          category: "Thar"
        },
        {
          id: 6,
          title: "T-MAX Force View Titan Winch",
          price: 80000,
          oldPrice: 99000,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/01_13K.jpg?v=1758265183",
          rating: 5,
          isSale: true,
          category: "Thar"
        },
      ]);
    }, 500); // 0.5s simulated delay
  });
};