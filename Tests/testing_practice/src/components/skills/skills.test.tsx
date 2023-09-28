import { screen, render } from "@testing-library/react";
import { Skills } from "./skills";

//! Querying multiple elements - list elements

describe("Skills", () => {
    const skillsArr = ["HTML", "CSS", "JavaScript", "TypeScript", "React"];
    it("List renders in UI", () => {
        render(<Skills skills={skillsArr} />);
        const skillsList = screen.getByRole("list");
        expect(skillsList).toBeInTheDocument();
    });

    //! getAllBy...
    it("List skills listed correctly", () => {
        render(<Skills skills={skillsArr} />);
        const skillsListElements = screen.getAllByRole("listitem");
        //* Tutaj zamiast hardkodowanej liczby lepiej użyć metody length z tablic, w razie zwiększenia elementów tablicy zapobiec wykrzaczeniu się testu
        expect(skillsListElements).toHaveLength(skillsArr.length);
    });

    //! queryBy...
    it("Login button renders", () => {
        render(<Skills skills={skillsArr} />);
        const loginButtonElement = screen.getByRole("button", {
            name: "Login",
        });
        expect(loginButtonElement).toBeInTheDocument();
    });

    it("Learn with it button renders", () => {
        render(<Skills skills={skillsArr} />);
        const learButtonElement = screen.queryByRole("button", {
            name: "Learn with us",
        });
        expect(learButtonElement).not.toBeInTheDocument();
    });

    //! findBy..

    it("Learn with us async button", async () => {
        render(<Skills skills={skillsArr} />);
        const learnAsyncButtonElement = await screen.findByRole(
            "button",
            {
                name: "Learn with us",
            },
            {
                timeout: 1500,
            }
        );
        expect(learnAsyncButtonElement).toBeInTheDocument();
    });
});
