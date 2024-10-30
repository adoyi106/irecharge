import { Container } from "@mui/material";
import Header from "./_components/Header";
import HotelDashboard from "./_components/HotelDashboard";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  console.log(searchParams);
  // const filter: string | string[] = searchParams?.category ?? "all";
  const filter: string = Array.isArray(searchParams?.category)
    ? searchParams.category[0]
    : searchParams.category ?? "all";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Container
        sx={{
          paddingTop: "1rem",
        }}
      >
        <HotelDashboard filter={filter} />
      </Container>
    </div>
  );
}
