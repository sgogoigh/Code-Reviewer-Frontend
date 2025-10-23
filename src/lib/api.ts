import type { AiCodeReviewOutput } from "@/ai/flows/ai-code-review";

export type ReviewResponse = AiCodeReviewOutput;

export function postReview(
  file: File,
  language: string,
  onProgress?: (p: number) => void
): Promise<ReviewResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('file', file);
    formData.append('language', language);

    xhr.open('POST', '/api/review', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
        if (onProgress) {
            onProgress(100);
        }
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const jsonResponse = JSON.parse(xhr.responseText);
          resolve(jsonResponse);
        } catch (e) {
          reject(new Error('Failed to parse server response.'));
        }
      } else {
        try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(new Error(errorResponse.detail || `Server error: ${xhr.statusText}`));
        } catch (e) {
            reject(new Error(`Server error: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network request failed.'));
    };

    xhr.send(formData);
  });
}
