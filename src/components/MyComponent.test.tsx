import { render, screen } from "../testUtils/testUtils";
import { MyComponent } from "./MyComponent";

//An example of using react-testing-library
describe("MyComponent", async () => {
    test("Should have text That's a study resource catalog! on it", () => {
        render(<MyComponent />);
        const elem = screen.getByText("That's a study resource catalog!");
        expect(elem).toBeInTheDocument();
    });
});
