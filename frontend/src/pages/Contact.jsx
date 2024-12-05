import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { assets } from "../assets/assets";
export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#5f6fff]">
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#5f6fff]" />
                <p>Shivaght, Bharatpur-4, Chitwan, Nepal</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#5f6fff]" />
                <p>+977 9811156986</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#5f6fff]" />
                <p>contact.quickcare@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#5f6fff]" />
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#5f6fff]">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email Address" />
                <Input placeholder="Subject" />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="max-h-28"
                />
                <Button className="w-full bg-[#5f6fff] hover:bg-[#5f6fff]/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <img
            src={assets.contact_image}
            alt="Healthcare professionals"
            className="rounded-lg shadow-lg w-full max-h-[440px] object-cover"
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#5f6fff]">
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                At Quick Care, we're dedicated to providing you with the best
                possible healthcare experience. Our team is always here to
                assist you with any questions, concerns, or feedback you may
                have. We value your input as it helps us continually improve our
                services and ensure we're meeting your healthcare needs
                effectively.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-[#5f6fff]">
              Find Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2100.90945917676!2d84.37808285421308!3d27.67729236289306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1733390618387!5m2!1sen!2snp"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
