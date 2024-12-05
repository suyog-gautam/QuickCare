import React from "react";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
          404
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Oops, it looks like the page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-[#578df5] px-4 py-2 text-sm font-medium text-[#ffffff] shadow-sm transition-colors hover:bg-[#4a7cd4] focus:outline-none focus:ring-2 focus:ring-[#578df5] focus:ring-offset-2"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
