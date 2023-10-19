// @ts-nocheck
import bcrypt from "bcrypt";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "./models/user.model";
import { connectToDB } from "./mongoose";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "email:",
					type: "text",
					placeholder: "email",
				},
				password: {
					label: "Password:",
					type: "password",
				},
			},
			async authorize(credentials) {
				//CHECKING FIELDS TO SEE IF VALID
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.emailId,
					},
				});

				if (!user) {
					return null;
				}

				//CHECKING PASSWORD
				const passwordsMatch = await bcrypt.compare(
					credentials?.password,
					user.hashedPassword
				);

				if (!passwordsMatch) {
					return null;
				}
				return user;
			},
		}),
	],
	//SETTING CUSTOM PAGES FOR ONBOARDING AND LOGIN FOR PROTECTED ROUTES
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, session }) {
			//PASSING IN FIRSTNAME AND ONBOARDING TO TOKEN
			// if (user) {
			// 	return {
			// 		...token,
			// 		onboarded: user.onboarded,
			// 		firstName: user.firstName,
			// 	};
			// }
			return token;
		},
		async session({ session, token, user }) {
			//SEARCHING FOR USER IN DB
			const sessionUser = await User.findOne({ email: session.user.email });

			//RETURNING THE MONGODB ID TO SESSION
			session.user.id = sessionUser._id;

			return session;
		},
		//AFTER GOOGLE SIGNIN RUN THIS FUNCTION
		async signIn({ profile }) {
			console.log(profile);
			// await connectToDB();
			try {
				await connectToDB();
				// CHECK IF USER EXISTS IN DB
				const userExists = await User.findOne({ email: profile.email });

				//CREATING USER IF DOESNT EXIST
				if (!userExists) {
					const user = await User.create({
						name: profile.name,
						image: profile.picture,
						email: profile.email,
					});
				}
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
};

//https://next-auth.js.org/configuration/nextjs#getserversession
export const getAuthSession = () => {
	return getServerSession(options);
};
