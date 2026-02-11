import { useState } from "react";

export function useDynamicList<T>(initialValue: T) {
  const [formData, setFormData] = useState<T>(initialValue);
  const [items, setItems] = useState<T[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    if (Object.values(formData).some((value) => value.trim() === "")) return;
    setItems([...items, formData]);
    setFormData(initialValue);
  };

  return { formData, items, handleChange, handleAdd };
}
