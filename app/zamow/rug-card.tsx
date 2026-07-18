import Image from "next/image";
import Link from "next/link";
import rugCollection from "@/public/rug-studio-collection.webp";

interface RugProps {
  id: number | string;
  name: string;
  description: string;
  leadDays: number;
}

export const RugCard = (props: RugProps) => {
  return (
    <Link
      href={`/zamow/${props.id}`}
      className="group overflow-hidden rounded-lg border border-neutral-200 bg-white transition-colors hover:border-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={rugCollection}
          alt={`Przykładowa kolekcja dywanów dla wariantu ${props.name}`}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 rounded-md bg-neutral-950 px-2.5 py-1 text-xs font-semibold text-brand">
          {props.leadDays} dni realizacji
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
            {props.name}
          </h2>
          <span className="mt-1 text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-950">
            Wybierz
          </span>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
          {props.description}
        </p>
      </div>
    </Link>
  );
};
