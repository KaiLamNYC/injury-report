import Injury from "@/lib/models/injury.model";
import Report from "@/lib/models/report.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

const resolvers = {
	Query: {
		hello: () => "world",
		reports: async () => {
			await connectToDB();
			const reports = await Report.find({});
			return reports;
		},
		injuries: async () => {
			await connectToDB();
			const injuries = await Injury.find({});
			return injuries;
		},
		users: async () => {
			await connectToDB();
			const users = await User.find({});
			return users;
		},
	},
	//NESTING STUFF
	User: {
		reports: async (parent: any) => {
			try {
				await connectToDB();

				// parent._id is the user._id
				const userReports = await Report.find({ author: parent._id });
				return userReports;
			} catch (error) {
				console.error(error);
				throw new Error("Failed to fetch user's reports.");
			}
		},
	},
	Report: {
		author: async (parent: any) => {
			try {
				await connectToDB();

				// parent.author refers to the authors mongodb id
				const user = await User.findById(parent.author);
				return user;
			} catch (error) {
				console.error(error);
				throw new Error("Failed to fetch report's authors.");
			}
		},
		injuries: async (parent: any) => {
			try {
				await connectToDB();

				// parent.author refers to the authors mongodb id
				const injuries = await Injury.find({ _id: parent.injuries });

				return injuries;
			} catch (error) {
				console.error(error);
				throw new Error("Failed to fetch report's injuries.");
			}
		},
	},
	Mutation: {
		createInjury: async (_, { locationOfInjury, description }) => {
			try {
				await connectToDB();

				//create injury document
				const newInjury = new Injury({
					locationOfInjury,
					description,
				});

				// save doc to db
				const savedInjury = await newInjury.save();

				return savedInjury;
			} catch (error) {
				console.error(error);
				throw new Error("failed to create injury.");
			}
		},
	},
};

const typeDefs = gql`
	scalar JSON
	type Query {
		hello: String
		users: [User!]!
		user(id: ID!): User
		injuries: [Injury!]!
		injury(id: ID!): Injury
		reports: [Report!]!
		report(id: ID!): Report
	}
	type Report {
		id: ID!
		author: User!
		createdAt: String!
		injuries: [Injury!]!
		timeOfInjury: String!
		patientName: String!
		patientAge: Int!
		stageState: JSON!
	}
	type User {
		id: ID!
		email: String!
		name: String!
		password: String
		image: String
		reports: [Report!]
	}
	type Injury {
		id: ID!
		locationOfInjury: String!
		description: String!
	}

	type Mutation {
		createUser(
			email: String!
			name: String!
			password: String
			image: String
		): User!
		createInjury(locationOfInjury: String!, description: String!): Injury!
		createReport(
			authorId: ID!
			injuries: [ID!]!
			timeOfInjury: String!
			patientName: String!
			patientAge: Int!
			stageState: JSON
		): Report!
	}
`;

const server = new ApolloServer({
	resolvers,
	typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
