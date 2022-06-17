import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${apiUrl}/movie`, opts)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async (newUser) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch(`${apiUrl}/user/register`, opts)
      .then((res) => res.json())
      .then((createdUser) => console.log(createdUser));
  };

  const handleLogin = async (loginUser) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    };
    fetch(`${apiUrl}/user/login`, opts)
      .then((res) => res.json())
      .then((token) => {
        console.log("hi from handleLogin");
        localStorage.setItem("token", token.data);
      });
  };

  const handleCreateMovie = async (movie) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    };
    fetch(`${apiUrl}/movie`, opts)
      .then((res) => res.json())
      .then((createdMovie) => {
        setMovies([...movies, createdMovie.data]);
      });
  };

  // const getMovies = async (token) => {
  //   const opts = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   fetch(`${apiUrl}/movie`)
  //     .then((res) => res.json())
  //     .then((movies) => setMovies(movies.data));
  // };

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
