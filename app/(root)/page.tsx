import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'path';
import React from 'react';
import RootContainer from './RootContainer';

export default function Page({ searchParams }: any) {
  return <RootContainer authCode={searchParams.code} />;
}
