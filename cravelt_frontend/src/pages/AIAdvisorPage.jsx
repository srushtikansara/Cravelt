import { useState, useRef, useEffect } from "react";
import { useApp } from "../contexts/AppContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Send, Bot, User as UserIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AIAdvisor() {
  const { restaurants, user } = useApp();

  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "ai",
      content: {
        text: "Hello! 👋 I'm your AI Food Advisor. Ask me anything like 'cheap food', 'pizza', 'romantic dinner'!",
        data: [],
      },
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickPrompts = [
    "Best restaurants",
    "Cheap food",
    "Pizza places",
    "Romantic dinner",
    "South Indian",
    "Recommend for me",
  ];

  // ✅ FORMAT RESPONSE
  const formatRestaurants = (list) => {
    return list.slice(0, 3).map((r) => ({
      id: r.id,
      name: r.name,
      rating: r.rating,
      description: r.description,
    }));
  };

  // ✅ AI LOGIC
  const generateAIResponse = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("pizza") || msg.includes("italian")) {
      const data = restaurants.filter((r) =>
        r.cuisine?.some((c) => c.toLowerCase().includes("italian"))
      );
      return { text: "🍕 Best pizza places:", data: formatRestaurants(data) };
    }

    if (msg.includes("cheap") || msg.includes("budget")) {
      const data = restaurants.filter((r) => r.priceForTwo <= 300);
      return { text: "💰 Budget-friendly places:", data: formatRestaurants(data) };
    }

    if (msg.includes("dessert")) {
      const data = restaurants.filter((r) =>
        r.category?.toLowerCase().includes("dessert")
      );
      return { text: "🍰 Dessert spots:", data: formatRestaurants(data) };
    }

    if (msg.includes("romantic")) {
      const data = restaurants.filter((r) =>
        r.ambience?.includes("romantic")
      );
      return { text: "💑 Romantic places:", data: formatRestaurants(data) };
    }

    if (msg.includes("recommend") && user?.foodPreferences?.length) {
      const data = restaurants.filter((r) =>
        r.cuisine?.some((c) =>
          user.foodPreferences.includes(c)
        )
      );
      return {
        text: `🎯 Based on your preferences (${user.foodPreferences.join(", ")})`,
        data: formatRestaurants(data),
      };
    }

    const top = [...restaurants].sort((a, b) => b.rating - a.rating);
    return { text: "⭐ Top restaurants:", data: formatRestaurants(top) };
  };

  // ✅ SEND MESSAGE
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      type: "user",
      content: { text: input, data: [] },
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(input);

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">

      {/* HEADER */}
      <div className="p-6 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot /> AI Food Advisor <Sparkles className="text-orange-500" />
        </h1>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex gap-3 ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* AI ICON */}
              {msg.type === "ai" && (
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Bot className="text-white" />
                </div>
              )}

              {/* MESSAGE */}
              <div
                className={`max-w-[75%] p-4 rounded-xl ${
                  msg.type === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-gray-800 text-black dark:text-white"
                }`}
              >
                <p>{msg.content.text}</p>

                {/* ✅ RESTAURANT CARDS */}
                {msg.content.data?.map((r) => (
                  <div
                    key={r.id}
                    className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-pointer hover:scale-[1.02] transition"
                    onClick={() =>
                      (window.location.href = `/restaurant/${r.id}`)
                    }
                  >
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm">{r.rating} ⭐</p>
                    <p className="text-xs opacity-70">{r.description}</p>
                  </div>
                ))}

                <p className="text-xs mt-2 opacity-60">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* USER ICON */}
              {msg.type === "user" && (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <UserIcon />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK PROMPTS */}
      {messages.length <= 1 && (
        <div className="p-4 flex flex-wrap gap-2">
          {quickPrompts.map((p) => (
            <Button key={p} onClick={() => setInput(p)} variant="outline">
              {p}
            </Button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="p-4 border-t bg-white dark:bg-gray-900 flex gap-2 text-zinc-900">
        <Input
  placeholder="Ask something..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSend()}
  className="
    flex-1 h-12 px-4 rounded-lg
    bg-white text-black placeholder-gray-500
    dark:bg-gray-200 dark:text-black dark:placeholder-gray-600
    border border-gray-300
    focus:outline-none focus:ring-2 focus:ring-orange-500
  "
/>

        <Button onClick={handleSend} className="bg-orange-500">
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default AIAdvisor;