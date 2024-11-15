"use client"
import { ChangeEvent, } from "react";
import { Input } from "../input";
import Label from "../label";
import { FileDefinition } from "./models";

export interface FileUploadProps {
    fileChanged?: (file: FileDefinition | null) => void
}

export default function FileUpload({ fileChanged }: FileUploadProps) {
    const fileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file && fileChanged) {
            InputFileToFileDefinitionClient(file, fileChanged)
        }
    }
    return (
        <div className="grid gap-2">
            <Label text="Upload Data File" htmlFor="file" />
            <Input id="file" name="file" type="file" accept=".csv" onChange={fileChange} required />
        </div>
    )
}
const InputFileToFileDefinitionClient = (
    file: File,
    onLoad?: (file: FileDefinition | null) => void
): void => {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text: string = e.target?.result as string;
            if (text) {
                const [headers, ...rows]: string[][] = text
                    .split("\n")
                    .filter(Boolean)
                    .map((row) => row.split(",").map(stripQuotes)); // Strip quotes from each value

                if (headers && rows.length > 0) {
                    const data: Record<string, string | number>[] = rows.map((row) =>
                        headers.reduce(
                            (a, b: string, index) => ({
                                ...a,
                                [stripQuotes(b)]: isNaN(Number(row[index]))
                                    ? row[index]
                                    : Number(row[index]), // Convert to number if possible
                            }),
                            {}
                        )
                    );
                    const def: FileDefinition = {
                        data,
                        headers: headers.map(stripQuotes),
                        fileName: file.name,
                    };
                    if (onLoad) {
                        onLoad(def);
                    }
                }
            }
        };
        reader.readAsText(file);
    }
};


const stripQuotes = (str: string) => str.replace(/^"|"$/g, "");