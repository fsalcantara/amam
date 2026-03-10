import { ScreeningQuestion } from '../types/job';

/**
 * Client-side service that calls the Gemini API route
 * to generate screening questions for a job posting.
 */
export async function generateScreeningQuestions(
  jobTitle: string,
  jobArea: string,
  jobDescription: string
): Promise<ScreeningQuestion[]> {
  try {
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, jobArea, jobDescription }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.questions as ScreeningQuestion[];
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}
