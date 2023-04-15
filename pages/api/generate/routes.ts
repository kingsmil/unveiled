import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export const config = {
    runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {

    var { prompt } = (await req.json()) as {
        prompt?: string;
    };
    if (!prompt) {
        return new Response("No prompt in the request", { status: 400 });
    }
    // this is the rate of random questions vs context questions
    const curation_rate = 0.7;
    if(Math.random()>curation_rate){
        prompt = "Generate one intimate questions that encourage vulnerability, bonding, and connection between participants. The questions should be thought-provoking, promote self-reflection, and help individuals gain a deeper understanding of each other's emotions, values, and experiences"
    }
    console.log("i reached the handler");
    console.log(prompt)
    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        stream: true,
        n: 1,
    };

    const stream = await OpenAIStream(payload);
    console.log(stream);
    return new Response(stream);
}