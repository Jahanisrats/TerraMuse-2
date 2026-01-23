import { GoogleGenAI } from "@google/genai";
import { allProducts } from "../data";

// Initialize the client
// API Key must be provided in the environment environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Construct a context string from the product data
const productContext = allProducts.map(p => 
    `ID: ${p.id} | Name: ${p.title} | Category: ${p.category} | Price: $${p.price} | Color: ${p.color || 'N/A'} | Description: ${p.description || 'Sustainable bohemian fashion item.'}`
).join('\n');

const SYSTEM_INSTRUCTION = `
You are "Muse", a personal stylist and brand ambassador for TerraMuse, a bohemian, sustainable fashion e-commerce store.
Your tone is earthy, warm, sophisticated, and helpful. You speak like a knowledgeable friend who loves slow living and artisan craft.

Here is our current product inventory:
${productContext}

Rules:
1. ONLY recommend products from the inventory list above.
2. If a user asks for a recommendation (e.g., "outfit for a wedding"), suggest a combination of Apparel and Accessories.
3. Keep responses concise (under 100 words) unless the user asks for a detailed story.
4. If asked about shipping or returns, mention our "Sustainable Shipping" and "30-Day Returns".
5. Do not make up prices or products not in the list.
6. If the user asks about something we don't sell (like electronics), gently guide them back to fashion and slow living.
`;

export const createChatSession = () => {
    return ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
        }
    });
};
