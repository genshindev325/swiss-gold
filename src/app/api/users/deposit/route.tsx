import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/lib/mongoose';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
    await dbConnect();
    
    const body = await req.json();
    const {
        wallet,
        amount,
        amountGold,
        txHash
    } = body;
    console.log(body);

    try {
        // const existingDeposit = await User.findOne({ wallet });
        // if (existingDeposit) {
        //     const updatedDeposit = await User.findOneAndUpdate({wallet: wallet}, {$inc: {depositAmount: amount}});
        //     return NextResponse.json({
        //         success: false,
        //         message: 'User already deposited',
        //         data : {
        //             wallet: wallet,
        //             depositAmount: updatedDeposit?.depositAmount,
        //             token: "jwt",
        //         }
        //     }, { status: 201 });
        // } else {
        //     const newDeposit = await User.create({
        //         wallet: wallet,
        //         depositAmount: amount,
        //     });
        //     return NextResponse.json({
        //         success: true,
        //         data: {
        //             wallet: wallet,
        //             depositAmount: newDeposit.depositAmount,
        //             token: "jwt",
        //         },
        //     }, { status: 201 });
        // }

        const newDeposit = await User.create({
            wallet: wallet,
            depositAmount: amount,
            amountGoldToReceive: amountGold,
            txHash: txHash
        });
        
        return NextResponse.json({
            success: true,
            data: {
                wallet: wallet,
                depositAmount: newDeposit.depositAmount,
                goldToReceive: newDeposit.amountGoldToReceive,
                token: "jwt",
            },
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}