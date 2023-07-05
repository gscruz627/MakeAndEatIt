import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    bun: {
        type: String,
        required: true
    },
    main: {
        type: String
    },
    toppings: {
        type: Array,
        default: []
    },
    finalStack: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema)
export default Order;