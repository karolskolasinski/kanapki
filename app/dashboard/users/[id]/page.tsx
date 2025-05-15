import UserForm from "@/components/UserForm";

function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      PAGE {id}
      <UserForm />
    </div>
  );
}

export default Page;
