// Import necessary UI components
import { Input } from "../ui/input"; // Input component for text, email, etc.
import { Label } from "../ui/label"; // Label component to display field labels
import { Button } from "../ui/button"; // Button component for form submission
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // Select component and its sub-components for dropdowns
import { Textarea } from "../ui/textarea"; // Textarea component for multi-line text input

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText ,isBtnDisabled}) {
  // Function to dynamically render form elements based on the componentType
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || ''; // Get the current value from formData or default to an empty string

    // Switch case to handle different input types like "input", "select", "textarea"
    switch (getControlItem.componentType) {
      case "input":
        // Render an Input field for text, email, etc.
        element = (
          <Input
            name={getControlItem.name} // Name for identifying the input field
            placeholder={getControlItem.placeholder} // Placeholder text for the input
            id={getControlItem.name} // ID for the input element
            type={getControlItem.type} // Type of input (e.g., text, password, etc.)
            value={value} // Bind the value from formData
            onChange={event => setFormData({
              ...formData, // Update the formData state
              [getControlItem.name]: event.target.value // Set new value for the specific input
            })}
          />
        );
        break;

      case "select":
        // Render a Select dropdown for choosing options
        element = (
          <Select
            onValueChange={(value) => setFormData({
              ...formData, // Update the formData state
              [getControlItem.name]: value // Set the selected value for the specific select field
            })}
            value={value} // Bind the selected value from formData
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} /> {/* Display the selected or placeholder text */}
            </SelectTrigger>

            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label} {/* Display each option's label */}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        // Render a Textarea for multi-line text input
        element = (
          <Textarea
            name={getControlItem.name} // Name for identifying the textarea
            placeholder={getControlItem.placeholder} // Placeholder text for the textarea
            id={getControlItem.id} // ID for the textarea
            value={value} // Bind the value from formData
            onChange={event => setFormData({
              ...formData, // Update the formData state
              [getControlItem.name]: event.target.value // Set new value for the specific textarea
            })}
          />
        );
        break;

      default:
        // Default to rendering a basic input field if no specific type is provided
        element = (
          <Input
            name={getControlItem.name} // Name for identifying the input
            placeholder={getControlItem.placeholder} // Placeholder text for the input
            id={getControlItem.name} // ID for the input element
            type={getControlItem.type} // Type of input (default case)
          />
        );
        break;
    }
    return element; // Return the rendered input element
  }

  // Main render of the form
  return (
    <form onSubmit={onSubmit}> {/* Attach the form submission handler */}
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label> {/* Display the label for each form control */}
            {renderInputsByComponentType(controlItem)} {/* Render the input element dynamically based on its type */}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={isBtnDisabled}>
        {buttonText || "Submit"} {/* Display the button text, default to "Submit" if none is provided */}
      </Button>
    </form>
  );
}

export default CommonForm;
