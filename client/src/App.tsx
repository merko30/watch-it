import React from 'react';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';

import store from './store';

import Navigation from './navigation';

import ThemeProvider from 'theme/ThemeProvider';
import AuthProvider from 'auth/AuthProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
