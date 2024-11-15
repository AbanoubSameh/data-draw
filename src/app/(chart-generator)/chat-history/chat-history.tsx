
export interface ChatHistoryProps {
    messages: string[];

}
export default function ChatHistory({ messages }: ChatHistoryProps) {

    return <div className="flex w-full gap-5 overflow-auto flex-grow flex-col items-start">
        {messages.length ?
            messages.map((x, index) => (<div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-xs shadow-md" key={index}>{x}</div>)) :
            <div className="bg-card align-center text-xs opacity-40 m-auto justify-center text-card-foreground shadow flex-grow p-4 w-full h-full flex items-center">
                Make sure you have uploaded a valid csv and write your requirement to build the chart based on the input data
            </div>
        }
    </div>

}