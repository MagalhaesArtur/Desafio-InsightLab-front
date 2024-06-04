import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  description,
  isOpen,
  onChange,
  title,
}) => {
  const { theme } = useTheme();

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-neutral-90
          backdrop-blur-sm
          fixed
          inset-0
          "
        />
        <Dialog.Content
          className={`
          fixed
          border
          border-indigo-400
          top-[50%]
          left-[50%]
          max-h-full
          h-full
          md:h-auto
          md:max-h-[85vh]
          w-full
          md:w-[90vw]
          md:max-w-[450px]
          translate-x-[-50%]
          translate-y-[-50%]
          rounded-md
  
          p-[25px]
          focus:outline-none
          ${theme == "light" ? "bg-white" : "bg-neutral-800"}`}
        >
          <Dialog.Title
            className="
            text-xl
            text-center
            font-bold
            mb-4
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
            mb-5
            text-sm
            leading-normal
            text-center
            "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className={`
              
              absolute
              top-[15px]
              right-[15px]
              transition
            
              appearance-none
              items-center
              justify-center
              rounded-full
              focus:outline-none
                        
              text-neutral-400            
              ${
                theme == "light"
                  ? "text-neutral-700 hover:text-red-600"
                  : " text-neutral-400 hover:text-red-600"
              }
              `}
            >
              <IoMdClose
                className="  h-[25px]
              w-[25px]"
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
