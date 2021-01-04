import React from "react";

interface AppContextInterface {
  handleLight: () => void;
  mode: string;
}

const AppCtx = React.createContext<AppContextInterface | null>(null);

export const AppContext = ({ children }: { children: JSX.Element }) => {
  const currentMode = localStorage.getItem('mode') || 'dark';
  const [mode, setMode] = React.useState(currentMode);

  const handleLight = () => {
    if (mode === 'dark') {
      setMode('light');
      localStorage.setItem('mode', 'light');
    } else {
      setMode('dark');
      localStorage.setItem('mode', 'dark');
    }
  }

  const AppContext: AppContextInterface = {
    mode,
    handleLight
  };

  return (
    <AppCtx.Provider value={AppContext}>
      {children}
    </AppCtx.Provider>
  );
};

export const useHandleLight = () => {
  const appContext = React.useContext(AppCtx);
  return appContext?.handleLight
}

export const useMode = () => {
  const appContext = React.useContext(AppCtx);
  return appContext?.mode
}
