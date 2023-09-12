import { render, screen } from "../testUtils/testUtils";
import { MyComponent } from "./MyComponent";

//An example of using react-testing-library
describe("MyComponent", async () => {
    test("Should have text Hello from My Component on it", () => {
        render(<MyComponent />);
        const elem = screen.getByText("Hello from My Component");
        expect(elem).toBeInTheDocument();
    });
});
