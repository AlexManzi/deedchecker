'use client'
 
import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

type StyleSheetWrapperProps = {
  children: React.ReactNode;
};
 
export default function StyleSheetWrapper({ children }: StyleSheetWrapperProps) {
  
  const [styleWrapper] = useState(() => new ServerStyleSheet());
 
  useServerInsertedHTML(() => {
    const styles = styleWrapper.getStyleElement();
    styleWrapper.instance.clearTag();
    return <>{styles}</>
  });

  if (typeof window !== 'undefined') 
  return <>{children}</>;
 
  return (
    <StyleSheetManager sheet={styleWrapper.instance}>
        {children}
    </StyleSheetManager>
  )
};