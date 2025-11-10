import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen, fireEvent } from "@testing-library/react";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            ></MovieEditor>,
        );
    });

    test("renders MovieEditor with initial movie data", () => {
        const title = screen.getByDisplayValue("The Test Movie");

        expect(title).toBeInTheDocument();
    });

    test("initial description is displayed", () => {
        const dateRel = screen.getByDisplayValue("A movie for testing");
        expect(dateRel).toBeInTheDocument();
    });

    test("cancel function is used", () => {
        fireEvent.click(screen.getByText(/cancel/i));
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });
});
