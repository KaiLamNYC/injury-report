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
					label: "Email",
					type: "text",
					placeholder: "email",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials) {
				// await connectToDB();

				//DOUBLE CHECK FIELDS TO SEE IF VALID
				if (!credentials.email || !credentials.password) {
					return null;
				}

				const user = await User.findOne({ email: credentials?.email });

				if (!user) {
					return null;
				}

				//CHECKING PASSWORD
				const passwordsMatch = await bcrypt.compare(
					credentials?.password,
					user.password
				);

				if (!passwordsMatch) {
					return null;
				}
				// console.log(user);
				return user;
			},
		}),
	],

	//SETTING CUSTOM PAGES FOR ONBOARDING AND LOGIN FOR PROTECTED ROUTES
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
	// debug: process.env.NODE_ENV !== "production",
	callbacks: {
		async jwt({ token, user, session }) {
			//PASSING IN MONGODB ID TO TOKEN
			// console.log("jwt");
			if (user) {
				return {
					...token,
					id: user._id,
				};
			}
			// console.log(user);
			// console.log(session);
			return token;
		},
		async session({ session, token, user }) {
			//SEARCHING FOR USER IN DB

			const sessionUser = await User.findOne({ email: session.user.email });
			session.user.id = sessionUser._id;

			// if (token.id) {
			// 	session.user.id = token.id;
			// }
			return session;

			//RETURNING THE MONGODB ID TO SESSION
			// return {
			// 	...session,
			// 	user: {
			// 		...session.user,
			// 		id: token.id,
			// 	},
			// };
			// return {
			// 	...session,
			// 	user: {
			// 		...session.user,
			// 		id: token.id,
			// 	},
			// };
		},
		//AFTER SIGNIN RUNS THIS FUNCTION
		async signIn({ profile, user }) {
			// console.log("signin");
			// console.log(profile);
			// await connectToDB();
			try {
				await connectToDB();

				// CHECK IF USER EXISTS IN DB
				const userExists = await User.findOne({
					//TERNARY BECAUSE PROFILE IS UNDEFINED IF LOGGING IN WITH CREDENTIALS
					//https://next-auth.js.org/configuration/events#signin
					email: profile ? profile.email : user.email,
				});

				//CREATING USER IF DOESNT EXIST
				//USER WILL ALWAYS EXIST IF LOGGING IN WITH CREDENTIALS
				//ONLY FOR GOOGLE LOGIN
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
	return getServerSession(authOptions);
};
