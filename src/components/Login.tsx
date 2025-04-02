import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { LoginFormData } from "@/types/LoginFormData";


type LoginProps = {
  doLogin: (LoginFormData: LoginFormData) => void;
};

export default function Login({ doLogin }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    doLogin(formData);
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your name and email to proceed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} name="loginForm">
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="name">Name</Label>
                      </div>
                      <Input
                        name="name"
                        id="name"
                        type="name"
                        required
                        placeholder="Name"
                        autoComplete="firstname"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="benjamin_franklin@example.com"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
