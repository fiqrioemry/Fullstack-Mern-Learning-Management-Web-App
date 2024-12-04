import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFormInput } from "@/config";
import { useAuth } from "@/context/AuthProvider";
import FormCard from "@/components/form/form-card";

const SignInPage = () => {
  const { signInFormData, setSignInFormData, authNotif, handleSignInUser } =
    useAuth();

  const signInValidation = () => {
    return signInFormData && !signInFormData.email && !signInFormData.password;
  };
  return (
    <main className="min-h-screen">
      <section className="py-4 h-[88vh] bg-muted flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Sign in to LearnSphere
            </CardTitle>
            <CardDescription>
              Please enter your account information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormCard
              buttonTitle={"Sign In"}
              handleSubmit={handleSignInUser}
              formData={signInFormData}
              setFormData={setSignInFormData}
              formInput={SignInFormInput}
              isButtonDisabled={signInValidation()}
              isButtonLoading={authNotif.loading}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default SignInPage;
