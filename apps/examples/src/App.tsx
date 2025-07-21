import { CounterExample } from "./counter-example";
import { AuthExample } from "./auth-example";

function App() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <CounterExample />
      <AuthExample />
    </div>
  );
}

export default App;
