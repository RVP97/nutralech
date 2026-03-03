import AboutPage from "@/components/sections/app-about-page";
import { generatePageMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
	return generatePageMetadata({
		title: "Conoce quién es Marialy Alonso",
		description:
			"Marialy Alonso es una nutrióloga e influencer con más de 780k seguidores en redes sociales y ofrece servicios de asesoría nutricional personalizada.",
		keywords: [
			"salud",
			"bienestar",
			"nutrición",
			"acerca de",
			"nutriologa",
			"asesoría personalizada",
			"nutralech",
			"marialy alonso",
		],
		openGraph: {
			url: "https://www.nutralech.com/acerca-de-mi",
		},
	});
}

export default function AcercaDeMi() {
	return <AboutPage />;
}
