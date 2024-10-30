import { AppBar, Toolbar, Typography } from "@mui/material";
// import dynamic from "next/dynamic";
// Dynamically import AppBar with SSR disabled
// const AppBar = dynamic(() => import("@mui/material/AppBar"), { ssr: false });
// const Toolbar = dynamic(() => import("@mui/material/Toolbar"), { ssr: false });
// const Typography = dynamic(() => import("@mui/material/Typography"), {
//   ssr: false,
// });

export default function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h4">Irecharge Hotel</Typography>
      </Toolbar>
    </AppBar>
  );
}
