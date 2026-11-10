"use client";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <main className="mx-auto max-w-240 px-4 py-16 sm:py-24 lg:px-0">
      <p>Could not load the product</p>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-md px-4 py-2 mt-4 min-h-11 bg-primary text-primary-foreground hover:bg-primary-hover"
      >
        Try again
      </button>
    </main>
  );
}
