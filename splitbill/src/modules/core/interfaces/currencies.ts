import { FieldErrors } from "react-hook-form";
import { Control } from "react-hook-form";
import { ICreateGroupForm } from "./createGroupForm";

interface CurrencyInputProps {
	errors: FieldErrors<ICreateGroupForm>;
	control: Control<ICreateGroupForm>;
}

interface SelectedCurrency {
	shortform: string;
	elaboration: string;
	dollarSign: string;
}

export type { CurrencyInputProps, SelectedCurrency };
