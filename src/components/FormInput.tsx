interface FormInputProps {
  value: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function FormInput({
  value,
  onChange,
  placeholder,
  textarea,
  type,
  name
}: FormInputProps) {
  return (
    <div className="relative">
      {textarea == true ? (
        <textarea
          id={name}
          name={name}
          typeof={type} // 👈 control type
          onChange={onChange}
          value={value}
          rows={4}
          required
          placeholder=""
          className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl outline-none focus:border-blue-500 dark:focus:border-blue-400 peer resize-none"
        />
      ) : (
        <input
          id={name}
          type={type} // 👈 control type
          name={name}
          required
          value={value} // 👈 control value
          onChange={onChange} // 👈 constrol change
          className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl outline-none focus:border-blue-500 dark:focus:border-blue-400 peer"
        />
      )}
      <label
        htmlFor={name}
        className={`rounded-md absolute left-4 px-1 bg-white text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-[12px] ${
          value !== "" ? "-top-2 text-[12px]" : "top-3.5 text-base"
        }`}
      >
        {placeholder || "Input"}
      </label>
    </div>
  );
}
