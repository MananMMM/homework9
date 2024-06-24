import React, { createContext, useReducer } from "react";

export const BookContext = createContext();

export const initialState = {
    products:  [
        { id: 101, title: "Politics", price: 40, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465402141/9781465402141_cover.jpg/dk_Politics_Book" },
        { id: 102, title: "Religions", price: 35, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465408433/9781465408433_cover.jpg/dk_Religions_Book" },
        { id: 103, title: "Science", price: 30, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465419651/9781465419651_cover.jpg/dk_Science_Book" },
        { id: 104, title: "Sociology", price: 25, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465436504/9781465436504_cover.jpg/dk_Sociology_Book" },
        { id: 105, title: "History", price: 45, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465445100/9781465445100_cover.jpg/dk_History_Book" },
        { id: 106, title: "Business", price: 60, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465415851/9781465415851_cover.jpg/dk_Business_Book" },
        { id: 107, title: "Art", price: 30, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465453372/9781465453372_cover.jpg/dk_Art_Book" },
        { id: 108, title: "Literature", price: 40, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9781465491015/9781465491015_cover.jpg/dk_Literature_Book" },
        { id: 109, title: "Economics", price: 20, photo: "https://res.cloudinary.com/dk-hub/images/q_70,c_limit,h_290,w_220,f_auto/dk-core-nonprod//9780756698270/9780756698270_cover.jpg/dk_Economics_Book" },
    ],
    basket: [],
    totalValue: 0,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SetProd":
            return { ...state, products: action.payload };
        case "AddProd":
            const found = state.products.find((x) => x.id === action.payload);
            const basketItem = state.basket.find((x) => x.id === action.payload);
            if (basketItem) {
                return {
                    ...state,
                    basket: state.basket.map((x) =>
                        x.id === action.payload ? { ...x, count: x.count + 1 } : x
                    ),
                };
            } else {
                return {
                    ...state,
                    basket: [...state.basket, { ...found, count: 1 }],
                };
            }
        case "Delete":
            return {
                ...state,
                basket: state.basket.filter((item) => item.id !== action.payload),
            };
        case "DecItem":
            return {
                ...state,
                basket: state.basket.map((item) =>
                    item.id === action.payload && item.count > 1
                        ? { ...item, count: item.count - 1 }
                        : item
                ),
            };
        case "Total":
            const total = state.basket.reduce(
                (acc, item) => acc + item.price * item.count, 0);
            return { ...state, totalValue: total };
        default:
            return state;
    }
};
