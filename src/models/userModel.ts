import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    wallet: string;
    depositAmount: string;
    amountGoldToReceive: string;
    createdAt: Date;
    txHash: string;
}

const userSchema = new Schema<IUser>({
    wallet: { type: String, required: true, unique: true },
    depositAmount: { type: String, required: true },
    amountGoldToReceive: { type: String, required: true},
    txHash: { type: String, required: true },

    createdAt: { type: Date, default: () => new Date() },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;