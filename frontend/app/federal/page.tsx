import ActivityCard from "../../components/ActivityCard";

export default async function FederalPage() {
  const response = await fetch("http://127.0.0.1:8000/federal/activity", {
  cache: "no-store",
});

const federalActivity = await response.json();
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="px-8 py-20">
        <p className="mb-4 text-sm uppercase tracking-widest text-zinc-400">
          Federal Energy Policy
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight">
          Track national energy decisions from federal agencies and regulators.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-300">
          This page will eventually monitor agencies like FERC, DOE, EPA, NRC,
          and EIA, including rules, grants, reports, licensing decisions, and
          federal energy data releases.
        </p>
      </section>
      <section className="px-8 pb-20">
   <h2 className="mb-6 text-3xl font-bold">Federal Activity</h2>

  <div className="space-y-4">
    {federalActivity.map((item: any) => (
      <ActivityCard
        key={item.id}
        agency={item.agency}
        title={item.title}
        category={item.category}
      />
    ))}
  </div>
</section>
    </main>
  );
}
