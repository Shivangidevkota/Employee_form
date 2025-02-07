import { useState } from "react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";

const EmployeeForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    hobbies: "",
    address: "",
  });

  // State to manage error messages
  const [errors, setErrors] = useState({});

  // State to track form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to validate form data
  const validateForm = () => {
    let validationErrors = {};

    // First and Last name validation (Required and alphabets only)
    if (!formData.firstName.match(/^[A-Za-z]+$/))
      validationErrors.firstName = "First name is required and should contain only alphabets";

    if (!formData.lastName.match(/^[A-Za-z]+$/))
      validationErrors.lastName = "Last name is required and should contain only alphabets";

    // Middle Name validation (Optional but should contain only alphabets if entered)
    if (formData.middleName && !formData.middleName.match(/^[A-Za-z]+$/))
      validationErrors.middleName = "Middle name should contain only alphabets";

    // Date of Birth validation (Required, must be in DD/MM/YYYY format, and person must be 18+ years old)
    if (!formData.dob) {
      validationErrors.dob = "Date of Birth is required";
    } else {
      const dobParts = formData.dob.split("/");
      if (dobParts.length !== 3 || dobParts[0].length !== 2 || dobParts[1].length !== 2 || dobParts[2].length !== 4) {
        validationErrors.dob = "Date must be in DD/MM/YYYY format";
      } else {
        const day = parseInt(dobParts[0], 10);
        const month = parseInt(dobParts[1], 10) - 1;
        const year = parseInt(dobParts[2], 10);
        const birthDate = new Date(year, month, day);
        const age = new Date().getFullYear() - birthDate.getFullYear();

        if (isNaN(birthDate) || birthDate > new Date()) {
          validationErrors.dob = "Enter a valid past date";
        } else if (age < 18) {
          validationErrors.dob = "Employee must be at least 18 years old";
        }
      }
    }

    // Phone Number validation (10 digits required)
    if (!formData.phone.match(/^\d{10}$/))
      validationErrors.phone = "Phone number must be exactly 10 digits";

    // Email validation (Valid email format)
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      validationErrors.email = "Please enter a valid email address";

    // Address validation (Required, max 100 characters)
    if (!formData.address.trim()) {
      validationErrors.address = "Address is required";
    } else if (formData.address.length > 100) {
      validationErrors.address = "Address cannot exceed 100 characters";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Data is saved successfully!");
      console.log("Employee Data Submitted:", JSON.stringify(formData, null, 2));
      
      // Reset form fields after successful submission
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: "",
        hobbies: "",
        address: "",
      });
      setIsSubmitted(true);
    } else {
      alert("Mandatory field(s) missing");
    }
  };

  return (
    <div className="form-container">
      <h2>Employee Registration Form</h2>
      {!isSubmitted ? (
        <form onSubmit={handleFormSubmit}>
          {/* Input Fields */}
          <FormInput
            label="First Name (*required)"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            error={errors.firstName}
          />

          <FormInput
            label="Middle Name (optional)"
            name="middleName"
            type="text"
            value={formData.middleName}
            onChange={handleInputChange}
            placeholder="Enter Middle Name (Optional)"
            error={errors.middleName}
          />

          <FormInput
            label="Last Name (*required)"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            error={errors.lastName}
          />

          <FormInput
            label="Date of Birth (*required) (DD/MM/YYYY)"
            name="dob"
            type="text"
            value={formData.dob}
            onChange={handleInputChange}
            placeholder="Enter Date of Birth (DD/MM/YYYY)"
            error={errors.dob}
          />

          <FormInput
            label="Phone Number (*required)"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter 10-digit Phone Number"
            error={errors.phone}
          />

          <FormInput
            label="Email ID (*required)"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Valid Email"
            error={errors.email}
          />

          <FormInput
            label="Hobbies (optional)"
            name="hobbies"
            type="text"
            value={formData.hobbies}
            onChange={handleInputChange}
            placeholder="Enter Your Hobbies"
          />

          <FormTextarea
            label="Address (*required)"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address (max 100 characters)"
            error={errors.address}
            maxLength="100"
          />

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      ) : (
        <div className="submitted-message">
          <h3>Your form has been successfully submitted!</h3>
          <button onClick={() => setIsSubmitted(false)} className="back-btn">
            Back to Form
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeForm;