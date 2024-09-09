import { createContext, ReactNode } from 'react';
import fetchAdapter from '../http/axios/axiosAdapter';
import {HttpUserGateway} from "./http/auth/httpUserGateway.local"
import { HttpAccountGateway } from './http/account/HttpAccountGateway.local';
interface GatewayContextType {
  userGateway: HttpUserGateway,
  accountGateway: HttpAccountGateway
}

const GatewayContext = createContext<GatewayContextType | undefined>(undefined);

interface GatewayProviderProps {
  children: ReactNode;
}

function GatewayProvider({ children }: GatewayProviderProps) {
  const httpClient = new fetchAdapter();
  const userGateway = new HttpUserGateway(httpClient);
  const accountGateway = new HttpAccountGateway(httpClient);


  return (
    <GatewayContext.Provider value={{ userGateway, accountGateway }}>
      {children}
    </GatewayContext.Provider>
  );
}

export { GatewayContext, GatewayProvider };
