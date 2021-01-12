import React from "react";

interface AppContextInterface {
  handleLight: () => void;
  mode: string;
  loggedInUserId: string | null;
  setLoggedInUserId: any;
}

const AppCtx = React.createContext<AppContextInterface | null>(null);

export const AppContext = ({ children }: { children: JSX.Element }) => {
  const currentMode = localStorage.getItem('mode') || 'dark';
  const [mode, setMode] = React.useState(currentMode);
  const [loggedInUserId, setLoggedInUserId] = React.useState<string | null>(null);

  const handleLight = () => {
    if (mode === 'dark') {
      setMode('light');
      localStorage.setItem('mode', 'light');
    } else {
      setMode('dark');
      localStorage.setItem('mode', 'dark');
    }
  }

  return (
    <AppCtx.Provider value={{
      mode,
      handleLight,
      loggedInUserId,
      setLoggedInUserId
    }}>
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

export const useLoggedInUserId = () => {
  const appContext = React.useContext(AppCtx);
  return appContext?.loggedInUserId
}

export const useSetLoggedInUserId = () => {
  const appContext = React.useContext(AppCtx);
  return appContext?.setLoggedInUserId
}
