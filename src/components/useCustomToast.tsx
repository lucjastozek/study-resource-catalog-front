import { useToast, ToastPosition } from "@chakra-ui/react";

function useCustomToast() {
    const toast = useToast();

    function showToast(
        status:
            | "info"
            | "warning"
            | "success"
            | "error"
            | "loading"
            | undefined,
        description: string,
        pos = "top"
    ) {
        const toastOptions = {
            position: pos as ToastPosition,
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
    }

    return showToast;
}

export default useCustomToast;
