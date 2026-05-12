"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormRender } from "@/common/form-elements/FormRender";
import {
  signupFormSchema,
  signupItems,
  type SignupFormValues,
} from "@/common/form-elements/signup-items";
import { useSignupMutation } from "@/redux/services/authApi";
import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { setPendingApproval } from "@/redux/slices/authSlice";

export type SignupFormProps = {
  /**
   * Submitted as `propertyOwner`. Sign up (users only) uses `false`; “Register your property” uses `true`.
   * When `includePropertyOwnerField` is false, only this value is sent (no checkbox).
   */
  initialPropertyOwner?: boolean;
  /**
   * When true, shows the “I am a property owner” checkbox. Both dialogs currently hide it and rely on `initialPropertyOwner`.
   */
  includePropertyOwnerField?: boolean;
  onSuccess?: (values: SignupFormValues) => void;
};

export default function SignupForm({
  initialPropertyOwner = false,
  includePropertyOwnerField = false,
  onSuccess,
}: SignupFormProps) {
  const { login } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const [showApprovalMessage, setShowApprovalMessage] = React.useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      propertyOwner: initialPropertyOwner,
    },
  });

  useEffect(() => {
    if (!includePropertyOwnerField) {
      form.setValue("propertyOwner", Boolean(initialPropertyOwner), {
        shouldValidate: true,
        shouldDirty: false,
      });
    }
  }, [form, includePropertyOwnerField, initialPropertyOwner]);

  const onSubmit = async (values: SignupFormValues) => {
    form.clearErrors("root");
    try {
      const tokens = await signup(values).unwrap();
      if (values.propertyOwner) {
        dispatch(setPendingApproval(true));
        setShowApprovalMessage(true);
        // Don't login or redirect for property owners
      } else {
        login(tokens.accessToken, tokens.refreshToken);
        onSuccess?.(values);
        router.replace("/dashboard");
      }
    } catch (error: unknown) {
      let message = "Sign up failed. Please try again.";
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: { message?: unknown } }).data !== null
      ) {
        const msg = (error as { data: { message?: unknown } }).data.message;
        if (typeof msg === "string") message = msg;
      }
      form.setError("root", { message });
    }
  };

  const formConfig = {
    fields: signupItems({ includePropertyOwnerField }),
    control: form.control,
    gridClassName: "grid grid-cols-12 gap-4",
  };

  return (
    <Form {...form}>
      {showApprovalMessage ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Your account has been created successfully. Please wait for approval before accessing the dashboard.
          </p>
          <Button onClick={() => setShowApprovalMessage(false)} variant="outline">
            Close
          </Button>
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormRender<SignupFormValues> {...formConfig} />

          {form.formState.errors.root?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          <Button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign up
              </>
            )}
          </Button>
        </form>
      )}
    </Form>
  );
}
