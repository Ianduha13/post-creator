const Post = require("../models/Post")
const User = require("../models/User")
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} = require("graphql")

const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		subtitle: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.userId)
			},
		},
	}),
})

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
	}),
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find()
			},
		},
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Post.findById(args.id)
			},
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find()
			},
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return User.findById(args.id)
			},
		},
	},
})

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, args) {
				const existingUser = await User.findOne({ email: args.email })
				if (existingUser) {
					throw new Error("A user with that email already exists")
				}
				if (!existingUser) {
					const user = new User({
						name: args.name,
						email: args.email,
					})
					return user.save()
				}
			},
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return User.findByIdAndDelete(args.id)
			},
		},
		addPost: {
			type: PostType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				subtitle: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const post = new Post({
					title: args.title,
					subtitle: args.subtitle,
					description: args.description,
					userId: args.userId,
				})
				return post.save()
			},
		},
		deletePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Post.findByIdAndDelete(args.id)
			},
		},
	},
})
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,
})
