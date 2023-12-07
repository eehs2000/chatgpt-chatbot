'use client';

import { useState, FormEvent } from 'react';
import { callOpenai } from '@/services/apis';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>(
    []
  );

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;

    setIsLoading(true);

    const input = inputValue.trim();
    setInputValue('');
    console.log('?', inputValue);

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { role: 'user', content: input },
    ]);
    setChatLog([...chatLog, { role: 'user', content: input }]);

    const response = await callOpenai(input);
    console.log('res:', response);

    setIsLoading(false);
  };

  return (
    <div className="text-white flex flex-col items-center w-full h-screen justify-center">
      <h1 className="text-5xl font-bold mb-20 mt-20">Ask Chat-gpt</h1>
      {chatLog.length === 0 && (
        <div className="flex-1">
          <p className="infoText">"ask Something to me"</p>
          <p className="infoText">"What time is Korea now?"</p>
          <p className="infoText">"What is the color of sky?"</p>
        </div>
      )}

      {chatLog.length > 0 && (
        <div className="chat-messages flex-1 justify-start">
          {chatLog.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm w-full  ">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
          <input
            type="text"
            className="bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-200 flex-1"
            disabled={isLoading}
            placeholder="Type your message"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            value={inputValue}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
