import { z } from "zod";
import type { SignupRequest } from "@/types/signup";
import type { FormFieldItems } from "@/common/form-elements/types";

export const signupFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (val) => [...val].some((c) => c >= "A" && c <= "Z"),
      "Password must contain at least one uppercase letter",
    )
    .refine(
      (val) => [...val].some((c) => c >= "a" && c <= "z"),
      "Password must contain at least one lowercase letter",
    )
    .refine(
      (val) => [...val].some((c) => c >= "0" && c <= "9"),
      "Password must contain at least one number",
    )
    .refine(
      (val) =>
        [...val].some(
          (c) =>
            !(c >= "A" && c <= "Z") &&
            !(c >= "a" && c <= "z") &&
            !(c >= "0" && c <= "9"),
        ),
      "Password must contain at least one special character",
    ),

  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  propertyOwner: z.boolean(),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export function signupItems(options?: {
  includePropertyOwnerField?: boolean;
}): FormFieldItems<keyof SignupRequest>[] {
  const includePropertyOwnerField = options?.includePropertyOwnerField ?? false;

  const base: FormFieldItems<keyof SignupRequest>[] = [
    {
      name: "firstName",
      type: "inputText",
      label: "First Name",
      placeholder: "John",
      gridcolumnclass: "col-span-6",
    },
    {
      name: "lastName",
      type: "inputText",
      label: "Last Name",
      placeholder: "Doe",
      gridcolumnclass: "col-span-6",
    },
    {
      name: "email",
      type: "inputEmail",
      label: "Email Address",
      placeholder: "user@example.com",
      gridcolumnclass: "col-span-12",
    },
    {
      name: "password",
      type: "inputPassword",
      label: "Password",
      placeholder: "Min 8 chars, upper, lower, number, special",
      gridcolumnclass: "col-span-12",
    },
  ];

  if (includePropertyOwnerField) {
    base.push({
      name: "propertyOwner",
      type: "checkbox",
      checkBoxLabel: "I am a property owner",
      checkBoxId: "propertyOwner",
      defaultChecked: false,
      gridcolumnclass: "col-span-12",
    });
  }

  return base;
}
