# @unboilr/react

> ✨ A zero-boilerplate utility to build strongly-typed, composable React context using the Factory Pattern — the right way.

---

## 📦 Installation

```bash
npm install @unboilr/react
# or
yarn add @unboilr/react
# or
pnpm add @unboilr/react
```

## ⚒️ Why @unboilr/react?

React Context is powerful, but often:

    🧱 Boilerplate-heavy

    🧩 Prone to misuse (e.g., missing provider)

    🔁 Repetitive (for every new context)

    😕 Lacks clear type safety

This library solves all that using a single factory function: ontextBuilder.

## ✅ Features

    🧠 Fully typed return values and hook usage

    🚫 Throws helpful error when hook used outside its provider

    🔧 Support for props/config on Provider

    🧪 Test-friendly with simple wrappers

    ⚛️ Compatible with React 18/19

## 🚀 Usage
### Create Theme Context
```tsx 
// theme-context.tsx
import { ContextBuilder } from '@unboilr/react';
import { useState } from 'react';

const useThemeContext = ({ initial = 'light' } = {}) => {
  const [theme, setTheme] = useState(initial);
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return { theme, toggleTheme };
};

export const [ThemeProvider, useTheme] = ContextBuilder(useThemeContext);

```
### Wrap App with Provider
```tsx
// App.tsx
import { ThemeProvider } from './theme-context';

export default function App() {
  return (
    <ThemeProvider initial="dark">
      <YourRoutes />
    </ThemeProvider>
  );
}
```
### Consume the Theme Context
```tsx
// ThemeSwitcher.tsx
import { useTheme } from './theme-context';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current: {theme}</button>;
};
```
### 🔐 Auth Context Example
```tsx
// auth-context.tsx
import { contextBuilder } from '@unboilr/react';
import { useState } from 'react';

const useAuthContext = () => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const login = (u: { id: string; name: string }) => setUser(u);
  const logout = () => setUser(null);
  return { user, login, logout, isAuthenticated: !!user };
};

export const [AuthProvider, useAuth] = contextBuilder(useAuthContext);

```
### Usage in App
```tsx
<AuthProvider>
  <YourApp />
</AuthProvider>

```
### Consume Auth Context
```tsx
import { useAuth } from './auth-context';

export const Profile = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      Hello, {user?.name}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

```
## 🧪 Testing with Mocked Context
```tsx
// test-utils.tsx
import { AuthProvider } from './auth-context';
import { ThemeProvider } from './theme-context';
import { render } from '@testing-library/react';

export const renderWithAuth = (ui: React.ReactNode, { user = { id: '123', name: 'Test User' } } = {}) =>
  render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );

export const renderWithTheme = (ui: React.ReactNode, initial = 'dark') =>
  render(
    <ThemeProvider initial={initial}>
      {ui}
    </ThemeProvider>
  );

```
### Example Test
```tsx
import { renderWithAuth } from './test-utils';
import { Dashboard } from '../Dashboard';

test('displays user name if logged in', () => {
  const { getByText } = renderWithAuth(<Dashboard />);
  expect(getByText(/Test User/)).toBeInTheDocument();
});

```


## 🧠 API
```tsx
function ContextBuilder<TProps, TValue>(
  useValue: (props: TProps) => TValue
): [Provider: React.FC<TProps>, useHook: () => TValue]
```

  - useValue: your hook logic

  - Provider: wraps children and provides context

  - useHook: safe typed hook to consume it
    

## 🤝 Contributing

```bash
git clone https://github.com/sundarshahi/unboilr/react
cd unboilr/packages/react
pnpm install
```

We welcome contributions: bug fixes, docs, examples, etc.

## 📄 License

MIT © Sundar Shahi Thakuri