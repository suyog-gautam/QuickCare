"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

const profileSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((value) => value !== "Not Selected", {
      message: "Please select a gender",
    }),
  birthday: z.string().min(1, "Birthday is required"),
  birthday: z.string().date("Birthday is required"),
});

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "Suyog",
    email: "op2@gmail.com",
    phone: "000000000",
    address: "op",
    gender: "Not Selected",
    birthday: "Not Selected",
    photo: "/placeholder.svg",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const onSubmit = (data) => {
    setProfile(data);
    setIsEditing(false);
    toast.success("Your Profile Updated Successfully");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl my-4">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center space-y-4 pb-8">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.photo} alt="Profile" />
              <AvatarFallback>
                {profile.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </Label>
            )}
          </div>
          <Controller
            name="username"
            control={control}
            render={({ field }) =>
              isEditing ? (
                <Input
                  {...field}
                  className="text-center text-2xl font-semibold"
                />
              ) : (
                <h2 className="text-2xl font-semibold">{profile.username}</h2>
              )
            }
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-muted-foreground">
                CONTACT INFORMATION
              </h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Email Id:</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} />
                      ) : (
                        <p className="text-sm">{profile.email}</p>
                      )
                    }
                  />
                  {isEditing && errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone:</Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} />
                      ) : (
                        <p className="text-sm">{profile.phone}</p>
                      )
                    }
                  />
                  {isEditing && errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Address:</Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} />
                      ) : (
                        <p className="text-sm">{profile.address}</p>
                      )
                    }
                  />
                  {isEditing && errors.address && (
                    <p className="text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium text-muted-foreground">
                BASIC INFORMATION
              </h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Gender:</Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) =>
                      isEditing ? (
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            value={field?.value}
                            defaultValue="Not Selected"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Gender"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <p className="text-sm">{profile.gender}</p>
                      )
                    }
                  />

                  {isEditing && errors.gender && (
                    <p className="text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Birthdate:</Label>
                  <Controller
                    name="birthday"
                    control={control}
                    render={({ field }) =>
                      isEditing ? (
                        <div>
                          <Input
                            defaultValue={field.value}
                            type="date"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </div>
                      ) : (
                        <p className="text-sm">{profile.birthday}</p>
                      )
                    }
                  />

                  {isEditing && errors.birthday && (
                    <p className="text-sm text-red-500">
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-start pt-6">
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    className="w-24 mr-2 bg-primary text-white hover:bg-[#6181ff]"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="w-24 hover:bg-[#fbfbfb]"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  type="button" // Change this to "button"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    setIsEditing(true);
                  }}
                  className="w-24"
                >
                  Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
