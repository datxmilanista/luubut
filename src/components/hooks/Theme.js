import React from "react";

import {
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ThemeButton from "./ThemeButton";

const Theme = ({ children }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [modeTheme, setMode] = React.useState(() => {
      const saved = localStorage.getItem('themeMode');
      return saved ? JSON.parse(saved) : prefersDarkMode;
    });
    
    React.useEffect(() => {
      localStorage.setItem('themeMode', JSON.stringify(modeTheme));
    }, [modeTheme]);
    
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode: modeTheme ? 'dark' : 'light',
            primary: {
              main: modeTheme ? '#667eea' : '#667eea',
              light: modeTheme ? '#8fa5f3' : '#8fa5f3',
              dark: modeTheme ? '#4a69d1' : '#4a69d1',
            },
            secondary: {
              main: modeTheme ? '#764ba2' : '#764ba2',
              light: modeTheme ? '#9a6fb5' : '#9a6fb5',
              dark: modeTheme ? '#5d3c82' : '#5d3c82',
            },
            background: {
              default: modeTheme ? '#0a0a0a' : '#fafafa',
              paper: modeTheme ? '#1e1e1e' : '#ffffff',
            }
          },
          typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h5: {
              fontWeight: 600,
              letterSpacing: '-0.02em',
            },
            body1: {
              lineHeight: 1.6,
            },
            body2: {
              lineHeight: 1.5,
            }
          },
          shape: {
            borderRadius: 12,
          },
          components: {
            MuiCard: {
              styleOverrides: {
                root: {
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${modeTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                }
              }
            },
            MuiButton: {
              styleOverrides: {
                root: {
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }
              }
            }
          }
        }),
      [modeTheme],
    );
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeButton setMode={setMode} modeTheme={modeTheme}/>
        <div className="App">{children}</div>
    </ThemeProvider>
  );
};

export default Theme;
