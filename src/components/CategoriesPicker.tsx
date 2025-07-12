import { ICategoryWithId } from "@/models/Category";

interface FormInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: ICategoryWithId[] | [];
}

export default function CategoriesPicker({ onChange, categories }: FormInputProps) {

    if (!categories || categories.length === 0) {
        return <p className="text-red-500">No categories available</p>;
    }

  return (
    <div className="">
      <label htmlFor="dropdown" className="block mb-2 font-semibold">
        Select Category
      </label>
      <select
        id="dropdown"
        onChange={onChange}
        className="border border-gray-300 rounded-md px-4 py-2"
      >
        <option key={-1} value="">Select Category</option>
        {categories.map((category, i) => (
          <option key={i} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
