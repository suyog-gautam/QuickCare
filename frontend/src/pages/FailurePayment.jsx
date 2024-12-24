import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function FailurePayment() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quick Care
          </CardTitle>
          <CardDescription className="text-center">
            Payment Failed
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="mx-auto text-red-500 w-16 h-16 mb-4" />
          <p className="text-lg mb-4">
            We're sorry, but your payment could not be processed.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Please check your payment details and try again. If the problem
            persists, contact our support team.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link to="/payment">
            <Button>Try Again</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
