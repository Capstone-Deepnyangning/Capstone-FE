import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation/navigation';
import React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  useEffect(() => {
    // 백그라운드 메시지 핸들러 설정
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // 포그라운드 메시지 핸들러 설정
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Message handled in the foreground!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
