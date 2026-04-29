import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'

export const providers = [
  openai('gpt-4o'),
  anthropic('claude-opus-4-5'),
  google('gemini-2.0-flash'),
]
