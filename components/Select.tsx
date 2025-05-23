import { User } from "@/app/dashboard/users/page";

type SelectProps = {
  name: string;
  value?: string;
  options?: User[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select(props: SelectProps) {
  const { name, value, options, handleChange } = props;

  return (
    <div>
      <label className="block text-sm text-gray-600 my-1">Pojazd</label>
      <select
        name={name}
        onChange={handleChange}
        className="w-full h-10 p-2 border border-gray-300 rounded-xl"
        required
        defaultValue=""
        value={value}
      >
        <option value="" disabled>Wybierz pojazd</option>
        {options?.map((option: User) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
