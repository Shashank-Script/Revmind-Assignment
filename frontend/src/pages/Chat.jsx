import { useState } from "react";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        {
          question,
        },
      );

      setAnswer(res.data.answer);
    } catch (error) {
      console.error(error);

      setAnswer("Something went wrong while fetching the answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">NovaBite AI Assistant</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a business question..."
          className="w-full border rounded-lg p-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black cursor-pointer text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {(loading || answer) && (
        <div className="mt-8 bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Answer</h2>

          {loading ? <p>Generating response...</p> : <p>{answer}</p>}
        </div>
      )}
    </div>
  );
}

export default Chat;
