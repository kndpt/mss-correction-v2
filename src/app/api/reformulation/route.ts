import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, reformulationDegree, previousVersions = [] } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Le prompt est requis' }, { status: 400 });
    }

    // Vérification des variables d'environnement
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Clé API OpenAI manquante' }, { status: 500 });
    }

    // Configuration OpenAI avec les variables d'environnement
    const openai = new OpenAI({
      apiKey,
    });

    const model = process.env.NEXT_PUBLIC_AI_MODEL || 'gpt-4';
    const temperature = parseFloat(process.env.NEXT_PUBLIC_AI_TEMPERATURE || '0.1');
    const maxTokens = parseInt(process.env.NEXT_PUBLIC_AI_MAX_TOKENS || '200', 10);
    const topP = parseFloat(process.env.NEXT_PUBLIC_AI_TOP_P || '0.7');
    const frequencyPenalty = parseFloat(process.env.NEXT_PUBLIC_AI_FREQUENCY_PENALTY || '0.5');
    const presencePenalty = parseFloat(process.env.NEXT_PUBLIC_AI_PRESENCE_PENALTY || '0.2');
    const basePrompt = process.env.NEXT_PUBLIC_AI_PROMPT || 'Tu es correcteur de roman.';

    // Construction du prompt complet
    let fullPrompt = `${basePrompt}\n\n${prompt}`;

    if (previousVersions.length > 0) {
      fullPrompt += '\n\nVersions déjà générées (à éviter) :\n';
      previousVersions.forEach((version: string, index: number) => {
        fullPrompt += `${index + 1}. ${version}\n`;
      });
      fullPrompt += '\nGénère une version différente de celles-ci.';
    }

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
    });

    const result = completion.choices[0]?.message?.content;

    if (!result) {
      return NextResponse.json({ error: 'Aucune réponse générée' }, { status: 500 });
    }

    return NextResponse.json({
      result: result.trim(),
      degree: reformulationDegree,
      tokensUsed: completion.usage?.total_tokens || 0,
    });
  } catch (error) {
    console.error('Erreur API reformulation:', error);

    // Gestion des erreurs OpenAI spécifiques
    if (error instanceof Error) {
      return NextResponse.json({ error: `Erreur OpenAI: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
