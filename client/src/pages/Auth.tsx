import Form from "@/components/auth/Form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AuthPage() {
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        minHeight: "100dvh",
        width: "100%",
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "white",
            fontWeight: "bold",
            position: "relative",
            zIndex: 10,
          }}
        >
          Kareer Kit
        </Typography>
        <img
          src="https://images.pexels.com/photos/4050332/pexels-photo-4050332.jpeg"
          alt="Photo by Vlada Karpovich: https://www.pexels.com/photo/young-barefoot-woman-using-laptop-on-floor-in-living-room-4050332/"
          className="absolute top-0 left-0 size-full object-cover"
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            bgcolor: "rgba(0,0,0,0.15)",
          }}
        />
      </Box>
      <Box sx={{ flex: 1.5, display: "flex", pt: 8.5, pb: 6 }}>
        <Form />
      </Box>
    </Box>
  );
}
