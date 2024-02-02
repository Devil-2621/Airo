import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ModalProvider } from "@/providers/modal-provider";

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
          <Toaster richColors closeButton theme="light" />
          <ModalProvider />
					{children}
				</ConvexClientProvider>
			</body>
		</html>
	);
}
