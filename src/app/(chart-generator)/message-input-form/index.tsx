"use client"
import { SubmitButton } from "@/components/ui/form/submit-button";
import { Textarea } from "@/components/ui/form/textarea";
import { submitUserInput } from "@/lib/chart-generator/actions";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Spec } from "vega";

export interface MessageInputFormProps {
    threadId: string,
    stateUpdated: ({ spec, message }: { spec: Spec, message: string }) => void
}

export default function MessageInputForm({ threadId, stateUpdated }: MessageInputFormProps) {
    const { pending } = useFormStatus();
    const [formState, action] = useFormState(submitUserInput, {});
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (stateUpdated) {
            stateUpdated({ spec: formState.result as Spec, message });
            setMessage('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState]);

    return (
        <form
            action={action}
            className=" flex flex-col gap-3">
            {pending}
            <div className="flex-grow flex flex-col gap-3">
                <div className="grid gap-2">
                    <input
                        type="hidden"
                        name="threadId"
                        value={threadId}
                    />
                    <Textarea placeholder="Describe how the chart should look like"
                        name="userInput"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="prompt-textarea w-full border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 block text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="userInput" />
                </div>
            </div>
            <span className="text-xs text-red-400">{formState?.error}</span>
            <SubmitButton />
        </form>

    )
}


