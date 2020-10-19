import { useTheme } from "next-themes";
import { MDBIcon } from "mdbreact";
import { useMounted } from "./mounted";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  return (
    <div className="nav-link">
      {isMounted && theme === "light" ? (
        <div onClick={() => setTheme("dark")}>
          <MDBIcon
            icon="moon"
            onClick={() => setTheme("dark")}
            className="mr-1 dark-grey-text"
          />
          Dark Mode
        </div>
      ) : (
        <div onClick={() => setTheme("light")}>
          <MDBIcon
            icon="sun"
            style={{ color: "yellow" }}
            size="lg"
            className="mr-1"
          />
          Light Mode
        </div>
      )}
    </div>
  );
};
