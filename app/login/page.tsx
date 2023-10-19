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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
// import { loginSchema } from "../schemas/login";
// type Input = z.infer<typeof loginSchema>;

export default function LogInPage() {
	const router = useRouter();

	const form = useForm({
		// resolver: zodResolver(loginSchema),
	});
	function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		// e.preventDefault();
		signIn("credentials", {
			...values,
			redirect: false,
		});
		router.push("/dashboard");
	}

	return (
		<div className='flex justify-center items-center min-h-screen'>
			<Card className=' w-1/3'>
				<CardHeader>
					<CardTitle>Welcome!</CardTitle>
					<CardDescription>Login To Your Account</CardDescription>
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
								<Button type='submit' className='w-full'>
									LOGIN
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
								callbackUrl: "/onboarding/1",
							}).catch(console.error)
						}
						className='w-full mb-4'
					>
						<Icons.google className='mr-2 h-4 w-4' />
						Google
					</Button>

					<p className='text-sm mb-2'>
						Dont have an Account? <Link href='/signup'>SIGN UP</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
