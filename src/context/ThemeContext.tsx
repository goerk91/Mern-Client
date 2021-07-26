import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";
import { ThemeType, Theme } from "./theme/ThemeType";
import { THEME } from "./theme/theme.config";

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}
//  "as"??? Warum?? und warum muss setCurrentTheme deswegen nicht als DefaultValue angegeben werden????
// "as ThemeContextProps" kann nach dem Object "}" hinzugefügt werden -> interface ThemeContextProps -> setCurrentTheme
//  muss nicht mehr optional gesetzt werden
export const ThemeContext = createContext<ThemeContextProps>({
  themeType: "light",
  theme: THEME["light"],
} as ThemeContextProps);

export const ThemeProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("light");

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEME[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
