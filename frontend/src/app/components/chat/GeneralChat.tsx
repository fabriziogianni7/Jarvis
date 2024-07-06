import { useEffect, useRef, useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }]);
      setInput('');
    }
  };

  useEffect(() => {
    let refCur = messagesEndRef.current as any
    refCur.scrollIntoView({ behavior: 'smooth' }) as unknown as any;
  }, [messages]);

  return (
    <div className="flex flex-col h-[36rem] w-full  text-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg p-3 ${
                message.sender === 'user' ? 'bg-slate-700 text-white' : 'bg-slate-300 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
          <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-teal-700">
        <input
          type="text"
         className="w-full p-2 rounded-lg text-neutral-600 focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
