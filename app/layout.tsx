import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { BoardModalProvider } from "@/providers/board-modal-provider";
import { NoteModalProvider } from "@/providers/note-modal-provider";

const pop = Poppins({ weight: '300',  style: 'normal', subsets: ['latin']});

export const metadata: Metadata = {
  title: "Airo",
  description: "Collaboration & Productivity made simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='en'>
			<body className={pop.className}>
        <ConvexClientProvider>
          <Toaster richColors closeButton theme="light" duration={3000} />
          <BoardModalProvider />
          <NoteModalProvider />
					{children}
				</ConvexClientProvider>
			</body>
		</html>
	);
}
