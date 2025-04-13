import { useState, useRef, useEffect } from "react";
import { enviarParaIA } from "../api/openaiChat";
import { FaRobot, FaUser, FaPaperPlane, FaTrashAlt } from "react-icons/fa";

function Chatbot() {
  const [mensagens, setMensagens] = useState([]);
  const [input, setInput] = useState("");
  const [esperando, setEsperando] = useState(false);
  const mensagensRef = useRef(null);

  useEffect(() => {
    setMensagens([
      {
        tipo: "bot",
        texto: "Olá! Estou aqui para te ajudar com qualquer dúvida. É só digitar sua pergunta abaixo.",
      },
    ]);
  }, []);

  useEffect(() => {
    mensagensRef.current?.scrollTo({
      top: mensagensRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensagens]);

  const enviar = async () => {
    if (!input.trim() || esperando) return;

    const pergunta = input;
    setInput("");
    setEsperando(true);

    setMensagens((prev) => [...prev, { tipo: "user", texto: pergunta }]);

    try {
      const resposta = await enviarParaIA(pergunta);
      setMensagens((prev) => [...prev, { tipo: "bot", texto: resposta }]);
    } catch {
      setMensagens((prev) => [
        ...prev,
        { tipo: "bot", texto: "Desculpe, algo deu errado ao tentar responder." },
      ]);
    } finally {
      setEsperando(false);
    }
  };

  const limpar = () => {
    setMensagens([
      {
        tipo: "bot",
        texto: "Conversa reiniciada. Envie sua pergunta quando quiser!",
      },
    ]);
    setInput("");
  };

  return (
    <div className="bg-background-dark text-white max-w-2xl mx-auto mt-20 p-6 rounded-2xl shadow-2xl border border-neon-red">
      <h2 className="text-3xl font-bold text-center mb-6 text-neon-red flex items-center justify-center gap-2">
        <FaRobot className="text-2xl" />
        Chatbot IA
      </h2>

      <div
        ref={mensagensRef}
        className="h-96 overflow-y-auto bg-background p-4 rounded-xl mb-4 border border-gray-700 no-scrollbar shadow-inner"
      >
        {mensagens.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 my-3 ${
              msg.tipo === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.tipo === "bot" && (
              <div className="text-xl text-neon-red mt-1">
                <FaRobot />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-[75%] whitespace-pre-wrap text-sm md:text-base ${
                msg.tipo === "user"
                  ? "bg-neon-red/20 border border-neon-red text-neon-red text-right"
                  : "bg-gray-700 text-left text-white"
              }`}
            >
              {msg.texto}
            </div>
            {msg.tipo === "user" && (
              <div className="text-xl text-white mt-1">
                <FaUser />
              </div>
            )}
          </div>
        ))}

        {esperando && (
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2 animate-pulse">
            <FaRobot />
            <span>Digitando...</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-neon-red"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          disabled={esperando}
        />
        <button
          onClick={enviar}
          disabled={esperando}
          className="bg-neon-red hover:bg-red-700 transition-colors px-4 py-3 rounded-lg text-white font-bold shadow-md disabled:opacity-50 flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={limpar}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-500 text-gray-300 rounded hover:bg-gray-700 hover:text-white transition-all"
        >
          <FaTrashAlt className="text-base" />
          Limpar Conversa
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
