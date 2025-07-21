import React, { useState } from "react";
import { ContextBuilder } from "../../../packages/react/lib/context-builder";

// Example: Simple Counter Context
function useCounter(props: { initialValue?: number } = {}) {
  const { initialValue = 0 } = props;
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

const [CounterProvider, useCounterContext] = ContextBuilder(useCounter, {
  name: "Counter",
});

function CounterDisplay() {
  const { count } = useCounterContext();
  return (
    <div className="text-2xl font-bold text-center p-4">Count: {count}</div>
  );
}

function CounterControls() {
  const { increment, decrement, reset } = useCounterContext();
  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={decrement}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        -1
      </button>
      <button
        onClick={reset}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Reset
      </button>
      <button
        onClick={increment}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        +1
      </button>
    </div>
  );
}

export function CounterExample() {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Counter Example</h2>
      <CounterProvider initialValue={5}>
        <div>
          <CounterDisplay />
          <CounterControls />
        </div>
      </CounterProvider>
    </div>
  );
}
