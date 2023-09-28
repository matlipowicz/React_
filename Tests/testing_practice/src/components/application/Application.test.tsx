import { screen, render } from "@testing-library/react";
import { Application } from "./Application";

describe("Application query getBy methods", () => {
    it("renders correclty", () => {
        render(<Application />);
        //! getByRole
        const nameElement = screen.getByRole("textbox", {
            name: "Name",
        });
        expect(nameElement).toBeInTheDocument();

        const bioElement = screen.getByRole("textbox", {
            name: "Bio",
        });
        expect(bioElement).toBeInTheDocument();

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toBeInTheDocument();

        const checkboxElement = screen.getByRole("checkbox");
        expect(checkboxElement).toBeInTheDocument();

        const buttonElement = screen.getByRole("button", {
            name: "Submit",
        });
        expect(buttonElement).toBeInTheDocument();

        const headingJob = screen.getByRole("heading", {
            name: "Job application form",
            level: 1,
        });
        expect(headingJob).toBeInTheDocument();

        const headingSecrion = screen.getByRole("heading", {
            name: "Section 1",
            level: 2,
        });
        expect(headingSecrion).toBeInTheDocument();

        //! getByLabelText
        const nameLabelText = screen.getByLabelText("Name", { selector: "input" });

        expect(nameLabelText).toBeInTheDocument();

        const termsInputElement = screen.getByLabelText("I agree to the terms and conditions");

        expect(termsInputElement).toBeInTheDocument();

        //! getByPlaceholderText
        const placeHolderTextMethod = screen.getByPlaceholderText("Fullname");

        expect(placeHolderTextMethod).toBeInTheDocument();

        //! getByText

        const textMethod = screen.getByText(/all fields are mandatory/i);

        expect(textMethod).toBeInTheDocument();

        //! getByDisplayValue

        const valueDisplayMethod = screen.getByDisplayValue("Mateusz");

        expect(valueDisplayMethod).toBeInTheDocument();

        //! getByAltText

        const altTextMethod = screen.getByAltText("a person with a laptop");

        expect(altTextMethod).toBeInTheDocument();

        //! getByTitle

        const titleMethod = screen.getByTitle("close");

        expect(titleMethod).toBeInTheDocument();

        //! getByTestId

        const testIdMethod = screen.getByTestId("custom-element");

        expect(testIdMethod).toBeInTheDocument();
    });
});

/* 
* getByRole --> pobieranie elementu / node'a z struktury przy pomocy roli tych elementów (https://www.w3.org/TR/html-aria/#docconformance)

    Rola textbox jest przydzielona dla inputa i textarea co wyrzuci nam error. Rozwiązaniem na to jest użycie atrybutu name jako drugi argument metodzie getByRole.

    Pozostałe opcje to:
        - level (headingi)
        - hidden
        - busy
        - description
        - selected,
        - checked,
        - pressed
        - suggest
        - current
        - expanded
        - queryFallbacks
        -value: {
            - min
            - max
            - now
            - text
        }

* getByLabelText  --> pobiera element / node który matchuje text w nim przekazany z etykietą


* getByPlaceholderText --> to zapytanie będzie szukało elementu z atrybutem placeholder i dopasowywało z przekazanym tekstem w tej metodzie


* getByText - pobiera element z tekstem czyli textContent w danym, elemencie, który został przekazany do tej metody


* getByDisplayValue - zwraca input, select, czy textarea, które posiadają atrybut value i po tej wartości dopasowywują


* getByAltText - zwraca element, zazwyczaj <img> z atrybutem tekstu alternatywnego "alt"

* getByTitle - zwraca element w którym znajduje się atrubut title, w którym przechowywane jest dodatkowe info o elemencie. Wykorzystywane do tooltipoów

* getByTestId - pozwala na wyszukiwanie elementów po data-attributes (rekomendowane jest unikanie wykonywania tego typu zapytań, ze wzgledu na to, że nie odzwierciedla tego jak software jest używany, UŻYWAĆ TYLKO W MOMENCIE, GDY NIC INNEGO NIE ZŁAPIE ELEMNTU)

*/
