import { schemaType } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";

export function useZodForm<T extends FieldValues>(
  props: UseFormProps<T> & { schema: schemaType }
) {
  return useForm<T>({
    ...props,
    resolver: zodResolver(props.schema),
  });
}
