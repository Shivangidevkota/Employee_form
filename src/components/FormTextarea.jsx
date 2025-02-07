// Creating a form text area field

const FormTextarea = ({ label, name, value, onChange, placeholder, error, maxLength }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}:</label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  };
  
  export default FormTextarea;
  