import mongoose, { Document, Schema, Model } from 'mongoose';

interface IToken extends Document {
    tokenName: string;
    category: string;
    price: number;

    createdAt: Date;
}

const tokenSchema = new Schema<IToken>({
    tokenName: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: () => new Date() },
});

const Token: Model<IToken> = mongoose.models.Token || mongoose.model<IToken>('Token', tokenSchema);
export default Token;
