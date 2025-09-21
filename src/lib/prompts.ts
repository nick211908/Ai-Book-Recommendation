// Comprehensive prompt templates for course generation

export interface PromptTemplate {
  name: string;
  description: string;
  template: string;
}

export const COURSE_GENERATION_PROMPTS: Record<string, PromptTemplate> = {
  syllabus: {
    name: 'Course Syllabus Generator',
    description: 'Generates a comprehensive course outline with chapters and topics',
    template: `
You are an expert educational content creator. Generate a comprehensive course syllabus for the topic "{topic}" at {level} level.

Requirements:
- Create 6-10 meaningful chapters that build upon each other
- Include learning objectives for each chapter
- Estimate time requirements
- Add prerequisites and target audience
- Include assessment methods

Return ONLY valid JSON in this exact format:
{
  "title": "Complete Course Title",
  "description": "Detailed course description (2-3 sentences)",
  "totalDuration": "X weeks/hours",
  "targetAudience": "Who this course is for",
  "prerequisites": ["prerequisite1", "prerequisite2"],
  "learningOutcomes": ["outcome1", "outcome2", "outcome3"],
  "chapters": [
    {
      "id": 1,
      "title": "Chapter Title",
      "description": "What this chapter covers",
      "duration": "X hours",
      "topics": ["topic1", "topic2", "topic3"],
      "learningObjectives": ["objective1", "objective2"]
    }
  ],
  "assessmentMethods": ["method1", "method2"],
  "recommendedResources": ["resource1", "resource2"]
}

Topic: {topic}
Level: {level}
    `
  },

  chapterContent: {
    name: 'Chapter Content Generator',
    description: 'Creates detailed educational content for individual chapters',
    template: `
You are an expert educator creating detailed chapter content for "{chapterTitle}" in a {topic} course at {level} level.

Create comprehensive, engaging educational content that includes:
1. Clear introduction explaining the chapter's importance
2. Step-by-step explanations of key concepts
3. Practical examples and use cases
4. Code samples (if applicable)
5. Real-world applications
6. Common pitfalls and how to avoid them
7. Summary of key points

Format Requirements:
- Use HTML formatting for structure
- Include proper headings (h2, h3)
- Use lists, bold, and emphasis appropriately
- Make content engaging and easy to follow
- Target {level} difficulty level
- Include practical examples throughout

Chapter: {chapterTitle}
Topic: {topic}
Level: {level}

Generate the complete HTML content:
    `
  },

  mindmapGenerator: {
    name: 'Course Mindmap Generator',
    description: 'Creates visual learning maps in Mermaid.js format',
    template: `
Create a comprehensive Mermaid.js mindmap for a {topic} course with the following structure:

Chapters: {chapterList}
Level: {level}

Requirements:
- Use proper Mermaid mindmap syntax
- Start with "mindmap" or use "graph TD" format
- Include all major concepts and their relationships
- Show learning progression and dependencies
- Use descriptive labels
- Create logical groupings
- Include 3-4 levels of detail

Return ONLY the Mermaid syntax, no explanations:

Topic: {topic}
Level: {level}
Chapters: {chapterList}
    `
  },

  exerciseGenerator: {
    name: 'Practice Exercise Generator',
    description: 'Creates hands-on exercises and projects',
    template: `
Generate engaging practice exercises for the chapter "{chapterTitle}" in a {topic} course at {level} level.

Create a variety of exercise types:

1. **Conceptual Questions** (3-5 questions)
   - Test understanding of key concepts
   - Include short answer and multiple choice
   - Provide difficulty appropriate to {level}

2. **Practical Exercises** (2-4 exercises)
   - Hands-on coding or implementation tasks
   - Step-by-step instructions
   - Clear expected outcomes

3. **Project Ideas** (1-2 projects)
   - Real-world application scenarios
   - Combine multiple concepts from the chapter
   - Include requirements and success criteria

4. **Challenges** (1-2 advanced problems)
   - For learners who want to go deeper
   - Open-ended problems with multiple solutions

Return as structured text with clear sections and formatting.

Chapter: {chapterTitle}
Topic: {topic}
Level: {level}
    `
  },

  researchPapers: {
    name: 'Research Paper Collector',
    description: 'Finds relevant academic papers and current research',
    template: `
Generate a curated list of current research papers and developments related to "{topic}" for a {level} level course.

Include:
1. **Recent Academic Papers** (5-8 papers)
   - Focus on 2022-2024 publications
   - Include title, authors, journal/conference
   - Brief summary of contribution
   - Relevance to course content

2. **Industry Reports** (2-3 reports)
   - Current trends and market analysis
   - Technology adoption rates
   - Future predictions

3. **Emerging Technologies** (3-5 items)
   - Cutting-edge developments
   - Experimental techniques
   - Potential future applications

4. **Key Research Groups/Labs** (3-4 groups)
   - Leading researchers in the field
   - Their primary focus areas
   - Notable recent contributions

Return as JSON format:
{
  "academicPapers": [
    {
      "title": "Paper Title",
      "authors": ["Author 1", "Author 2"],
      "year": 2024,
      "journal": "Journal Name",
      "summary": "Brief summary",
      "relevance": "How it relates to course",
      "difficulty": "Beginner/Intermediate/Advanced"
    }
  ],
  "industryReports": [...],
  "emergingTechnologies": [...],
  "keyResearchers": [...]
}

Topic: {topic}
Level: {level}
    `
  }
};

// Utility functions for working with prompts
export function generatePrompt(
  templateKey: string, 
  variables: Record<string, any>
): string {
  const template = COURSE_GENERATION_PROMPTS[templateKey];
  if (!template) {
    throw new Error(`Prompt template '${templateKey}' not found`);
  }

  let prompt = template.template;
  
  // Replace variables in the template
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    prompt = prompt.replace(regex, String(value));
  });

  return prompt;
}

export function listAvailablePrompts(): PromptTemplate[] {
  return Object.values(COURSE_GENERATION_PROMPTS);
}

// Specialized prompt generators for different course levels
export const LEVEL_SPECIFIC_PROMPTS = {
  Medium: {
    styleGuide: "Use clear, accessible language. Include practical examples. Avoid overly technical jargon. Focus on understanding core concepts.",
    complexity: "Moderate complexity with step-by-step explanations. Include beginner-friendly examples alongside more detailed concepts.",
  },
  
  Advanced: {
    styleGuide: "Use technical terminology appropriately. Include complex examples and edge cases. Assume strong foundational knowledge.",
    complexity: "High complexity with in-depth analysis. Focus on optimization, best practices, and advanced techniques.",
  },
  
  Research: {
    styleGuide: "Academic tone with comprehensive references. Include cutting-edge developments and research methodologies.",
    complexity: "Research-level depth with focus on current developments, experimental techniques, and theoretical foundations.",
  }
};

export function getStyleGuideForLevel(level: string): string {
  const levelGuide = LEVEL_SPECIFIC_PROMPTS[level as keyof typeof LEVEL_SPECIFIC_PROMPTS];
  return levelGuide ? `${levelGuide.styleGuide} ${levelGuide.complexity}` : '';
}