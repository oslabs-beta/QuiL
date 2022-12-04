import React from 'react';
import RootContainer from './RootContainer';

export default function Page({ searchParams }: any) {
  return (
    <RootContainer
      authCode={searchParams.code}
      stateCode={searchParams.state}
    />
  );
}
