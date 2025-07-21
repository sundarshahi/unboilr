import type { ReactNode, FC, Context } from "react";

export interface ContextBuilderOptions {
  name?: string;
}

export type ContextBuilderReturn<T = unknown> = readonly [
  FC<T & { children: ReactNode }>,
  () => T,
  Context<T | null>
];
