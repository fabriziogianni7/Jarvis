import { useEffect, useRef, useState } from 'react';
import { keywords } from './chatUtils';
import React from 'react';
import useBrian from '@/app/hooks/useBrian';
import usePrediction from '@/app/hooks/usePrediction';
import useInfo from '@/app/hooks/useInfo';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! Try to input /prediction and then a token to get its price prediction, eg: "/prediction WBTC"`, sender: 'bot' },
    { id: 2, text: 'Try to input /info plus any query to get the answer from the agent eg: "/info explain trading to my teammate"', sender: 'bot' },
    { id: 3, text: 'Try to input /tx plus any action to do onchain to build and send a transaction, eg: "/tx swap 0.0001 ETH to LINK on base"', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [brianPrompt, setBrianPrompt] = useState('');
  const [pondPrompt, setPondPrompt] = useState('');
  const [infoPrompt, setInfoPrompt] = useState('');
  const messagesEndRef = useRef(null);

  const { isLoading, error, brianDescription } = useBrian({ text: brianPrompt })
  const { isLoading: isPredictionLoading, error: predictionError, prediction } = usePrediction({ text: pondPrompt })
  const { isLoading: isInfoLoading, error: infoError, info} = useInfo({ text: infoPrompt })

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }]);
      setInput('');
    }
    const kwd = checkKeywords(input)
    switch (kwd) {
      case keywords.brian:
        setBrianPrompt(input)
        break;
      case keywords.pond:
        setPondPrompt(input)
        break;
      case keywords.chatGpt:
        setInfoPrompt(input)
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let refCur = messagesEndRef.current as any
    refCur.scrollIntoView({ behavior: 'smooth' }) as unknown as any;
  }, [messages]);

  useEffect(() => {
    if (error) {
      setMessages([...messages, { id: messages.length + 1, text: error, sender: 'bot' }]);
      setInput('');
    }
    if (brianDescription) {
      setMessages([...messages, { id: messages.length + 1, text: brianDescription, sender: 'bot' }]);
      setInput('');
    }
    if (predictionError) {
      setMessages([...messages, { id: messages.length + 1, text: predictionError, sender: 'bot' }]);
      setInput('');
    }
    if (prediction) {
      setMessages([...messages, { id: messages.length + 1, text: prediction, sender: 'bot' }]);
      setInput('');
    }
    if (info) {
      setMessages([...messages, { id: messages.length + 1, text: info, sender: 'bot' }]);
      setInput('');
    }
    if (infoError) {
      setMessages([...messages, { id: messages.length + 1, text: infoError, sender: 'bot' }]);
      setInput('');
    }
  }, [error, brianDescription, predictionError, prediction, info, infoError]);

  useEffect(() => {
    const [lastMessage] = messages.slice(-1);
    if (lastMessage.sender == "user" && lastMessage.text.includes(keywords.brian))
      console.log("messages", messages)

  }, [messages]);

  const checkKeywords = (text: string) => {
    const keywordValues = Object.values(keywords);
    const foundKeyword = keywordValues.find((value) => text?.includes(value)) as any;
    const retvalue = foundKeyword ? foundKeyword : "";
    return retvalue
  }



  return (
    <div className="flex flex-col h-[36rem] w-full  text-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-slate-700 text-white' : 'bg-slate-300 text-black'
                }`}
            >
              {checkKeywords(message.text) ? (
                message.text.split(checkKeywords(message.text)).map((part, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className={`bg-slate-300 text-black font-bold`}>{checkKeywords(message.text)}</span>}
                    {part}
                  </React.Fragment>
                ))
              ) : (
               <ReactMarkdown>{message.text}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-teal-700">
        {
          isLoading ?
            <input
              type="text"
              disabled
              className={`w-full p-2 rounded-lg text-neutral-600 focus:outline-none flash-text`}
              placeholder="Type your message..."
              value={"Please wait while we build The Transaction with Brian..."}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            /> :
            isPredictionLoading ?
              <input
                type="text"
                disabled
                className={`w-full p-2 rounded-lg text-neutral-600 focus:outline-none flash-text`}
                placeholder="Type your message..."
                value={"Please wait while we load the price prediction with Pond..."}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              /> :
              isInfoLoading ?
               <input
                type="text"
                disabled
                className={`w-full p-2 rounded-lg text-neutral-600 focus:outline-none flash-text`}
                placeholder="Type your message..."
                value={"Please wait while we reaosonate on this info with chatgpt"}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />:
              <input
                type="text"
                className={`w-full p-2 rounded-lg text-neutral-600 focus:outline-none`}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
        }
      </div>
    </div>
  );
};

export default Chat;
