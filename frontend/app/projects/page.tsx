import Navbar from "../../components/Navbar";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="px-8 py-20">
        <p className="mb-4 text-sm uppercase tracking-widest text-zinc-400">
          Energy Projects
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight">
          Follow major infrastructure projects from proposal to approval.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-300">
          This page will track nuclear, solar, wind, battery, transmission,
          natural gas, hydrogen, and microgrid projects across jurisdictions.
        </p>
      </section>
    </main>
  );
}