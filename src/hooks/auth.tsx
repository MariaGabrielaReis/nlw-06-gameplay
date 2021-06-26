/* centralização da parte do contexto */
import React, { createContext, useContext, useState, ReactNode } from "react";

import * as AuthSession from "expo-auth-session";

const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

import { api } from "../services/api";

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);

      /* URL para autenticação com o Discord */
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      /* criação da sessão */
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      /* 
        só avança se a autenticação aconteceu 
        e não deu erro (como não aceitar a autenticação) 
      */
      if (type === "success" && !params.error) {
        /* captura dos dados do usuário e do token - pra identificar o 'usuário' (conseguir o response certo) */
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get("/users/@me");
        const firstName = userInfo.data.username.split(" ")[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token,
        });
      }
    } catch {
      throw new Error("Não foi possível autenticar");
    } finally {
      /* independente se deu certo ou errado a autenticação, ele tira o loading */
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  /* criação de hook próprio para autenticação */
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
