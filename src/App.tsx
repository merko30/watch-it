import React from "react";
import { LogBox } from "react-native";

import { QueryClient, QueryClientProvider } from "react-query";

import Navigation from "./navigation";

import ThemeProvider from "theme/ThemeProvider";
import AuthProvider from "providers/AuthProvider";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
