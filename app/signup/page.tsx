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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { registerSchema } from "../schemas/register";

// type Input = z.infer<typeof registerSchema>;

export default function SignUpPage() {
	const router = useRouter();

	// const form = useForm();
	const form = useForm({
		// resolver: zodResolver(registerSchema),
	});
	async function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		const response = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		const userInfo = await response;
		console.log(userInfo);
		router.push("/login");
	}

	return (
		<div className='flex justify-center items-center min-h-screen'>
			<Card className=' w-1/3'>
				<CardHeader>
					<CardTitle>Welcome!</CardTitle>
					<CardDescription>Sign Up Below</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Username</FormLabel> */}
										<FormControl>
											<Input placeholder='Email' {...field} />
										</FormControl>
										{/* <FormDescription>
												This is your public display name.
											</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Username</FormLabel> */}
										<FormControl>
											<Input
												placeholder='Password'
												{...field}
												type='password'
											/>
										</FormControl>
										{/* <FormDescription>
												This is your public display name.
											</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex justify-center items-center'>
								<Button type='submit'>REGISTER</Button>
							</div>
						</form>
					</Form>
				</CardContent>
				<CardFooter className='flex flex-col'>
					<p className='text-sm mb-2'>OR</p>
					<div className='grid grid-cols-2 gap-4 mb-2'>
						<Button
							variant='outline'
							onClick={() =>
								signIn("google", {
									callbackUrl: "/onboarding/1",
								}).catch(console.error)
							}
						>
							<Icons.google className='mr-2 h-4 w-4' />
							Google
						</Button>
						<Button
							variant='outline'
							onClick={() =>
								signIn("github", {
									callbackUrl: "/onboarding/1",
								}).catch(console.error)
							}
						>
							<Icons.gitHub className='mr-2 h-4 w-4' />
							Github
						</Button>
					</div>
					<p className='text-sm mb-2'>
						Already Have an Account? <Link href='/login'>Login</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
