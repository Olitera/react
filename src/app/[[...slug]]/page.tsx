import React from 'react';
import '../../index.css';
import { ClientOnly } from './client.tsx';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return (
    <div>
      <ClientOnly />
    </div>
  );
}
