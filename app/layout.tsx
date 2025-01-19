import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Interfusta Andorra - Expert Carpentry Services",
	description: "Professional woodworking and carpentry services in Andorra",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: dark)",
				url: "/logoLight.ico",
				href: "/logoLight.ico",
			},
			{
				media: "(prefers-color-scheme: light)",
				url: "/logoDark.ico",
				href: "/logoDark.ico",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className={inter.className}>
				<Navigation />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
