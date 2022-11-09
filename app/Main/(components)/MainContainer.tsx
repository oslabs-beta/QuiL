'use client';
import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import DisplayContainer from './DisplayContainer';
const MainContainer = () => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      <NavigationBar isLogged={isLogged} setIsLogged={setIsLogged} />
      <DisplayContainer />
    </>
  );
};

export default MainContainer;
