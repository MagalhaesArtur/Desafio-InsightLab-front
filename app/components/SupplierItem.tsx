import { Supplier } from "@/types";
import { useTheme } from "next-themes";
import { MdDelete, MdEdit } from "react-icons/md";

interface SupplierItem {
  supplier: Supplier;
}
const SupplierItem = ({ supplier }: SupplierItem) => {
  const { theme } = useTheme();

  return (
    <tr>
      <td>{supplier.name}</td>
      <td>{supplier.email}</td>
      <td>{supplier.document}</td>
      <td className="">
        <button
          className={`rounded-lg p-2 transition-all  inline-flex mr-2 justify-center items-center 
        ${theme == "light" ? "hover:bg-neutral-300" : "hover:bg-neutral-700"}`}
        >
          <MdEdit className="" size={20} />
        </button>
        <button
          className={`rounded-lg p-2 transition-all  inline-flex justify-center items-center 
        ${theme == "light" ? "hover:bg-red-500" : "hover:bg-red-700"}`}
        >
          <MdDelete className="" size={20} />
        </button>
      </td>
    </tr>
  );
};

export default SupplierItem;
