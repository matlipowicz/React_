import { render, screen } from "@testing-library/react";
import { Greet } from "./Greet";

describe("Greet testing", () => {
    test("renders correctly", () => {
        render(<Greet />);
        const GreetComponent = screen.getByText("Hello");
        expect(GreetComponent).toBeInTheDocument();
    });

    test("renders greeting user", () => {
        render(<Greet name="Mateusz" />);
        const GreetUserComponent = screen.getByText("Hello Mateusz");
        expect(GreetUserComponent).toBeInTheDocument();
    });
});
