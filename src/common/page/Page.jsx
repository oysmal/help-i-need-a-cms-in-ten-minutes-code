export function Page(props) {
  const { children } = props;

  return (
    <main className="h-full min-h-screen w-full p-2 bg-gray-50">
      {children}
    </main>
  );
}
