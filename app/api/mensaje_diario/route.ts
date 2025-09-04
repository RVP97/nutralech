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
      model: openai("gpt-4o-mini"),
      temperature: 0.8,
      prompt: `Escribe un mensaje de apoyo en español de 3-4 oraciones para Marialy de parte de su esposo. Debe ser cariñoso, comprensivo y motivador. Incluye emojis y usa ocasionalmente los apodos "Mi guapa", "Pepe" o "Gri". Integra naturalmente que puede lograr todo lo que se proponga y que confías completamente en ella. Enfócate en amor incondicional, autocuidado y bienestar emocional. Evita mencionar comida, peso o calorías.`,
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
