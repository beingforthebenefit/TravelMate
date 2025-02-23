"use client";

import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

// Mock next/navigation's useRouter
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe("NavBar", () => {
    beforeEach(() => {
        // Clear localStorage before each test.
        localStorage.clear();
    });

    it("renders the logo, user profile, and logout button", () => {
        render(<NavBar />);
        const logo = screen.getByAltText("TravelMate Logo");
        expect(logo).toBeInTheDocument();
        const logoutButton = screen.getByRole("button", { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();
        const welcomeText = screen.getByText(/welcome, test user/i);
        expect(welcomeText).toBeInTheDocument();
    });

    it("clears token and redirects on logout", () => {
        localStorage.setItem("token", "dummyToken");
        render(<NavBar />);
        const logoutButton = screen.getByRole("button", { name: /logout/i });
        fireEvent.click(logoutButton);
        expect(localStorage.getItem("token")).toBeNull();
        expect(pushMock).toHaveBeenCalledWith("/auth/login");
    });
});
