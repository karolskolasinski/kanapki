import VehicleForm from "@/components/VehicleForm";

export default async function Vehicles() {
  return (
    <section className="flex-1 w-full overflow-auto max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Vehicles</small>
      </div>

      <VehicleForm />
    </section>
  );
}
