import { MuiMode } from "./MuiMode";
import { AppProviders } from "../../providers/AppProviders";
import { render, screen } from "../../utils/custom-render";

describe("Mui", () => {
    it("Renders theme mode correctly", () => {
        render(<MuiMode />);
        const themeHeadingElement = screen.getByRole("heading", {
            level: 1,
        });

        expect(themeHeadingElement).toHaveTextContent("dark mode");
    });
});
