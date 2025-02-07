// Creating a form input field

const FormInput = ({ label, name, type, value, onChange, placeholder, error }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}:</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  };
  
  export default FormInput;
  