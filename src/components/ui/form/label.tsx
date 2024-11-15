"use client"
export interface FormLabelProps {
    text: string;
    htmlFor: string
}
export default function Label({
    text,
    htmlFor
}: FormLabelProps) {
    return (<label className="text-sm font-medium" htmlFor={htmlFor} >{text}</label>)
}