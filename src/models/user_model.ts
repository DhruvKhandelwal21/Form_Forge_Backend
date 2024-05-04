import { Schema, model, models } from 'mongoose';
const userSchema = new Schema({
    userName: {
        type: String,
        required: [true,"Username is Required"],
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: [true,"Email is Required"],
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        unique: true,
        min: 8,
    },
   
});

const Users = models.Users || model('Users', userSchema);

export default Users;