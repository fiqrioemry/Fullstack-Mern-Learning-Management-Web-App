/* eslint-disable react/prop-types */
import Spinner from "../ui/Spinner";
import { Button } from "../ui/button";
import FormControl from "./form-control";

const FormCard = ({
  handleSubmit,
  formData,
  setFormData,
  formInput,
  isButtonDisabled,
  isButtonLoading,
  buttonTitle,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl
          formData={formData}
          setFormData={setFormData}
          formInput={formInput}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isButtonDisabled || isButtonLoading}
        >
          {isButtonLoading ? <Spinner /> : buttonTitle}
        </Button>
      </form>
    </div>
  );
};

export default FormCard;
