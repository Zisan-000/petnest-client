"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

const Login = () => {
  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Logged In successfully");
      redirect("/");
    }
    if (error) {
      toast.error("Error:", error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success("Logged In successfully");
      // redirect("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen my-10">
      <h1 className="text-center font-bold text-5xl">Sign In</h1>
      <Card className="border my-10 w-96 p-10 mx-auto">
        <Form onSubmit={handleSignin} className="flex flex-col gap-4 mt-10">
          {/* 3. EMAIL FIELD */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* 4. PASSWORD FIELD */}
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password did not matched";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password did not matched";
              }
              if (!/[a-z]/.test(value)) {
                return "Password did not matched";
              }
              if (!/[0-9]/.test(value)) {
                return "Password did not matched";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            {/* <Description>
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description> */}
            <FieldError />
          </TextField>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <Button type="submit">
              <Check />
              Submit
            </Button>
            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>
        </Form>
        <div>
          Do not have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="bordered"
          className="w-full font-semibold bg-linear-to-r from-blue-300 to-green-300 border-default-200 text-black hover:bg-default-100"
        >
          <FaGoogle className="" size={16} />
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
