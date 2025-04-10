import React from 'react';
// import { LogBox } from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';

import Navigation from './navigation';
import AuthProvider from '@/providers/AuthProvider';
import ThemeProvider from '@/theme/ThemeProvider';

// LogBox.ignoreLogs([
//   'Setting a timer for a long period of time',
//   'new NativeEventEmitter',
//   'EventEmitter.',
// ]);

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
