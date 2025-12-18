"use client";

import { Provider } from "react-redux";

// Check if store is correctly imported
import { store } from "@/store";

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
}
