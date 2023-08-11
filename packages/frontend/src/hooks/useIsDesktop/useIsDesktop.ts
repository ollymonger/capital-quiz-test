import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsDesktop() {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.up("md")); // Checks to see if the material UI theme currently in use is less than "medium" screen size.
}
