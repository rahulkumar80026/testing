import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    },
    snack: {
        type: String,
        required: true
    }
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
