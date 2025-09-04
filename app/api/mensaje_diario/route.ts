import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { headers } from "next/headers";

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MENSAJE_API_KEY = process.env.MENSAJE_API_KEY;

async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  message: string
) {
  const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(telegramURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  });
  return response.json();
}

async function generateMotivationalMessage(): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-5-nano"),
      prompt: `Generate a supportive and therapeutic message in Spanish for Marialy, someone with binge eating disorder. The message should be written as if it comes from her loving husband. The message should be:
      - Compassionate, understanding, and romantic
      - About 3-4 sentences long  
      - Focused on self-care, self-compassion, and healthy coping strategies
      - Encourage mindful eating and emotional awareness
      - Warm, non-judgmental, empowering, and loving tone from a spouse
      - Include emojis throughout the message (not just at the beginning)
      - Personalized by addressing her with the loving nicknames her husband uses: "Mi guapa", "Pepe", or "Gri" occasionally
      - Written in first person as her husband speaking to her
      - End with a loving message from the husband expressing his love and support
      - IMPORTANT: Naturally integrate the core message that she can achieve everything she sets her mind to, that she should give it her all because you trust in her completely. Do NOT use quotes around this message - make it flow naturally as part of your loving words.
      
      Example themes: self-acceptance, mindful eating, emotional awareness, progress over perfection, self-compassion, healthy boundaries, finding alternative coping strategies, spousal love and support, unwavering belief in her capabilities.
      
      The husband should express his unconditional love, pride in her progress, complete trust and confidence in her abilities, and remind her that she's not alone in this journey.
      
      Avoid: mentioning specific foods, weight, calories, meditation, "listening to your body", or anything that could trigger restrictive behaviors. Focus on emotional well-being, self-care, spousal love and support, and empowerment through trust and belief in her strength.`,
    });
    return text;
  } catch {
    // Fallback message if AI generation fails
    return "💙 Mi guapa, quiero recordarte que puedes lograr todo lo que te propongas 🌟 Échale ganas porque confío completamente en ti y en tu fuerza 💪 Eres increíble tal como eres hoy y cada momento es una nueva oportunidad para cuidarte con amor propio 💕 Te amo profundamente y estoy muy orgulloso de ti ❤️";
  }
}

export async function GET() {
  try {
    // Check if this is a Vercel cron job request
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    const apiKey = headersList.get("x-api-key");
    const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;

    // Allow requests from Vercel cron or with valid API key
    if (!isVercelCron && (!MENSAJE_API_KEY || apiKey !== MENSAJE_API_KEY)) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check required environment variables
    if (!TELEGRAM_API_KEY || !TELEGRAM_CHAT_ID || !OPENAI_API_KEY) {
      return Response.json(
        {
          success: false,
          error:
            "Missing required environment variables: TELEGRAM_API_KEY, TELEGRAM_CHAT_ID, or OPENAI_API_KEY",
        },
        { status: 500 }
      );
    }

    // Generate motivational message using AI
    const motivationalMessage = await generateMotivationalMessage();

    // Send Telegram message
    const telegramResponse = await sendTelegramMessage(
      TELEGRAM_API_KEY,
      TELEGRAM_CHAT_ID,
      motivationalMessage
    );

    if (!telegramResponse.ok) {
      return Response.json(
        {
          success: false,
          error: "Failed to send Telegram message",
          telegramError: telegramResponse,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data: {
        message: motivationalMessage,
        telegramResponse,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to send motivational message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
