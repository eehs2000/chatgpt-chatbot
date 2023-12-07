interface OpenaiResponse {
  data: any;
}

export async function callOpenai(userInput: string): Promise<OpenaiResponse> {
  console.log('userInput', userInput);
  const response = await fetch('/api/openai-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userInput }),
  });

  if (!response.ok) {
    throw new Error("Server response wasn't OK");
  }

  return response.json();
}
