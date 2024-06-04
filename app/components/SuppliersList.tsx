import { Supplier } from "@/types";
import SupplierItem from "./SupplierItem";
import { useTheme } from "next-themes";

interface SuppliersListProps {
  suppliers: Supplier[] | null;
}

const SuppliersList = ({ suppliers }: SuppliersListProps) => {
  const { theme } = useTheme();

  return (
    <div className=" w-full min-w-[100px]  ">
      <table
        className={` w-full min-w-[100px] 
     
      max-h-full overflow-y-scroll  mt-10 shadow-custom !rounded-lg ${
        theme == "light" ? "shadow-custom" : "shadow-customDark"
      }`}
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CNPJ</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {suppliers
            ? suppliers.map((supplier) => (
                <SupplierItem key={supplier.document} supplier={supplier} />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersList;
