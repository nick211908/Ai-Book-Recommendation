// PDF Generation utility using HTML to PDF conversion
// Note: In a real implementation, this would use Puppeteer on the server side

export interface CourseData {
  title: string;
  topic: string;
  level: string;
  chapters: Array<{
    title: string;
    content: string;
    examples: string[];
    exercises: string[];
  }>;
  mindmap?: string;
  researchPapers?: any[];
}

export class PDFGenerator {
  private static instance: PDFGenerator;

  static getInstance(): PDFGenerator {
    if (!PDFGenerator.instance) {
      PDFGenerator.instance = new PDFGenerator();
    }
    return PDFGenerator.instance;
  }

  async generateCoursePDF(courseData: CourseData): Promise<Blob> {
    // Generate HTML content for the course
    const htmlContent = this.generateCourseHTML(courseData);
    
    // In a real implementation, this would use Puppeteer to convert HTML to PDF
    // For now, we'll simulate the PDF generation
    return this.simulatePDFGeneration(htmlContent);
  }

  private generateCourseHTML(courseData: CourseData): string {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${courseData.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Patrick+Hand&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        
        .cover-page {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            page-break-after: always;
        }
        
        .cover-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .cover-subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .course-info {
            font-size: 1.2rem;
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        
        .toc-page {
            padding: 2rem;
            page-break-after: always;
        }
        
        .toc-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: #667eea;
            border-bottom: 3px solid #667eea;
            padding-bottom: 1rem;
        }
        
        .toc-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        .chapter {
            padding: 2rem;
            page-break-before: always;
        }
        
        .chapter-title {
            font-size: 2rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 1.5rem;
            border-left: 5px solid #667eea;
            padding-left: 1rem;
        }
        
        .chapter-content {
            margin-bottom: 2rem;
        }
        
        .chapter-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #444;
            margin: 1.5rem 0 1rem;
        }
        
        .chapter-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #555;
            margin: 1rem 0 0.5rem;
        }
        
        .chapter-content p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        
        .chapter-content ul, .chapter-content ol {
            margin: 1rem 0 1rem 2rem;
        }
        
        .chapter-content li {
            margin-bottom: 0.5rem;
        }
        
        .examples-section {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 1.5rem;
            margin: 2rem 0;
        }
        
        .examples-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 1rem;
        }
        
        .example-item {
            background: white;
            border-radius: 5px;
            padding: 1rem;
            margin-bottom: 1rem;
            border-left: 4px solid #3b82f6;
        }
        
        .exercises-section {
            background: #f0fdf4;
            border: 2px solid #bbf7d0;
            border-radius: 10px;
            padding: 1.5rem;
            margin: 2rem 0;
        }
        
        .exercises-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #16a34a;
            margin-bottom: 1rem;
        }
        
        .exercise-item {
            background: white;
            border-radius: 5px;
            padding: 1rem;
            margin-bottom: 1rem;
            border-left: 4px solid #16a34a;
            display: flex;
            align-items: flex-start;
        }
        
        .exercise-number {
            background: #16a34a;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-weight: 600;
            margin-right: 1rem;
            flex-shrink: 0;
        }
        
        .handwritten-note {
            font-family: 'Patrick Hand', cursive;
            background: #fffbeb;
            border: 2px dashed #f59e0b;
            border-radius: 10px;
            padding: 1rem;
            margin: 1.5rem 0;
            transform: rotate(-0.5deg);
            font-size: 1.1rem;
            color: #92400e;
        }
        
        .page-number {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            font-size: 0.875rem;
            color: #666;
        }
        
        @media print {
            .page-break {
                page-break-before: always;
            }
        }
    </style>
</head>
<body>
    ${this.generateCoverPage(courseData)}
    ${this.generateTableOfContents(courseData)}
    ${this.generateChapters(courseData)}
    ${courseData.researchPapers ? this.generateResearchSection(courseData.researchPapers) : ''}
