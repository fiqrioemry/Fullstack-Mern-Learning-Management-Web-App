import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpFormInput } from "@/config";
import { useAuth } from "@/context/AuthProvider";
import FormCard from "@/components/form/form-card";

const signUpPage = () => {
  const { signUpFormData, setSignUpFormData, authNotif, handleSignUpUser } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAuth();

  const signUpValidation = () => {
    return signUpFormData && !signUpFormData.email && !signUpFormData.password;
  };
  return (
    <main className="min-h-screen">
      <section className="py-4 h-[88vh] bg-muted flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create a new Account</CardTitle>
            <CardDescription>
              Sign up and join learnSphere then find awesome things!
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
        </Card>
      </section>
    </main>
  );
};

export default signUpPage;
