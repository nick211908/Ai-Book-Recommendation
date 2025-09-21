# AI Course-Book Generator

A sophisticated web application that creates comprehensive course books using Google's Gemini AI. Generate structured learning materials with chapters, examples, mindmaps, and downloadable PDFs.

## Features

- **AI-Powered Course Generation**: Creates comprehensive course content using Gemini AI
- **Multiple Difficulty Levels**: Medium, Advanced, and Research levels
- **Rich Content Format**: Chapters, examples, exercises, and mindmaps
- **PDF Export**: Professional-quality downloadable course books
- **Interactive UI**: Modern, responsive design with real-time progress tracking
- **Mindmap Visualization**: Visual learning aids for better comprehension

## Getting Started

### Prerequisites

- Node.js 16+ 
- Gemini API key from Google AI Studio

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai-course-generator
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

5. Start the development server
```bash
npm run dev
```

## Usage

1. **Enter Course Topic**: Specify what you want to learn (e.g., "Machine Learning", "React Development")

2. **Select Difficulty Level**:
   - **Medium**: Balanced content with practical examples
   - **Advanced**: In-depth coverage with complex examples
   - **Research**: Academic-level content with current research

3. **Generate Course**: Click "Generate Course" and watch the AI create your personalized learning material

4. **View & Download**: Browse the generated content and download as PDF

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   └── MindmapComponent.tsx  # Mindmap renderer
├── pages/              # Main application pages
│   ├── LandingPage.tsx # Course generation form
│   ├── ProgressPage.tsx # Generation progress tracker
│   └── CoursePage.tsx  # Course content viewer
├── lib/                # Utility libraries
│   ├── gemini.ts       # Gemini API integration
│   ├── prompts.ts      # AI prompt templates
│   └── pdfGenerator.ts # PDF generation utilities
└── App.tsx            # Main application component
```

## API Integration

### Gemini AI Service

The application uses Google's Gemini AI for content generation:

```typescript
import { GeminiService } from './lib/gemini';

const gemini = new GeminiService(apiKey);
const syllabus = await gemini.generateSyllabus(topic, level);
```

### Content Generation Pipeline

1. **Syllabus Generation**: Creates course outline with chapters
2. **Content Creation**: Generates detailed chapter content
3. **Mindmap Generation**: Creates visual learning aids
4. **Research Integration**: Adds current research (Research level)
5. **PDF Compilation**: Assembles everything into downloadable format

## Customization

### Adding New Prompt Templates

Edit `src/lib/prompts.ts` to add custom prompt templates:

```typescript
export const CUSTOM_PROMPTS = {
  myTemplate: {
    name: 'Custom Template',
    description: 'Custom course generation template',
    template: 'Your prompt template here...'
  }
};
```

### Styling

The application uses Tailwind CSS with a custom dark theme. Modify the design by updating the Tailwind classes in the components.

## Production Deployment

### Backend Requirements

For full functionality in production, you'll need:

1. **Server-side API**: Implement API routes for Gemini integration
2. **PDF Generation**: Set up Puppeteer for HTML to PDF conversion
3. **File Storage**: Cloud storage for generated course files

### Environment Variables

Set these environment variables in production:

```
VITE_GEMINI_API_KEY=your_production_api_key
VITE_NODE_ENV=production
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
# - Contact For Contribution on GitHub


---
