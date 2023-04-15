
import React, { useState } from "react";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<String>("");
    const [numWords,setNumWords] = useState("200")
    const prompt = `Q: ${input} ,Using the context of the current conversation,
     generate intimate questions that aim to foster vulnerability, bonding,
     and connection between the participants. Ensure that the questions are thought-provoking,
     encourage self-reflection, and promote deeper understanding of each other's emotions, values, 
     and experiences. Keep it to one question.`;


    const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setResponse("");
        setLoading(true);

        const response = await fetch("/api/generate/routes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setResponse((prev) => prev + chunkValue);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
                <div className="">
                    <form>
                        <div className="flex flex-col">
                            <label htmlFor="keywords" className="sr-only">
                                Context
                            </label>
                            <textarea
                                rows={7}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                name="keyWords"
                                id="keyWords"
                                placeholder="TBD: This area would be auto updated or a microphone would be added, contains context/conversations"
                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="sr-only" htmlFor="tone">
                                Tone
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="words" className="sr-only">
                                Words (Optional)
                            </label>
                            <input
                                value={numWords}
                                onChange={(e) => setNumWords(e.target.value)}
                                type="number"
                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                placeholder="Number Of Words - Default 200 (Optional)"
                                name="words"
                                id="words"
                            />
                        </div>
                    </form>
                </div>
                {!loading ? (
                    <button
                        className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
                        onClick={(e) => generateResponse(e)}
                    >
                        Generate Question &rarr;
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
                    >
                        <div className="animate-pulse font-bold tracking-widest">...</div>
                    </button>
                )}
                {response && (
                    <div className=" rounded-xl border bg-yellow-600 p-4 shadow-md transition hover:bg-yellow-500">
                        {response}
                    </div>
                )}
            </div>
        </div>
    );
}