import { NextResponse } from 'next/server';
import { saveSubscriber } from '@/controllers/subscriberController';

// Route for saving email subscriptions from the frontend
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, source } = body;

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        const result = await saveSubscriber(email, source);
        if (!result.success) {
            return NextResponse.json(result, { status: 500 });
        }

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        console.error('Subscription API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
