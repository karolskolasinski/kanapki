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
  };

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
