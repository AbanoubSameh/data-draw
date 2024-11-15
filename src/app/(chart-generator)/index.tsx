"use client"
import FileUpload from "@/components/ui/form/file-upload"
import ChartPreview from "./chart-preview"
import ChatHistory from "./chat-history/chat-history"
import { updateFile } from "@/lib/chart-generator"
import { FileDefinition } from "@/components/ui/form/file-upload/models"
import { useState } from "react"
import type { Spec } from "vega"
import MessageInputForm from "./message-input-form"



export interface ChartGeneratorProps {
    threadId: string
}
export default function ChartGenerator({ threadId }: ChartGeneratorProps) {

    const [messages, setMessages] = useState<string[]>([]);
    const [file, setFile] = useState<FileDefinition | null>(null);
    const [spec, setSpec] = useState<Spec | undefined>(undefined);

    const handleFileChange = (file: FileDefinition | null) => {
        setFile(file);
        updateFile(file, threadId);
    };

    const handleStateChange = ({ message, spec }: { spec: Spec, message: string }) => {
        setMessages([...messages, message].filter(Boolean));
        if (spec && spec?.data?.find(x => x.name === "MASTERDATA")) {
            (spec?.data.find(x => x.name === "MASTERDATA") as any)['values'] = file?.data;
            setSpec(spec);
        }
    };


    return <div className="p-4 flex flex-col grid-cols-2 h-full w-full items-center justify-center overflow-auto">
        <div className="w-full h-full flex flex-row gap-6">
            <div className="w-1/4 flex flex-col gap-4">
                <FileUpload fileChanged={handleFileChange} />
                <ChatHistory messages={messages} />
                <MessageInputForm threadId={threadId} stateUpdated={handleStateChange} />
            </div>
            <div className="w-3/4 flex justify-center items-center">
                <ChartPreview spec={spec} />
            </div>
        </div>
    </div>
}