import Link from "next/link";

type DashboardCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function DashboardCard({
  title,
  description,
  href,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-zinc-800 p-6 transition hover:border-zinc-500"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-zinc-400">{description}</p>
    </Link>
  );
}