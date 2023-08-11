import { Grid } from "@mui/material";
import React from "react";
import { useIsDesktop } from "../../hooks";
import { Header } from "../Header/Header";
import { LayoutContainer, LayoutGrid } from "./styles";

export function Layout({ children }: { children: React.ReactNode }) {
	const isDesktop = useIsDesktop();

	return (
		<LayoutContainer
			disableGutters={!isDesktop}
			sx={{
				paddingLeft: { xs: 0, sm: 0, md: 2, lg: 6 },
				paddingRight: { xs: 0, sm: 0, md: 2, lg: 6 },
			}}
		>
			<LayoutGrid container direction="column" spacing={!isDesktop ? 0 : 1}>
				<Grid item xs={1} sx={{ background: "limegreen" }}>
					<Header />
				</Grid>
				<Grid item xs={11}>
					{children}
				</Grid>
			</LayoutGrid>
		</LayoutContainer>
	);
}
