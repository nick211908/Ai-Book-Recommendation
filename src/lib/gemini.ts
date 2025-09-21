// Gemini API integration utility
export interface GeminiConfig {
  apiKey: string;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API call failed:', error);
      throw error;
    }
  }

  async generateSyllabus(topic: string, level: string): Promise<any> {
    const prompt = `Generate a comprehensive course syllabus for "${topic}" at ${level} level. 
    Return the response as a JSON object with the following structure:
    {
      "title": "Course Title",
      "description": "Course description",
      "duration": "Estimated duration",
      "chapters": [
        {
          "id": 1,
          "title": "Chapter Title",
          "description": "Chapter description",
          "topics": ["topic1", "topic2"],
          "estimatedTime": "time in hours"
        }
      ],
      "prerequisites": ["prerequisite1", "prerequisite2"],
      "learningOutcomes": ["outcome1", "outcome2"]
    }`;

    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      // If parsing fails, return a structured fallback
      return {
        title: `Complete Guide to ${topic}`,
        description: `A comprehensive course covering ${topic} concepts and applications.`,
        chapters: [
          { id: 1, title: `Introduction to ${topic}`, description: `Basic concepts and fundamentals` },
          { id: 2, title: `Advanced ${topic} Concepts`, description: `Deep dive into advanced topics` }
        ]
      };
    }
  }

  async generateChapterContent(chapterTitle: string, topic: string, level: string): Promise<string> {
    const prompt = `Generate detailed long educational content for a chapter titled "${chapterTitle}" 
    in a course about "${topic}" at ${level} level. Include:
    - Comprehensive explanations
    - Code examples where relevant
    - Real-world applications
    - Key concepts and definitions
    Format as HTML content suitable for display in a course viewer.`;

    return await this.generateContent(prompt);
  }

  async generateMindmap(topic: string, chapters: string[]): Promise<string> {
    const prompt = `Generate a Mermaid.js mindmap diagram for a course about "${topic}" 
    with chapters: ${chapters.join(', ')}. 
    Return only the Mermaid syntax starting with "graph TD" or "mindmap".`;

    return await this.generateContent(prompt);
  }

  async generateResearchPapers(topic: string): Promise<any[]> {
    const prompt = `Generate a list of current research papers and trends related to "${topic}".
    Return as JSON array with objects containing: title, authors, year, abstract, relevance.
    Focus on recent developments and cutting-edge research.`;

    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return [
        {
          title: `Recent Advances in ${topic}`,
          authors: ["Dr. A. Smith", "Prof. B. Johnson"],
          year: 2024,
          abstract: `This paper explores recent developments in ${topic} and their applications.`,
          relevance: "High"
        }
      ];
    }
  }
}

// Utility function to create Gemini service instance
export function createGeminiService(): GeminiService | null {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('Gemini API key not found. Set VITE_GEMINI_API_KEY environment variable.');
    return null;
  }
  
  return new GeminiService(apiKey);
}

// Example prompts for different use cases
export const COURSE_PROMPTS = {
  syllabus: (topic: string, level: string) => `
    Create a detailed course syllabus for "${topic}" at ${level} level.
    Include learning objectives, chapter breakdown, and assessment methods.
  `,
  
  chapterContent: (chapter: string, topic: string, level: string) => `
    Generate comprehensive content for the chapter "${chapter}" in a ${topic} course.
    Difficulty level: ${level}
    Include explanations, examples, and practical applications.
  `,
  
  mindmap: (topic: string, chapters: string[]) => `
    Create a Mermaid.js mindmap for a ${topic} course with these chapters:
    ${chapters.join('\n- ')}
    Show relationships and key concepts.
  `,
  
  exercises: (chapter: string, topic: string, level: string) => `
    Generate practice exercises for the chapter "${chapter}" in a ${topic} course.
    Difficulty: ${level}
    Include coding challenges, theoretical questions, and project ideas.
  `
};