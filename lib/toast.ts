import { toast } from "sonner";

export const toastSuccess = (title: string, description?: string) =>
	toast.success(title, { description });

export const toastError = (title: string, description?: string) =>
	toast.error(title, { description });

export const toastInfo = (title: string, description?: string) =>
	toast(title, { description });
