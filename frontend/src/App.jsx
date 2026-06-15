import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-6 py-4 flex gap-6">
            <Link to="/" className="font-semibold">
              Dashboard
            </Link>
            <Link to="/chat" className="font-semibold">
              Chat
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;