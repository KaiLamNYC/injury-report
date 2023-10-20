export { default } from "next-auth/middleware";
export const config = {
	matcher: [
		"/(dashboard|viewReport/.*|createReport/.*|allReports|editReport/.*)",
	],
};

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
