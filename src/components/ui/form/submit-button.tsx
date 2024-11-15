"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";

interface SubmitButtonProps {
  label?: string;
  loadingLabel?: string;
}

export function SubmitButton({ label, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {" "}
      {pending ? loadingLabel ?? "...Loading" : label ?? "Submit"}
    </Button>
  );
}
