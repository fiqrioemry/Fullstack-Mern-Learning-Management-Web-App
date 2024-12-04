import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpFormInput } from "@/config";
import { useAuth } from "@/context/AuthProvider";
import FormCard from "@/components/form/form-card";
import { Link } from "react-router-dom";

const signUpPage = () => {
  const { signUpFormData, setSignUpFormData, authNotif, handleSignUpUser } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAuth();

  const signUpValidation = () => {
    return signUpFormData && !signUpFormData.email && !signUpFormData.password;
  };
  return (
    <main className="bg-muted">
      <section className="h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Join to LearnSphere
            </CardTitle>
            <CardDescription>
              Sign up and learn an awesome videos from learnSphere
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormCard
              buttonTitle={"Sign Up"}
              handleSubmit={handleSignUpUser}
              formData={signUpFormData}
              setFormData={setSignUpFormData}
              formInput={signUpFormInput}
              isButtonDisabled={signUpValidation()}
              isButtonLoading={authNotif.loading}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <CardDescription>
              Already have an account ? Signin{" "}
              <Link to="/auth/sign-in">
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

export default signUpPage;
