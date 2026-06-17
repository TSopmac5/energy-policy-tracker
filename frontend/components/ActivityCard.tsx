type ActivityCardProps = {
  agency: string;
  title: string;
  category: string;
};

export default function ActivityCard({
  agency,
  title,
  category,
}: ActivityCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 p-6">
      <p className="text-sm uppercase tracking-widest text-zinc-500">
        {category} • {agency}
      </p>

      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
    </div>
  );
}