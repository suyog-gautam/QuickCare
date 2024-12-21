"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseAdminContext } from "@/context/AdminContext";
import axios from "axios";

const doctorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  speciality: z.string().min(1, "Please select a speciality"),
  email: z.string().email("Invalid email address"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  experience: z.string().min(1, "Please select experience"),
  fees: z.number().min(0, "Fees must be a positive number"),
  about: z
    .string()
    .max(500, "About me must not exceed 500 characters")
    .min(20, "About me must not be less than 20 characters"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Please upload an image"),
});

export function AddDoctor() {
  const [imagePreview, setImagePreview] = useState(null);
  const { backendUrl, aToken } = UseAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(doctorSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, key === "fees" ? data[key].toString() : data[key]);
      });

      const response = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Doctor added successfully");
        setImagePreview(null);
        reset();
      } else {
        toast.error(
          response.data.message || "Error occurred while adding doctor"
        );
      }
    } catch (error) {
      toast.error("Failed to add doctor. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    aToken && (
      <div className="p-6 space-y-6">
        {isLoading && <Loader loaderText="Adding Doctor..." />}
        <Card className="w-full max-w-4xl mx-auto p-6">
          <CardHeader>
            <CardTitle className="text-2xl">Add Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={imagePreview || ""} alt="Preview" />
                    <AvatarFallback>Image</AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={handleImageChange}
                    className="hidden"
                    id="doctor-image"
                  />
                  <Label
                    htmlFor="doctor-image"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
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
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <line x1="16" x2="22" y1="5" y2="5" />
                      <line x1="19" x2="19" y1="2" y2="8" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </Label>
                </div>
                <span className="text-sm text-muted-foreground">
                  Upload doctor picture
                </span>
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Doctor Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter doctor's name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speciality">Speciality</Label>
                  <Select
                    onValueChange={(value) => setValue("speciality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general physician">
                        General physician
                      </SelectItem>
                      <SelectItem value="Gynecologist">Gynecologist</SelectItem>

                      <SelectItem value="Dermatologist">
                        Dermatologist
                      </SelectItem>
                      <SelectItem value="Neurologist">Neurologist</SelectItem>
                      <SelectItem value="Gastroenterologist">
                        Gastroenterologist
                      </SelectItem>
                      <SelectItem value="Pediatricians">
                        Pediatricians
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.speciality && (
                    <p className="text-sm text-red-500">
                      {errors.speciality.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Doctor Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Doctor Password</Label>

                  <PasswordInput
                    id="password"
                    placeholder="******"
                    autoComplete="current-password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    {...register("degree")}
                    placeholder="Enter degree details"
                  />
                  {errors.degree && (
                    <p className="text-sm text-red-500">
                      {errors.degree.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    {...register("address")}
                    placeholder="Enter address"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Select
                    onValueChange={(value) => setValue("experience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="2">2 years</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="4">4 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="6">6 years</SelectItem>
                      <SelectItem value="7">7 years</SelectItem>
                      <SelectItem value="8">8 years</SelectItem>
                      <SelectItem value="9">9 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-sm text-red-500">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fees">Fees</Label>
                  <Input
                    id="fees"
                    type="number"
                    {...register("fees", { valueAsNumber: true })}
                    placeholder="Enter consultation fees"
                  />
                  {errors.fees && (
                    <p className="text-sm text-red-500">
                      {errors.fees.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About me</Label>
                <Textarea
                  id="about"
                  {...register("about")}
                  placeholder="Write about yourself"
                  className="min-h-[100px] max-h-[200px]"
                />
                {errors.about && (
                  <p className="text-sm text-red-500">{errors.about.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Add doctor
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  );
}
