import "./globals.css";

export const metadata = {
  title: "Calorie Tracker", // Updated title
  description: "A simple app to track daily calorie intake.", // Updated description
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      {/* Removed Geist font variables from className */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
