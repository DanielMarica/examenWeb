import { useState, SyntheticEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BookContext } from "../../type";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PageTitle from "../PageTitle";

const LoginPage = () => {
  const { loginUser, authenticatedUser, clearUser }: BookContext = useOutletContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      navigate("/");
    } catch (err) {
      console.error("LoginPage::error: ", err);
    }
  };

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  if (authenticatedUser) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PageTitle title={`Bienvenue, vous êtes connecté ${authenticatedUser.username}`} />
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ mt: 3 }}
          >
            Se déconnecter
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;