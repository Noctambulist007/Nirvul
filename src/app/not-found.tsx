import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div aria-describedby="not-found-page">
        <div
          aria-describedby="content-wrapper"
          className="flex h-screen flex-col items-center justify-center gap-10 bg-white">
          <h1 className="text-5xl font-semibold text-gray-800">
            This page could not be found.
          </h1>
          <p className="text-lg font-medium text-gray-700">
            Sorry we could&apos;t find what you were looking for.
          </p>

          <Link
            href={'/'}
            className="flex max-w-max items-center justify-center gap-x-2 rounded-lg border !border-nirvul-primary-900 bg-gradient-to-r from-nirvul-primary-500 from-[10%] to-nirvul-primary-700 to-80% !px-4 !py-3 text-base font-semibold text-white shadow-sm transition-opacity duration-300 ease-in-out hover:text-white hover:opacity-90"
            >
            Back to home
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFoundPage;


