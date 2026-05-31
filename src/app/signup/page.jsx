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
import { toast } from "react-toastify";

const SignUp = () => {
  const passwordRef = React.useRef(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.photoUrl,
      callbackURL: "/dashboard",
    });

    if (data) {
      redirect("/");
    }
    if (error) {
      toast.error("Error:", error);
    }

    // //console.log(user);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen my-10">
      <h1 className="text-center font-bold text-5xl">Sign Up</h1>
      <Card className="border my-10 w-96 p-10 mx-auto">
        <Form onSubmit={handleSignup} className="flex flex-col gap-4 mt-10">
          {/* 1. NAME FIELD */}
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (value.trim().length < 2) {
                return "Name must be at least 2 characters long";
              }
              return null;
            }}
          >
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

          {/* 2. PHOTO URL FIELD */}
          <TextField
            isRequired
            name="photoUrl"
            type="url"
            validate={(value) => {
              if (!/^https?:\/\/.+/i.test(value)) {
                return "Please enter a valid image URL (starting with http:// or https://)";
              }
              return null;
            }}
          >
            <Label>Photo URL</Label>
            <Input placeholder="https://example.com/profile.jpg" />
            <FieldError />
          </TextField>

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
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input ref={passwordRef} placeholder="Enter your password" />
            {/* <Description>
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description> */}
            <FieldError />
          </TextField>

          {/* 5. CONFIRM PASSWORD FIELD */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) => {
              // Safely extract what is physically inside the primary password input right now
              const primaryPasswordValue = passwordRef.current?.value;

              if (value !== primaryPasswordValue) {
                return "Passwords do not match";
              }
              return null;
            }}
          >
            <Label>Confirm Password</Label>
            <Input placeholder="Retype your password" />
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
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
