// Substitua "SUA_API_KEY_AQUI" pela sua chave da OpenRouter.ai
const API_KEY = "SUA_API_KEY_AQUI";

export async function enviarParaIA(pergunta) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Você é um assistente útil, direto e educado. Responda com clareza.",
          },
          {
            role: "user",
            content: pergunta,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("RESPOSTA DA API:", data);

    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content;
    } else if (data.error) {
      return `Erro: ${data.error.message}`;
    }

    return "Não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Erro ao chamar a IA:", error);
    return "Ocorreu um erro ao tentar responder.";
  }
}
