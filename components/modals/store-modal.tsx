import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState<{ name: string }>({
    name: "",
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", formValues);
      console.log("RESP : ", response.data.id);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <form onSubmit={onSubmit}>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                size={32}
                value={formValues.name}
                onChange={handleChange}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
