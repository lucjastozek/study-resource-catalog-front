import { useToast, ToastPosition } from "@chakra-ui/react";

function useCustomToast() {
    const toast = useToast();

    const showToast = (
        status:
            | "info"
            | "warning"
            | "success"
            | "error"
            | "loading"
            | undefined,
        description: string
    ) => {
        const toastOptions = {
            position: "top" as ToastPosition,
            title: `${status
                ?.charAt(0)
                .toUpperCase()
                .concat(status?.slice(1))}!`,
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
