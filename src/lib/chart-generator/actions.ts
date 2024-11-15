"use server";

import { FormActionState } from "@/lib/shared/form-action-base";
import { revalidatePath } from "next/cache";
import { Spec } from "vega";
import { addUserMessage } from ".";

export const submitUserInput = async (
  _formState: FormActionState<Spec>,
  formData: FormData
): Promise<FormActionState<Spec>> => {
  const userInput = formData.get("userInput") as string;
  const threadId = formData.get("threadId") as string;

  if (!userInput) {
    return {
      error:
        "please upload a valid CSV file and write how the chart should look like",
    };
  }

  try {
    const result = await addUserMessage(threadId, userInput);
    revalidatePath("/");

    return {
      result: result?.spec,
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to generate chart, please try again later",
    };
  }
};
