"use client"

import React, { useState } from "react";
import styled from "styled-components";
import Tesseract from "tesseract.js";
// import fs from 'fs/promises';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
`;

const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60px;
  color: #333;
  gap: .5rem;
`;

const Header = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const PreviewText = styled.p`
  text-align: center;
  padding: 0 20rem;
`;

const PoweredBy = styled.div`
`;

const SubmitArea = styled.div`
  display: flex;
  width: 400px;
  height: 55px;
  margin-top: 2rem;
  justify-content: space-between;
  border-radius: 50px;
  border: 2px solid #ccc;

    input[type="file"]::file-selector-button {
  display: none;
}
`;

const SubmitInput = styled.input`
  padding: 17px 15px;
  display: flex;
  height: 50px;
  border-radius: 50px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
  color: gray;
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 50px;

  &:hover {
    background-color: #0056b3;
  }
`;



export default function Home() {
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFile(event.target.files?.[0] || null);
    };

    const sendRequest = async (emotion: string) => {
      let requestString = `Write a haiku elliciting the emotion of ${emotion}`
      
      const messages = [
        { role: 'user', content: requestString }
      ];
  
    const response = await fetch('/api/gptconnect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    console.log(data.result.content)
  }
  
  
  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
  
    const imageUrl = URL.createObjectURL(file); // Convert file to URL
    const { data } = await Tesseract.recognize(imageUrl, "eng"); // Use URL instead of FileReader
  
    setText(data.text);
  
    sendRequest(
      `${data.text} - Give me a short 4-sentence response on the authenticity of this text and whether it contains any traces of AI-generated content that could deem it fraudulent. If it has instructions to contact their firm for help, it's likely fraudulent.`
    );
  
    URL.revokeObjectURL(imageUrl); // Clean up after processing
  };
  



  return (
    <PageWrapper>
      <HeaderArea>
        <Header>AI-Powered Fraud Detection for Deed Theft</Header>
        <PreviewText>Let us help explain confusing and misleading documents. We'll detect AI-generated text, helping you verify the authenticity and prevent deed fraud and refinance scams.</PreviewText>
      </HeaderArea>
      <SubmitArea>
        <SubmitInput type="file" accept=".png" onChange={handleFileChange}/>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </SubmitArea>
    </PageWrapper>
  );
}
