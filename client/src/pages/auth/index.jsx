import FormCard from "@/components/form/form-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFormInput } from "@/config";
import { useAuth } from "@/context/AuthProvider";
import { SiSololearn } from "react-icons/si";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const { signInFormData, setSignInFormData, authLoading, handleLoginUser } =
    useAuth();

  const formInputValidation = () => {
    return signInFormData && !signInFormData.email && !signInFormData.password;
  };
  return (
    <main className="min-h-screen">
      <header className="py-4 border-b">
        <nav className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center justify-center gap-x-4">
            <SiSololearn className="h-9 w-9" />
            <span className="text-2xl font-extrabold tracking-[2px]">
              LearnSphere
            </span>
          </Link>
        </nav>
      </header>
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
              handleSubmit={handleLoginUser}
              formData={signInFormData}
              setFormData={setSignInFormData}
              formInput={SignInFormInput}
              isButtonDisabled={formInputValidation()}
              isButtonLoading={authLoading}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AuthPage;
