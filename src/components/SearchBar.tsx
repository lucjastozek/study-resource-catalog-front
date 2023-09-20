import { SearchIcon } from "@chakra-ui/icons";
import {
    Center,
    Input,
    InputGroup,
    InputLeftElement,
    useColorMode,
} from "@chakra-ui/react";

interface SearchBarProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchBar({
    searchInput,
    setSearchInput,
}: SearchBarProps): JSX.Element {
    const { colorMode } = useColorMode();

    const placeholderColor = colorMode === "dark" ? "white" : "black";

    return (
        <Center marginInline={"auto"}>
            <InputGroup marginInline={"auto"}>
                <InputLeftElement
                    pointerEvents="none"
                    style={{ transform: "translateY(11px)" }}
                >
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    id="search-bar"
                    mt={3}
                    onChange={(e) => setSearchInput(e.target.value)}
                    width={{ base: "100%", lg: "20vw" }}
                    value={searchInput}
                    placeholder="Find resources..."
                    _placeholder={{ color: placeholderColor }}
                ></Input>
            </InputGroup>
        </Center>
    );
}
