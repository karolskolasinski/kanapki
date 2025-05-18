type InputProps = {
  name: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  const { name, value, handleChange } = props;
  const labelMap: { [key: string]: string } = {
    name: "Nazwa",
    email: "Email",
    fullName: "Imię i nazwisko",
    model: "Model",
    registration: "Rejestracja",
    location: "Lokalizacja",
    password: "Hasło",
    role: "Rola",
  };

  if (name === "role") {
    return (
      <div>
        <div className="block text-sm text-gray-600 my-1">{labelMap[name]}</div>
        <ul className="flex gap-3">
          {["admin", "manager"].map((role) => (
            <li key={role}>
              <input
                type="radio"
                id={role}
                name="role"
                value={role}
                className="sr-only peer h-[42px] w-fit"
                required
                checked={value === role}
                onChange={handleChange}
              />
              <label
                htmlFor={role.toLowerCase()}
                className="block p-2 bg-white border border-gray-300 rounded-xl cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-purple-800 hover:bg-gray-50"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm text-gray-600 my-1">{labelMap[name]}</label>
      <input
        type={inputType()}
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-xl"
        required={name !== "location"}
      />
    </div>
  );

  function inputType() {
    if (name === "email") return "email";
    if (name === "password" && value && value.length > 10) return "password";

    return "text";
  }
}
