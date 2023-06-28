import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
    mainNumber: {
        type: Number
    },
    sides: {
        type: Array,
        default: []
    },
    toppings: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema)
export default Order;