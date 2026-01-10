import { workflow } from "./index";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation } from "./_generated/server";

export const kickoffTitleGenerationWorkflow = mutation({
    args: { url: v.string() },
    handler: async (ctx, args) => {
      const workflowId = await workflow.start(ctx, internal.workflow.generateTitleWorkflow, {
        url: args.url,
      });
      console.log("Title generation workflow started with ID:", workflowId);
    },
});

export const generateTitleWorkflow = workflow.define({
    args: { url: v.string() },
    returns: v.string(),
    handler: async (step, args): Promise<string> => {
        // get the transcript as a step
        const transcript: string = await step.runAction(
            internal.transcripts.getYouTubeTranscript,
            {
                url: args.url,
            },
            {
                retry: { maxAttempts: 2, initialBackoffMs: 100, base: 2 },
            },
        );
        // generate the summary as a step
        const summary: string = await step.runAction(
            internal.transcripts.generateSummary,
            {
                transcript: transcript,
            }, // pass in results from previous steps!
        );
        // finish the workflow by returning the summary
        return summary;
    },
  });
  