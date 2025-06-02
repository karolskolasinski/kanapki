type InputProps = {
  name: string;
  type?: string;
  value?: string | number | boolean;
  checked?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  const { name, type = "text", value, handleChange } = props;
  const labelMap: { [key: string]: string } = {
    name: "Nazwa",
    email: "Email",
    fullName: "Imię i nazwisko",
    model: "Model",
    registration: "Rejestracja",
    location: "Lokalizacja",
    role: "Rola",
    category: "Kategoria",
    price: "Cena",
    weight: "Waga",
    kcal: "Kalorie",
    protein: "Białko",
    fat: "Tłuszcz",
    carbs: "Węglowodany",
    vege: "Wegetariańskie",
    vegan: "Wegańskie",
    glutenFree: "Bez glutenu",
    lactoseFree: "Bez laktozy",
    sugarFree: "Bez cukru",
    password: "Hasło",
  };

  if (type === "switcher") {
    return (
      <label className="inline-flex items-center cursor-pointer pr-3">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          defaultChecked={props.checked}
          onChange={handleChange}
        />
        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600" />
      </label>
    );
  }

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
                className="sr-only peer h-10 w-fit"
                required
                checked={value === role}
                onChange={handleChange}
              />
              <label
                htmlFor={role.toLowerCase()}
                className="flex items-center p-2 h-10 bg-white border border-gray-300 rounded-xl cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-purple-800 hover:bg-gray-50"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (type === "checkbox" || type === "ingredient" || type === "userId") {
    return (
      <div>
        <input
          type="checkbox"
          id={name}
          name={name}
          className="sr-only peer h-10 w-fit"
          onChange={handleChange}
          checked={props.checked ?? false}
          {...type === "ingredient" || type === "userId" ? { value: type } : {}}
        />
        <label
          htmlFor={name}
          className="flex items-center p-2 h-10 bg-white border border-gray-300 rounded-xl cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-purple-800 hover:bg-gray-50"
        >
          {value}
        </label>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm text-gray-600 my-1">{labelMap[name]}</label>
      <input
        type={type}
        name={name}
        value={typeof value === "string" ? value : ""}
        onChange={handleChange}
        className="w-full h-10 p-2 bg-white border border-gray-300 rounded-xl"
        // required={name !== "location"}
        min={type === "number" ? 0 : undefined}
      />
    </div>
  );
}
