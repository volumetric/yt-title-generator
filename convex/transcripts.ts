"use node";

import { v } from 'convex/values'
import { internalAction } from './_generated/server'
import { Supadata } from '@supadata/js'

export const getYourTranscript = internalAction({
    args: {
        url: v.string(),
    },
    handler: async (_ctx, args) => {
        const apiKey = process.env.SUPADATA_API_KEY
        if (!apiKey) {
            throw new Error('SUPADATA_API_KEY not set. Get a free key at https://supadata.ai')
        }

        const supadata = new Supadata({ apiKey })

        console.log("Fetching transcript for:", args.url)

        const result = await supadata.youtube.transcript({
            url: args.url,
            text: true,  // Get plain text instead of segments
            lang: 'en',
        })

        if (!result.content) {
            throw new Error('No transcript available for this video')
        }

        console.log("Transcript length:", result.content.length)
        // console.log("Transcript:", result.content)
        return result.content
    }
})
