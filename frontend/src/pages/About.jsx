import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Heart } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">ABOUT US</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img
            src={assets.about_image}
            alt="Healthcare professionals"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Welcome to Quick Care, your trusted partner in streamlining
            healthcare access. At Quick Care, we understand the challenges
            individuals face when it comes to finding and booking appointments
            with the right healthcare providers.
          </p>
          <p className="text-lg text-gray-700">
            Our platform is dedicated to excellence in healthcare technology. We
            continuously innovate to enhance user experience and deliver
            superior service. Whether you're scheduling your first appointment
            or managing ongoing care, Quick Care is here to support you at every
            step.
          </p>
          <div>
            <h2 className="text-2xl font-semibold text-[#5f6fff] mb-2">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700">
              At Quick Care, we envision a world where quality healthcare is
              just a click away. We aim to bridge the gap between patients and
              healthcare providers, making it easier for you to access the care
              you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">WHY CHOOSE US</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Efficiency",
              description:
                "Quick and easy appointment booking that fits seamlessly into your busy schedule.",
              icon: <Clock className="w-6 h-6 text-[#5f6fff]" />,
            },
            {
              title: "Accessibility",
              description:
                "Connect with a wide network of healthcare professionals in your area and beyond.",
              icon: <MapPin className="w-6 h-6 text-[#5f6fff]" />,
            },
            {
              title: "Patient-Centric Care",
              description:
                "Personalized health tracking and reminders to keep you on top of your wellbeing.",
              icon: <Heart className="w-6 h-6 text-[#5f6fff]" />,
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-[#5f6fff] text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Quick Care Today</h2>
        <p className="text-lg mb-6">
          Experience the future of healthcare management. Sign up now and take
          control of your health journey.
        </p>
        <Badge
          variant="secondary"
          className="text-lg px-6 py-2 bg-white text-[#5f6fff] hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Badge>
      </div>
    </div>
  );
}
