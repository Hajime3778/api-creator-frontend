import React, { createContext, ReactNode, useState } from 'react';
import { apisRepository } from 'src/repository/apisRepository';
import { Api } from 'src/types/api';

export interface ApisContextType {
  apis: Api[];
  setApis: React.Dispatch<React.SetStateAction<Api[]>>;
}

export const ApisContext = createContext<ApisContextType>({
  apis: [],
  setApis: () => console.warn('no function'),
});
