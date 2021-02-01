import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";

export const Separator = ({ desktop }: { desktop?: boolean }) => {
  const style = {
    dark: {
      borderColor: "#616161",
    },
  };
  const { theme } = useTheme();
  const isMounted = useMounted();
  return (
    <hr
      className={desktop ? "my-4 " : "block md:hidden my-5 "}
      style={isMounted && theme === "light" ? null : style.dark}
    />
  );
};
