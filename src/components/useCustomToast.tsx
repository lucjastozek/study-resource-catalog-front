import { useToast, ToastPosition } from "@chakra-ui/react";

function useCustomToast() {
    const toast = useToast();

    const showToast = (
        title: string,
        description: string,
        status: "info" | "warning" | "success" | "error" | "loading" | undefined
    ) => {
        const toastOptions = {
            position: "top" as ToastPosition, // Default position
            title: title,
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
        };

        toast(toastOptions);
    };

    return showToast;
}

export default useCustomToast;
