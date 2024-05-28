
export const FormInput = ({ id, name, type, autoComplete, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {placeholder}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );