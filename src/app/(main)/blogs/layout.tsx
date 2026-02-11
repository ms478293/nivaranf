export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className=" px-4 font-Poppins ">{children}</main>
    </>
  );
}
