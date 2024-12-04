import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { SignInFormInput } from "@/config";
import { useAuth } from "@/context/AuthProvider";
import FormCard from "@/components/form/form-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const { signInFormData, setSignInFormData, authNotif, handleSignInUser } =
    useAuth();

  const signInValidation = () => {
    return signInFormData && !signInFormData.email && !signInFormData.password;
  };
  return (
    <main className="bg-muted">
      <section className="h-screen  flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Sign in to LearnSphere
            </CardTitle>
            <CardDescription>
              Please enter your account information below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormCard
              buttonTitle={"Sign In"}
              handleSubmit={handleSignInUser}
              formData={signInFormData}
              setFormData={setSignInFormData}
              formInput={SignInFormInput}
              isButtonDisabled={signInValidation()}
              isButtonLoading={authNotif.loading}
            />
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 font-medium">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Button variant="primary" className="w-full border border-black">
              <FcGoogle />
              <span>Login with google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <CardDescription>
              Dont have an account ? Signup{" "}
              <Link to="/auth/sign-up">
                <span className="font-semibold hover:text-accent-foreground">
                  here
                </span>
              </Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default SignInPage;
