export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-800 bg-black px-8 py-5 text-white">
      <h1 className="text-xl font-bold">Energy Policy Tracker</h1>

      <div className="flex gap-6 text-sm text-zinc-300">
        <a href="/" className="hover:text-white">
          Home
        </a>
        <a href="/federal" className="hover:text-white">
          Federal
        </a>
        <a href="/states" className="hover:text-white">
          States
        </a>
        <a href="/utilities" className="hover:text-white">
          Utilities
        </a>
        <a href="/projects" className="hover:text-white">
          Projects
        </a>
      </div>
    </nav>
  );
}