"use server";
import { FileDefinition } from "@/components/ui/form/file-upload/models";

import {
  addMessageToThread,
  createAndRunThread,
  retrieveChartGeneratorAssistant,
  retrieveThread,
} from "./operators/open-ai";
import { MessageCreateParams } from "openai/resources/beta/threads/messages.mjs";
import { GenerateChartResponse } from "./models";

export async function addUserMessage(
  threadId: string,
  userInput: string
): Promise<GenerateChartResponse | undefined> {
  "use server";
  return addMessage(threadId, {
    role: "user",
    content: `
      - **Requirement:** ${userInput}
    `,
  });
}

export async function updateFile(
  fileDefinition: FileDefinition | null,
  threadId?: string
) {
  "use server";
  const thread = await retrieveThread(threadId);

  if (fileDefinition) {
    const dataSample = JSON.stringify(
      fileDefinition?.data.slice(0, 4),
      null,
      100
    );

    await addMessageToThread(thread.id, {
      role: "assistant",
      content: `
      Here is the dataset. Please analyze it thoroughly so you can use it to provide a chart based on the user.
        **Data Set:** ${dataSample}
      `,
    });

    const assistant = await retrieveChartGeneratorAssistant();

    await createAndRunThread(thread.id, assistant.id);

    return { threadId: thread.id, fileDefinition };
  }
}

async function addMessage(
  threadId: string,
  message: MessageCreateParams
): Promise<GenerateChartResponse | undefined> {
  "use server";

  const thread = await retrieveThread(threadId);

  if (!thread.id) {
    throw "Missing Thread";
  }

  await addMessageToThread(thread.id, message);

  const assistant = await retrieveChartGeneratorAssistant();

  const results = await createAndRunThread(thread.id, assistant.id);

  if (!results?.spec && results?.error) {
    return await addMessage(thread.id, {
      role: "assistant",
      content: `Result is not valid ${results.error}`,
    });
  }

  return results;
}
