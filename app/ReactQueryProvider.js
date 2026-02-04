"use client";
import { Providers } from "./Providers";

export default function ReactQueryProvider({ children }) {
  return <Providers>{children}</Providers>;
}
