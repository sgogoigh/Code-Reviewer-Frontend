# **App Name**: AI Code Auditor

## Core Features:

- File Upload and Language Selection: Enable users to upload source code files and select the programming language, supporting both dropdown and auto-detection methods.
- AI Code Review: Send the uploaded file to the backend /review endpoint for AI-powered analysis and display a loading spinner during the process.
- Review Results Display: Display the AI review results, including filename, language, summary, and improvement suggestions in a clear and organized manner.
- Health Status Monitoring: Monitor the backend /health endpoint every 30 seconds and indicate the status with a green (healthy) or red (unhealthy) dot.
- Metrics Link: Include a footer link labeled 'View Metrics' that opens the /metrics endpoint in a new tab for monitoring.

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB) to evoke a sense of calmness and professionalism.
- Background color: Light gray (#F5F5F5) to provide a clean and unobtrusive backdrop.
- Accent color: Teal (#008080) for interactive elements, providing a contrast and signaling interactivity.
- Body and headline font: 'Inter' (sans-serif) for a modern, neutral, and readable interface.
- Use a set of consistent and minimalistic icons from a library like Font Awesome or Material Icons.
- Employ a centered layout with ample spacing to maintain a clean and organized presentation.
- Incorporate subtle loading animations and progress indicators to enhance the user experience during file upload and processing.