const RadioButton = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-primary"
            checked
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-primary"
            checked
          />
        </label>
      </div>
    </div>
  );
};
export default RadioButton;
