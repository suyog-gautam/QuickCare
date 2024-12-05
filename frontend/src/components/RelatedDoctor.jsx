import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { UseAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
export default function RelatedDoctor({ speciality, currentDoctor }) {
  const { doctors } = UseAppContext();
  const relatedDoctors = doctors.filter(
    (doctor) => doctor.speciality === speciality && doctor._id !== currentDoctor
  );
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Related Doctors</h2>
        <p className="text-gray-600">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="group hover:shadow-lg transition-shadow duration-200"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth", // Enables smooth scrolling
              });
              navigate(`/appointment/${doctor._id}`);
            }}
          >
            <CardContent className="p-6">
              <div className="relative mb-6">
                <Avatar className="w-full h-48 rounded-xl">
                  <AvatarImage
                    src={doctor.image}
                    alt={doctor.name}
                    className="object-cover border-2 rounded-full"
                  />
                  <AvatarFallback>{doctor.initials}</AvatarFallback>
                </Avatar>
                <Badge
                  variant={doctor.available ? "default" : "secondary"}
                  className={`text-white
    absolute top-0 left-0
    ${doctor.available ? "bg-green-500" : "bg-gray-500"}
    hover:${doctor.available ? "bg-green-500" : "bg-gray-500"}
   
  `}
                >
                  {doctor.available ? "Available" : "Unavailable"}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-[#5f6fff] transition-colors duration-200">
                  {doctor.name}
                </h3>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
