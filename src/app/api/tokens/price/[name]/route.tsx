import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Token from '@/models/tokenModel';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  await dbConnect();

  try {
    const token = await Token.findOne({tokenName: params.name});
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Token not found'
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      data: token,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
