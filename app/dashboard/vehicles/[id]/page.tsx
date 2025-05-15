function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>PAGE {id}</div>;
}

export default Page;
