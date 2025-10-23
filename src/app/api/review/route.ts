
import { NextRequest, NextResponse } from 'next/server';
import { aiCodeReview } from '@/ai/flows/ai-code-review';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const language = formData.get('language') as string | null;

    if (!file) {
      return NextResponse.json({ detail: 'No file provided.' }, { status: 400 });
    }
    if (!language) {
      return NextResponse.json({ detail: 'No language provided.' }, { status: 400 });
    }
    
    const code = await file.text();

    const review = await aiCodeReview({ code, language });

    const result = {
        ...review,
        filename: file.name,
        language: language,
        code_excerpt: code.substring(0, 200),
        created_at: new Date().toISOString(),
    }

    // Persist the review by sending it to the reviews service
    try {
        const reviewServiceUrl = process.env.NODE_ENV === 'production' 
            ? 'https://code-reviewer-628186848429.us-central1.run.app/reviews'
            : 'http://localhost:9002/api/reviews';

        await fetch(reviewServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        });
    } catch (e: any) {
        console.error("Failed to persist review:", e.message);
        // We can still return the review to the user even if saving fails
    }


    return NextResponse.json(result);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ detail: e.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
