import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AppProviders } from "../providers/AppProviders";

export const CustomRender = ({ children }: { children: React.ReactNode }) => {
    return <AppProviders>{children}</AppProviders>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper: CustomRender, ...options });

export * from "@testing-library/react";
export { customRender as render };
