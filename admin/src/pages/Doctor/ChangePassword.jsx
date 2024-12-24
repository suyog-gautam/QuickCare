"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { UseDoctorContext } from "@/context/DoctorContext";
import { UseAdminContext } from "@/context/AdminContext";
import axios from "axios";

const formSchema = z.object({
  oldpassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  newpassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export function ChangePassword() {
  const { backendUrl } = UseAdminContext();
  const { dToken, setDToken } = UseDoctorContext();
  let navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldpassword: "",
      newpassword: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/changePassword`,
        values,
        {
          headers: {
            dToken,
          },
        }
      );

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  }

  return (
    <div className="login-container flex flex-col min-h-[80vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            <span className="text-[#645fff]">Change</span> Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="oldpassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Current Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="oldpassword"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newpassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">New Password</FormLabel>
                      </div>

                      <FormControl>
                        <PasswordInput
                          id="newpassword"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-white  hover:text-white"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
