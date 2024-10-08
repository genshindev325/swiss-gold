import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import Token from '@/models/tokenModel';

export async function POST(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();
    const { tokenName, tokenPrice } = body;

    try {
        const existingToken = await Token.findOne({ tokenName: tokenName });
        let success = false;
        if (existingToken) {
            const updatedToken = await Token.findOneAndUpdate({tokenName: tokenName}, { price: tokenPrice });
            if(updatedToken){
                success = true;
            }
        } else {
            const newToken = await Token.create({
                tokenName: tokenName,
                price: tokenPrice,
            });
            if(newToken){
                success = true;
            }
        }
        if(success == true){
            return NextResponse.json({
                success: true,
                message: 'Set price successfully',
            }, { status: 201 });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Failed to set price',
            }, { status: 400 });
        }
        
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}