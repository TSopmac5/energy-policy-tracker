import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="px-8 py-20">
  <p className="mb-4 text-sm uppercase tracking-widest text-zinc-400">
    U.S. Energy Governance Intelligence
  </p>

  <h1 className="max-w-4xl text-6xl font-bold leading-tight">
    Track energy policy decisions across every level of government.
  </h1>

  <p className="mt-6 max-w-3xl text-xl text-zinc-300">
    A centralized platform for monitoring federal agencies, regional grid
    operators, state regulators, counties, cities, and public utility
    decisions.
  </p>
</section>

<section className="px-8 pb-16">
  <div className="grid grid-cols-4 gap-6">
    <div className="rounded-lg border border-zinc-800 p-6">
      <h3 className="text-zinc-400">Federal Policies</h3>
      <p className="mt-3 text-4xl font-bold">0</p>
    </div>

    <div className="rounded-lg border border-zinc-800 p-6">
      <h3 className="text-zinc-400">States Tracked</h3>
      <p className="mt-3 text-4xl font-bold">50</p>
    </div>

    <div className="rounded-lg border border-zinc-800 p-6">
      <h3 className="text-zinc-400">Utilities</h3>
      <p className="mt-3 text-4xl font-bold">0</p>
    </div>

    <div className="rounded-lg border border-zinc-800 p-6">
      <h3 className="text-zinc-400">Projects</h3>
      <p className="mt-3 text-4xl font-bold">0</p>
    </div>
  </div>
</section>

<section className="px-8 pb-20">
  <h2 className="mb-6 text-3xl font-bold">
    Recent Activity
  </h2>

  <div className="rounded-lg border border-zinc-800 p-6">
    <p className="text-zinc-400">
      No policy updates available yet.
    </p>
  </div>
</section>
      
    </main>
  );
}