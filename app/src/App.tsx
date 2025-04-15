import React from 'react';
import { NotifierWrapper } from 'react-native-notifier';

import { QueryClient, QueryClientProvider } from 'react-query';

import Navigation from './navigation';
import AuthProvider from '@/providers/AuthProvider';
import ThemeProvider from '@/theme/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// LogBox.ignoreLogs([
//   'Setting a timer for a long period of time',
//   'new NativeEventEmitter',
//   'EventEmitter.',
// ]);

function App() {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView>
      <NotifierWrapper>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider>
              <Navigation />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}

export default App;
