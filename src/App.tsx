import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import LoadingScreen from '@/screens/LoadingScreen';
import NicknameScreen from '@/screens/NicknameScreen';
import MenuScreen from '@/screens/MenuScreen';
import GarageScreen from '@/screens/GarageScreen';
import UpgradeScreen from '@/screens/UpgradeScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import RacingScreen from '@/screens/RacingScreen';
import GameOverScreen from '@/screens/GameOverScreen';
import WalletScreen from '@/screens/WalletScreen';
import './App.css';

function App() {
  const currentScreen = useGameStore((s) => s.currentScreen);
  const loadPlayer = useGameStore((s) => s.loadPlayer);
  const notification = useGameStore((s) => s.notification);
  const clearNotification = useGameStore((s) => s.clearNotification);
  const [isLoading, setIsLoading] = useState(true);

  // Load player data and show loading screen
  useEffect(() => {
    loadPlayer();

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, [loadPlayer]);

  // Auto-clear notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  // Render screen based on current state
  const renderScreen = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen />;
      case 'nickname':
        return <NicknameScreen />;
      case 'menu':
        return <MenuScreen />;
      case 'garage':
        return <GarageScreen />;
      case 'upgrade':
        return <UpgradeScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'countdown':
        return <RacingScreen />;
      case 'racing':
        return <RacingScreen />;
      case 'paused':
        return <RacingScreen />;
      case 'gameover':
        return <GameOverScreen />;
      case 'wallet':
        return <WalletScreen />;
      default:
        return <MenuScreen />;
    }
  };

  return (
    <div className="game-container">
      {renderScreen()}

      {/* Global Notification */}
      {notification && (
        <div className="notification-toast">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;
