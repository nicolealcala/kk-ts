import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AnimatePresence, motion, type Variants } from "motion/react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthTabs from "./AuthTabs";
import { useAppSelector } from "@/store/hooks";

export default function Form() {
  const formType = useAppSelector((state) => state.auth.formType);

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    }),
  };

  const direction = formType === "login" ? -1 : 1;

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" align="center" fontWeight="bold">
        {formType === "login" ? "Welcome Back" : "Create an Account"}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" mt={1}>
        The smarter way to track your career, no formulas required.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2, mb: 3 }}>
        <AuthTabs />
      </Box>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={formType}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{ width: "100%", position: "relative" }}
        >
          {formType === "login" ? <LoginForm /> : <SignupForm />}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
