import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { area, concern, skinType } = await req.json();

    if (!area || !concern || !skinType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `You are a professional skincare advisor. Based on the following profile, recommend 4 specific skincare products with product type, name, key ingredients, and a brief usage tip.

Skin Area: ${area}
Main Concern: ${concern}
Skin Type: ${skinType}

Respond ONLY in valid JSON (no markdown, no backticks) in this exact format:
{
  "summary": "one sentence personalized summary",
  "routine": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
  "products": [
    {
      "type": "e.g. Cleanser",
      "name": "e.g. CeraVe Hydrating Cleanser",
      "keyIngredients": ["Hyaluronic Acid", "Ceramides"],
      "tip": "Short usage tip"
    }
  ]
}`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', errText);
      return NextResponse.json(
        { success: false, error: 'AI service error' },
        { status: 500 }
      );
    }

    const groqData = await groqRes.json();
    const text = groqData.choices?.[0]?.message?.content || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error('Skin Finder API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
