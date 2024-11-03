"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              エラーが発生しました
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              申し訳ありませんが、予期せぬエラーが発生しました。
            </p>
          </div>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              aria-label="ホームに戻る"
            >
              ホームに戻る
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
