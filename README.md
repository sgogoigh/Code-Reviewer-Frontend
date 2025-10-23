# Code Review Assistant

Code Review Assistant is a web application that leverages artificial intelligence to perform comprehensive code reviews.

Users can upload source code files, and the AI will analyze them to provide a detailed summary and actionable suggestions for improvement, helping to enhance code quality, identify potential bugs, and promote best practices.

## Core Features

-   **File Upload & Language Selection**: Easily upload a source code file and select its programming language from a dropdown list of supported languages.
-   **Gemini-Powered Code Review**: The uploaded code is sent to a secure backend where a Genkit-powered AI flow analyzes it for quality, correctness, and style.
-   **Rich Results Display**: Review results are presented in a clean and organized card, showing a summary of the analysis and a list of specific, actionable improvement suggestions.
-   **View Previous Reviews**: A dedicated page (`/reviews`) lists all past code reviews, allowing you to revisit the analysis and suggestions at any time.
-   **Backend Health Monitoring**: The application periodically checks the health of the backend service, with a status indicator available on the `/metrics` page.
-   **Modern & Responsive UI**: Built with a focus on user experience, the interface is clean, intuitive, and works seamlessly across devices.

## Tech Stack

This project is built with a modern, type-safe, and performant technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Components**: [React](https://react.dev/), [ShadCN UI](https://ui.shadcn.com/), and [Tailwind CSS](https://tailwindcss.com/)
-   **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) for orchestrating the AI-powered code review flows.
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/) for robust and efficient form management.
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react) for a consistent and lightweight icon set.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add any necessary environment variables. For example, if you are using a Genkit flow that requires an API key for a specific provider, you would add it here.
    ```env
    # Example for Google AI
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will now be running at [http://localhost:9002](http://localhost:9002).

### Building for Production

To create a production-ready build, run:

```sh
npm run build
```

This will compile the application and optimize it for the best performance. You can then start the production server with:

```sh
npm run start
```

> Made by Sunny Gogoi
