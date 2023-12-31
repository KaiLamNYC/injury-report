"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "../schemas/register";

type Input = z.infer<typeof registerSchema>;

export default function SignUpPage() {
	const router = useRouter();

	const form = useForm<Input>({
		resolver: zodResolver(registerSchema),
	});
	async function onSubmit(values: Input) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		const response = await axios.post("/api/register", values);

		console.log(response.data);
		router.push("/login");
	}
	form.watch();

	return (
		<div className='flex justify-center items-center min-h-screen'>
			<Card className=' w-1/3'>
				<CardHeader>
					<CardTitle>Register</CardTitle>
					<CardDescription>Create an account to gain access</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='Email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Name' {...field} />
										</FormControl>
										<FormDescription>
											This is your public display name.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder='Password'
												{...field}
												type='password'
											/>
										</FormControl>
										<FormDescription>
											Must be at least 6 characters long.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex justify-center items-center'>
								<Button type='submit' className='w-full'>
									REGISTER
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
				<CardFooter className='flex flex-col'>
					<p className='text-sm mb-2'>OR</p>

					<Button
						variant='outline'
						onClick={() =>
							signIn("google", {
								callbackUrl: "/dashboard",
							}).catch(console.error)
						}
						className='w-full mb-4'
					>
						<Icons.google className='mr-2 h-4 w-4' />
						Google
					</Button>

					<p className='text-sm mb-2'>
						Already Have an Account? <Link href='/login'>LOGIN</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
