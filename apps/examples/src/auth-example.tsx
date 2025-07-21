import React, { useState } from "react";

import { ContextBuilder } from "../../../packages/react/lib/context-builder";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Example: Auth Context with async operations
function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user: User = {
      id: "1",
      name: "John Doe",
      email,
    };

    setState({ user, isLoading: false, isAuthenticated: true });
  };

  const logout = () => {
    setState({ user: null, isLoading: false, isAuthenticated: false });
  };

  return { ...state, login, logout };
}

const [AuthProvider, useAuthContext] = ContextBuilder(useAuth, {
  name: "Auth",
});

function LoginForm() {
  const { login, isLoading } = useAuthContext();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials.email, credentials.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

function UserProfile() {
  const { user, logout } = useAuthContext();

  return (
    <div className="text-center space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Welcome, {user?.name}!</h3>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

function AuthContent() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return isAuthenticated ? <UserProfile /> : <LoginForm />;
}

export function AuthExample() {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Auth Example</h2>
      <AuthProvider>
        <AuthContent />
      </AuthProvider>
    </div>
  );
}
