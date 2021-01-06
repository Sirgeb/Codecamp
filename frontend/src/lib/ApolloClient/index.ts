import { ApolloClient, ApolloLink,  HttpLink, InMemoryCache, concat } from '@apollo/client';

const httpLink = new HttpLink({ 
  uri: 'http://localhost:8000/api',
  credentials: 'include'
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "X-CSRF-TOKEN": sessionStorage.getItem("token") || "",
    }
  });

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});
