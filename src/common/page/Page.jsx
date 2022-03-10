export function Page(props) {
  const { children } = props;

  return (
    <main className="h-full min-h-screen p-2 max-w-[1200px] mx-auto">
      {children}
    </main>
  );
}
