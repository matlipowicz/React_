import { render, screen, waitFor } from "@testing-library/react";
import { Counter } from "./Counter";
import { userEvent } from "@testing-library/user-event";

describe("Counter", () => {
    it("renders correctly", () => {
        render(<Counter />);
        const counterHeading = screen.getByRole("heading", {
            level: 1,
            name: "0",
        });

        expect(counterHeading).toBeInTheDocument();
    });

    it("renders 0 as default value", () => {
        render(<Counter />);
        const counterHeading = screen.getByRole("heading", {
            level: 1,
            name: "0",
        });

        expect(counterHeading).toHaveTextContent("0");
    });

    it("button renders correctly", () => {
        render(<Counter />);
        const incrementBtn = screen.getByRole("button", {
            name: "Increment",
        });
        expect(incrementBtn).toBeInTheDocument();
    });

    it("increments counter by 1", async () => {
        const user = userEvent.setup();

        render(<Counter />);
        const incrementBtn = screen.getByRole("button", {
            name: "Increment",
        });

        await user.click(incrementBtn);
        const counterHeading = screen.getByRole("heading", {
            level: 1,
        });

        await waitFor(() => {
            expect(counterHeading).toHaveTextContent("1");
        });
    });

    it("user clicks twice, and counter is equal 2", async () => {
        const user = userEvent.setup();

        render(<Counter />);
        const incrementBtn = screen.getByRole("button", {
            name: "Increment",
        });

        await user.dblClick(incrementBtn);

        const counterHeading = screen.getByRole("heading", {
            level: 1,
        });

        await waitFor(() => {
            expect(counterHeading).toHaveTextContent("2");
        });
    });

    it("Renders number 10 entered in input field, and after clicking set button", async () => {
        const user = userEvent.setup();
        render(<Counter />);
        const counterHeading = screen.getByRole("heading");
        expect(counterHeading).toHaveTextContent("0");
        const setInput = screen.getByRole("spinbutton");
        const setButton = screen.getByRole("button", {
            name: "Set",
        });
        await user.type(setInput, "10");
        expect(setInput).toHaveValue(10);
        await user.click(setButton);
        expect(counterHeading).toHaveTextContent("10");
    });

    it("Have the elements focus in correct order", async () => {
        const user = userEvent.setup();
        render(<Counter />);
        const incrementButton = screen.getByRole("button", {
            name: "Increment",
        });
        const setInput = screen.getByRole("spinbutton");
        const setButton = screen.getByRole("button", {
            name: "Set",
        });

        await user.tab();
        expect(incrementButton).toHaveFocus();
        await user.tab();
        expect(setInput).toHaveFocus();
        await user.tab();
        expect(setButton).toHaveFocus();
    });
});
