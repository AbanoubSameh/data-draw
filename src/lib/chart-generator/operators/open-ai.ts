import "server-only";
import OpenAI from "openai";
import type { Spec } from "vega";
import { parse } from "vega";
import {
  MessageCreateParams,
  TextContentBlock,
} from "openai/resources/beta/threads/messages.mjs";
import { GenerateChartResponse } from "../models";

const { OPEN_AI_API_KEY, GETCHART_ASSISTANT } = process.env;

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

export const createAndRunThread = async (
  threadId: string,
  assistantId: string
): Promise<GenerateChartResponse | undefined> => {
  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
  });
  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const latestMessage = messages.data.at(0);
    const content = latestMessage?.content[0] as TextContentBlock;
    try {
      const spec: Spec = JSON.parse(content?.text?.value);
      parse(spec);

      return {
        spec,
        threadId: run.thread_id,
        status: run.status,
      };
    } catch (error) {
      return {
        error: error?.toString(),
        threadId: run.thread_id,
        status: run.status,
      };
    }
  } else {
    return {
      threadId: run.thread_id,
      status: run.status,
    };
  }
};

export const addMessageToThread = async (
  threadId: string,
  message: MessageCreateParams
) => await openai.beta.threads.messages.create(threadId, message);

export const retrieveChartGeneratorAssistant = async () =>
  await openai.beta.assistants.retrieve(GETCHART_ASSISTANT as string);

export const retrieveThread = async (threadId?: string) =>
  await (threadId
    ? openai.beta.threads.retrieve(threadId)
    : openai.beta.threads.create());
