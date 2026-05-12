"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FormFieldItems } from "@/common/form-elements/types";

type FormRenderProps<T extends FieldValues> = {
  fields: FormFieldItems<string>[];
  control: Control<T>;
  gridClassName?: string;
};

export function FormRender<T extends FieldValues>({
  fields,
  control,
  gridClassName,
}: FormRenderProps<T>) {
  return (
    <div className={cn("grid grid-cols-12 gap-4", gridClassName)}>
      {fields.map((item) => (
        <Controller
          key={item.name}
          control={control}
          name={item.name as Path<T>}
          render={({ field, fieldState }) => {
            const inputId = item.checkBoxId ?? item.name;
            const col = item.gridcolumnclass ?? "col-span-12";

            if (item.type === "checkbox") {
              return (
                <div className={cn(col, "flex flex-col gap-2")}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={inputId}
                      checked={Boolean(field.value)}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                    {item.checkBoxLabel ? (
                      <Label
                        htmlFor={inputId}
                        className="cursor-pointer font-normal text-foreground"
                      >
                        {item.checkBoxLabel}
                      </Label>
                    ) : null}
                  </div>
                  {fieldState.error?.message ? (
                    <p className="text-sm text-destructive" role="alert">
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </div>
              );
            }

            const inputType =
              item.type === "inputEmail"
                ? "email"
                : item.type === "inputPassword"
                  ? "password"
                  : "text";

            return (
              <div className={cn(col, "flex flex-col gap-2")}>
                {item.label ? (
                  <Label htmlFor={inputId}>{item.label}</Label>
                ) : null}
                <Input
                  id={inputId}
                  type={inputType}
                  placeholder={item.placeholder}
                  autoComplete={
                    item.name === "email"
                      ? "email"
                      : item.name === "password"
                        ? "new-password"
                        : item.name === "firstName"
                          ? "given-name"
                          : item.name === "lastName"
                            ? "family-name"
                            : "off"
                  }
                  aria-invalid={Boolean(fieldState.error)}
                  className="h-10"
                  {...field}
                  value={field.value ?? ""}
                />
                {fieldState.error?.message ? (
                  <p className="text-sm text-destructive" role="alert">
                    {fieldState.error.message}
                  </p>
                ) : null}
              </div>
            );
          }}
        />
      ))}
    </div>
  );
}
