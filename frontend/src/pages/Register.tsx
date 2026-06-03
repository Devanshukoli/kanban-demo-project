import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "@/api/auth.api";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data =
        await registerUser({
          name,
          email,
          password,
        });

      login(
        data.token,
        data.user
      );

      navigate("/");
    } catch (error: any) {
      console.log(error.response?.data);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Name"
      />

      <input
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        placeholder="Password"
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;