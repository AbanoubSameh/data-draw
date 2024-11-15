"use server"
import { retrieveThread } from "@/lib/chart-generator/operators/open-ai";
import ChartGenerator from "./(chart-generator)";


export default async function Home() {
  const threadId = (await retrieveThread())?.id;

  return <ChartGenerator threadId={threadId} />;
}
