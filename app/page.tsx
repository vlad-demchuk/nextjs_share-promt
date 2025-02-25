import Feed from '@components/feed/feed';

export default function RootPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <main className="app">
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient"> AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting tool for modern world to
          <br className="max-md:hidden" />
          discover, create and share creative prompts
        </p>
      </section>

      <Feed searchQuery={query} />
    </main>
  );
}
