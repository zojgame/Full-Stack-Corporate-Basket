export interface Basket {
    _id: String,
        first_owner: String,
        basket_name: String,
        owners: String[],
        items: Item[],
        public: Boolean,
        __v: Number
}

export interface Item{
    price: String,
    title: String,
    _id?: String,
}