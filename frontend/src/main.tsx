import ReactDOM from "react-dom/client";

import App from "./App";
import './styles/globals.css';
import './index.css';

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);