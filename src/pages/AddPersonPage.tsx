import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import AddPersonForm from "../components/people/AddPersonForm";
import { useMiora } from "../context/MioraContext";

export default function AddPersonPage() {
  const navigate = useNavigate();
  const { addPerson } = useMiora();
  const [saving, setSaving] = useState(false);

  async function handleAdd(data: { name: string; nickname?: string }) {
    if (saving) return;
    setSaving(true);
    try {
      const person = await addPerson(data.name, data.nickname);
      navigate(`/people/${person.id}`);
    } catch {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <TopBar title="Add Person" showBack />
      <div className="flex-1 flex flex-col px-6 pt-6 pb-6">
        <p className="text-miora-charcoal text-[15px] font-medium mb-8 leading-relaxed">
          Who is someone you want to keep in mind?
        </p>
        <AddPersonForm onSubmit={handleAdd} loading={saving} />
      </div>
    </div>
  );
}
