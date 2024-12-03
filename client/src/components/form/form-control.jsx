import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

// eslint-disable-next-line react/prop-types
const FormControl = ({ formInput = [], formData, setFormData }) => {
  function renderComponentByType(getInputControl) {
    let element = null;
    const currentControlItemValue = formData[getInputControl.name] || "";

    switch (getInputControl.componentType) {
      case "input":
        element = (
          <Input
            id={getInputControl.name}
            name={getInputControl.name}
            placeholder={getInputControl.placeholder}
            type={getInputControl.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getInputControl.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getInputControl.name]: value,
              })
            }
            value={currentControlItemValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getInputControl.label} />
            </SelectTrigger>
            <SelectContent>
              {getInputControl.options && getInputControl.options.length > 0
                ? getInputControl.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getInputControl.name}
            name={getInputControl.name}
            placeholder={getInputControl.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getInputControl.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            id={getInputControl.name}
            name={getInputControl.name}
            placeholder={getInputControl.placeholder}
            type={getInputControl.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getInputControl.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formInput.map((inputItem) => (
        <div key={inputItem.name}>
          <Label htmlFor={inputItem.name}>{inputItem.label}</Label>
          {renderComponentByType(inputItem)}
        </div>
      ))}
    </div>
  );
};

export default FormControl;
