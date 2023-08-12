import { Button } from "@mui/material";
import React from "react";

export function OptionButton({ title }: { title: string }) {
	return <Button fullWidth>{title}</Button>;
}
