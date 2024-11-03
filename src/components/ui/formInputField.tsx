import { Controller, UseFormReturn } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { formSchema } from "@/types";
import { z } from "zod";

type FormValues = z.infer<typeof formSchema>;

interface FormFieldProps {
  form: UseFormReturn<FormValues>;
  name: keyof FormValues;
  label: string;
  placeholder: string;
}

const FormInputField: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  placeholder,
}) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputField;
