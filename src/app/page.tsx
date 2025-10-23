"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { AiCodeReviewOutput } from '@/ai/flows/ai-code-review';
import { useToast } from '@/hooks/use-toast';
import UploadForm from '@/components/UploadForm';
import ReviewResult from '@/components/ReviewResult';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';
import { postReview } from '@/lib/api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<AiCodeReviewOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadProgress(0);
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload for review.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setUploadProgress(0);

    try {
      const data = await postReview(file, language, setUploadProgress);
      setResult(data);
      toast({
        title: 'Review Successful',
        description: `Successfully analyzed ${file.name}.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      toast({
        title: 'Review Failed',
        description: `Failed to get review. ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };
  
  const handleClear = () => {
    setResult(null);
    setFile(null);
    setFileName(null);
    setUploadProgress(0);
  };

  return (
    <main className="flex-grow container mx-auto flex items-center justify-center p-4">
      {result ? (
        <ReviewResult result={{...result, filename: fileName || '', language: language}} onClear={handleClear} />
      ) : (
        <UploadForm
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          handleLanguageChange={handleLanguageChange}
          fileName={fileName}
          language={language}
          isLoading={isLoading}
          uploadProgress={uploadProgress}
        />
      )}
    </main>
  );
}
