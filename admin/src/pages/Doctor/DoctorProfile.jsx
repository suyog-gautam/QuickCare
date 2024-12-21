"use client";

import { useState, useEffect } from "react";
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

import axios from "axios";
import { Loader } from "@/components/Loader";
import { UseDoctorContext } from "@/context/DoctorContext";

const doctorProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  speciality: z.string().min(1, "Please select a speciality"),
  email: z.string().email("Invalid email address"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),

  address: z.string().min(5, "Address must be at least 5 characters"),
  experience: z.string().min(1, "Please select experience"),
  fees: z.number().min(0, "Fees must be a positive number"),
  about: z
    .string()
    .max(500, "About me must not exceed 500 characters")
    .min(20, "About me must not be less than 20 characters"),
});

export function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  // Track selected image file
  const { doctorData, setDoctorData, getDoctorData, dToken, backendUrl } =
    UseDoctorContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: doctorData,
  });

  useEffect(() => {
    if (doctorData) {
      reset(doctorData);
      setImagePreview(doctorData.image);
    }
  }, [doctorData, reset]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Generate preview
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append other fields to FormData
    Object.keys(data).forEach((key) => {
      const value = data[key];
      // If the value is an object, stringify it; else, append the value directly
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value)); // Convert object to JSON string if necessary
      } else {
        formData.append(key, value.toString()); // Convert to string for other fields
      }
    });

    // If there's a selected image, append it as well
    if (selectedImage) {
      formData.append("image", selectedImage); // Assuming selectedImage is a file (e.g., image)
    }
    formData.append("doctorId", doctorData._id);
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${backendUrl}/api/doctor/updateProfile`,
        formData,
        {
          headers: {
            dToken,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Profile updated successfully");
        setImagePreview(null);
        setSelectedImage(null);
        getDoctorData();
        setDoctorData(data);
        setIsEditing(false);
        reset();
      } else {
        toast.error(
          response.data.message +
            (response.data.missingFields
              ? `: ${response.data.missingFields.join(", ")}`
              : "") || "Error occurred while updating profile"
        );
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  return (
    doctorData && (
      <div className="container mx-auto p-4 max-w-2xl my-4">
        {isLoading && <Loader loaderText="Updating Profile..." />}
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center space-y-4 pb-8">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={isEditing ? imagePreview : doctorData.image}
                  alt="Profile"
                />
                <AvatarFallback>
                  {doctorData?.name.slice(0, 2).toUpperCase()}
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
              name="name"
              control={control}
              render={({ field }) =>
                isEditing ? (
                  <Input
                    {...field}
                    className="text-center text-2xl font-semibold"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold">{doctorData.name}</h2>
                )
              }
            />
            {isEditing && errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
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
                          <p className="text-sm">{doctorData.email}</p>
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
                    <Label>Degree:</Label>
                    <Controller
                      name="degree"
                      control={control}
                      render={({ field }) =>
                        isEditing ? (
                          <Input {...field} />
                        ) : (
                          <p className="text-sm">{doctorData.degree}</p>
                        )
                      }
                    />
                    {isEditing && errors.degree && (
                      <p className="text-sm text-red-500">
                        {errors.degree.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Experience:</Label>
                    <Controller
                      name="experience"
                      control={control}
                      render={({ field }) =>
                        isEditing ? (
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
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
                        ) : (
                          <p className="text-sm">
                            {doctorData.experience} years
                          </p>
                        )
                      }
                    />
                    {isEditing && errors.experience && (
                      <p className="text-sm text-red-500">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Fees:</Label>
                    <Controller
                      name="fees"
                      control={control}
                      render={({ field }) =>
                        isEditing ? (
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value)
                              )
                            } // Convert to number
                          />
                        ) : (
                          <p className="text-sm">{doctorData.fees} USD</p>
                        )
                      }
                    />
                    {isEditing && errors.fees && (
                      <p className="text-sm text-red-500">
                        {errors.fees.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium text-muted-foreground">
                  ADDITIONAL INFORMATION
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Specialty:</Label>
                    <Controller
                      name="speciality"
                      control={control}
                      render={({ field }) =>
                        isEditing ? (
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select speciality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general physician">
                                General physician
                              </SelectItem>
                              <SelectItem value="Gynecologist">
                                Gynecologist
                              </SelectItem>

                              <SelectItem value="Dermatologist">
                                Dermatologist
                              </SelectItem>
                              <SelectItem value="Neurologist">
                                Neurologist
                              </SelectItem>
                              <SelectItem value="Gastroenterologist">
                                Gastroenterologist
                              </SelectItem>
                              <SelectItem value="Pediatricians">
                                Pediatricians
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm">{doctorData.speciality}</p>
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Availability:</Label>
                    <Controller
                      name="available"
                      control={control}
                      render={({ field }) =>
                        isEditing ? (
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              value={field?.value ? true : false}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Availability" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={true}>Available</SelectItem>
                                <SelectItem value={false}>
                                  Not Available
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <p className="text-sm">
                            {doctorData.available
                              ? "Available"
                              : "Not Available"}
                          </p>
                        )
                      }
                    />
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
                          <p className="text-sm">{doctorData.address}</p>
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>About:</Label>
                    <Controller
                      name="about"
                      control={control}
                      render={({ field }) =>
                        isEditing ? (
                          <Input {...field} />
                        ) : (
                          <p className="text-sm">{doctorData.about}</p>
                        )
                      }
                    />
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
                      onClick={() => {
                        setIsEditing(false);
                        setImagePreview(doctorData.image);
                      }}
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
    )
  );
}
