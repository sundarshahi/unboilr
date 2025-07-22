/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { ContextBuilderOptions } from "./types";

type InferProps<T> = T extends (props: infer P) => any ? P : never;
type InferReturn<T> = T extends (...args: any[]) => infer R ? R : never;

/**
 * Creates a React Context and Provider from a custom hook.
 * @param useHook - custom hook returning the context value
 * @param options - optional config (e.g. name for debugging and errors)
 */
export function ContextBuilder<Hook extends (...args: any[]) => any>(
  useHook: Hook,
  options?: ContextBuilderOptions
) {
  const name = options?.name ?? "Context";
  const Context = createContext<InferReturn<Hook> | null>(null) as React.Context<InferReturn<Hook> | null>;
  Context.displayName = `${name}Context`;

  type ProviderProps = InferProps<Hook> & { children: ReactNode };

  const Provider: React.FC<ProviderProps> = ({ children, ...props }) => {
    const value = useHook(props as InferProps<Hook>);
    const memo = useMemo(() => value, [value]);
    return React.createElement(Context.Provider, { value: memo }, children);
  };

  const useContextValue = (): InferReturn<Hook> => {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error(
        `[${name}Context] Missing <${name}Provider>. Please wrap your component tree with it.`
      );
    }
    return ctx;
  };

  return [Provider, useContextValue, Context] as const;
}
