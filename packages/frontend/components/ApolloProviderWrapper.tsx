'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function ApolloProviderWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
