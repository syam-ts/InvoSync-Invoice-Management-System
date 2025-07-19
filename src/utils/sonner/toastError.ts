import { toast } from "sonner";

export const toastError = (message: string) => {
  return toast.error(message, {
    position: "top-center",
    style: {
      backgroundColor: "#1e293b",
      color: "white",
      width: "full",
      height: "3rem",
      border: "1px dotted #111827",
      textAlign: "center",
      justifyContent: "center",
    },
  });
};
