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
import { CheckCircle2 } from "lucide-react";

export default function SuccesssPayment() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quick Care
          </CardTitle>
          <CardDescription className="text-center">
            Payment Successful
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-4" />
          <p className="text-lg mb-4">
            Your payment has been processed successfully.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            A confirmation email has been sent to your registered email address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
