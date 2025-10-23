"use client";

import type { ChangeEvent, FormEvent } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';
import { Progress } from '@/components/ui/progress';

type UploadFormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLanguageChange: (value: string) => void;
  fileName: string | null;
  language: string;
  isLoading: boolean;
  uploadProgress: number;
};

export default function UploadForm({
  handleSubmit,
  handleFileChange,
  handleLanguageChange,
  fileName,
  language,
  isLoading,
  uploadProgress,
}: UploadFormProps) {
  return (
    <Card className="w-full max-w-lg shadow-2xl bg-secondary border-white/10">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Submit for Review</CardTitle>
          <CardDescription>Upload a source code file and select the language to get an AI-powered review.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Source Code File</Label>
            <div className="flex items-center justify-center w-full">
                <Label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-background/50 hover:bg-background/80 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-10 h-10 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-base text-center text-muted-foreground">
                          {fileName ? (
                            <span className="font-semibold text-primary">{fileName}</span>
                          ) : (
                            <><span className="font-semibold text-primary">Click to upload</span> or drag and drop</>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">Any common source code file</p>
                    </div>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} disabled={isLoading} />
                </Label>
            </div>
          </div>
          {isLoading && uploadProgress > 0 && (
            <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-xs text-center text-muted-foreground">{uploadProgress < 100 ? `Uploading... ${uploadProgress.toFixed(0)}%` : 'Processing...'}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="language-select">Language</Label>
            <Select onValueChange={handleLanguageChange} value={language} disabled={isLoading}>
              <SelectTrigger id="language-select" className="bg-background/50">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" size="lg" className="w-full font-semibold" disabled={!fileName || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadProgress < 100 ? 'Uploading...' : 'Analyzing...'}
              </>
            ) : (
              'Submit for Review'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
