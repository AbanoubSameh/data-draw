import { RunStatus } from "openai/resources/beta/threads/runs/runs.mjs";
import { Spec } from "vega";

export interface GenerateChartResponse {
  threadId: string;
  status: RunStatus;
  spec?: Spec;
  error?: string;
}
