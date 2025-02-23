"use client";

import { render, screen } from "@testing-library/react";
import NavBar from "@/components/NavBar";
import "@testing-library/jest-dom";

describe("NavBar", () => {
    it("renders the logo and user settings button", () => {
        render(<NavBar />);
        // Check for logo by its alt text
        const logo = screen.getByAltText("TravelMate Logo");
        expect(logo).toBeInTheDocument();
        // Check for the User Settings button
        const settingsButton = screen.getByRole("button", { name: /user settings/i });
        expect(settingsButton).toBeInTheDocument();
    });
});
