import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";

export const HorizontalLine = ({ desktop }) => {
  const style = {
    dark: {
      borderColor: "#616161",
    },
  };
  const { theme } = useTheme();
  const isMounted = useMounted();
  return (
    <hr
      className={desktop ? "my-4 " : "d-md-none d-lg-none my-5 "}
      style={isMounted && theme === "light" ? null : style.dark}
    />
  );
};