</body>
</html>`;
    
    return html;
  }

  private generateCoverPage(courseData: CourseData): string {
    return `
    <div class="cover-page">
        <h1 class="cover-title">${courseData.title}</h1>
        <p class="cover-subtitle">Comprehensive Learning Guide</p>
        <div class="course-info">
            <p><strong>Topic:</strong> ${courseData.topic}</p>
            <p><strong>Level:</strong> ${courseData.level}</p>
            <p><strong>Chapters:</strong> ${courseData.chapters.length}</p>
        </div>
        <div style="margin-top: 2rem; font-style: italic;">
            Generated by AI Course-Book Generator
        </div>
    </div>`;
  }

  private generateTableOfContents(courseData: CourseData): string {
    const tocItems = courseData.chapters.map((chapter, index) => 
      `<div class="toc-item">
        <span>Chapter ${index + 1}: ${chapter.title}</span>
        <span>Page ${index * 5 + 3}</span>
      </div>`
    ).join('');

    return `
    <div class="toc-page">
        <h2 class="toc-title">Table of Contents</h2>
        ${tocItems}
        ${courseData.researchPapers ? '<div class="toc-item"><span>Research & References</span><span>Page ' + (courseData.chapters.length * 5 + 3) + '</span></div>' : ''}
    </div>`;
  }

  private generateChapters(courseData: CourseData): string {
    return courseData.chapters.map((chapter, index) => `
    <div class="chapter">
        <h1 class="chapter-title">Chapter ${index + 1}: ${chapter.title}</h1>
        
        <div class="chapter-content">
            ${chapter.content}
        </div>
        
        ${this.generateHandwrittenNote(chapter.title)}
        
        <div class="examples-section">
            <h3 class="examples-title">💡 Code Examples & Demonstrations</h3>
            ${chapter.examples.map(example => 
              `<div class="example-item">${example}</div>`
            ).join('')}
        </div>
        
        <div class="exercises-section">
            <h3 class="exercises-title">✅ Practice Exercises</h3>
            ${chapter.exercises.map((exercise, i) => 
              `<div class="exercise-item">
                <div class="exercise-number">${i + 1}</div>
                <div>${exercise}</div>
              </div>`
            ).join('')}
        </div>
        
        <div class="page-number">Page ${index * 5 + 3}</div>
    </div>`).join('');
  }

  private generateHandwrittenNote(chapterTitle: string): string {
    const notes = [
      "Remember: Practice makes perfect! Try implementing these concepts in your own projects.",
      "Pro tip: Don't just read through - code along and experiment with the examples!",
      "Key insight: Understanding the 'why' behind each concept is just as important as the 'how'.",
      "Study hint: Review this chapter again after completing the exercises for better retention.",
      "Important: Connect these concepts with real-world applications you've seen or used."
    ];
    
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    
    return `<div class="handwritten-note">📝 ${randomNote}</div>`;
  }

  private generateResearchSection(researchPapers: any[]): string {
    return `
    <div class="chapter">
        <h1 class="chapter-title">Research & Current Developments</h1>
        <p>This section includes current research papers and developments in the field to keep you updated with the latest trends.</p>
        
        ${researchPapers.map(paper => `
        <div class="examples-section">
            <h3>${paper.title}</h3>
            <p><strong>Authors:</strong> ${Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}</p>
            <p><strong>Year:</strong> ${paper.year}</p>
            <p><strong>Abstract:</strong> ${paper.abstract}</p>
            <p><strong>Relevance:</strong> ${paper.relevance}</p>
        </div>`).join('')}
    </div>`;
  }

  private async simulatePDFGeneration(htmlContent: string): Promise<Blob> {
    // In a real implementation, this would use Puppeteer:
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.setContent(htmlContent);
    // const pdf = await page.pdf({ format: 'A4', printBackground: true });
    // await browser.close();
    // return new Blob([pdf], { type: 'application/pdf' });

    // For demo purposes, we'll create a text blob with the HTML content
    return new Blob([htmlContent], { type: 'text/html' });
  }
}

// Utility functions for PDF generation
export function generateCoursePDF(courseData: CourseData): Promise<Blob> {
  const generator = PDFGenerator.getInstance();
  return generator.generateCoursePDF(courseData);
}

export function downloadPDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}