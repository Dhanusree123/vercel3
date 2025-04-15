import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LOGIN_MUTATION } from "../graphql/login";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
type Auth = z.infer<typeof schema>;
export const AuthView = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: Auth) => {
    try {
      const response = await fetch("https://test-api.nine.deals/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: LOGIN_MUTATION,
          variables: {
            input: formData,
          },
        }),
      });

      const result = await response.json();
      const accessToken = result.data?.login?.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        const token = localStorage.getItem("accessToken");

        if (token) {
          navigate("/products");
        } else {
          toast.error("Invalid Credentials or AccessToken missing");
        }
      } else {
        navigate("/login");
        toast.error("failes to get accessToken");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                placeholder="Email"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default AuthView;
