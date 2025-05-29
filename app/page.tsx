"use client"

import React from "react";
import styled from "styled-components";
import { pdfToText } from 'pdf-ts';
import fs from 'fs/promises';

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
`;

const SubmitInput = styled.input`
  padding: 0 10px;
  display: flex;
  height: 50px;
  border-radius: 50px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
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
  
  const handleClick = async () => {
    const pdf = await fs.readFile('./path/to/file.pdf');
    // const text = await pdfToText(pdf);
    console.log("Yes");
  };

  return (
    <PageWrapper>
      <HeaderArea>
        <Header>AI-Powered Fraud Detection for Deed Theft</Header>
        <PreviewText>An intelligent tool that scans PDF documents to detect AI-generated text, helping businesses and legal professionals verify authenticity and prevent fraud in property deeds and real estate transactions.</PreviewText>
      </HeaderArea>
      <SubmitArea>
        <SubmitInput type="file" accept=".pdf" />
        <SubmitButton onClick={handleClick}>Submit</SubmitButton>
      </SubmitArea>
    </PageWrapper>
  );
}
