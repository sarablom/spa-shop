import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
    it("renders without crashing", () => {
        render(<Footer />);
    })

    it("contains text 'Stillsamhetens SPA'", () => {
        render(<Footer />);
        const text = screen.getByText("Stillsamhetens SPA");
        expect(text).toBeInTheDocument();
    })
})