import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string; size?: "prose" | "default" | "wide" };

const WIDTH = { prose: "max-w-[768px]", default: "max-w-[1120px]", wide: "max-w-[1120px]" } as const;

export function Container({ children, className, size = "default" }: Props) {
  return <div className={cn("journal-container mx-auto w-full px-5 sm:px-8 xl:px-12", WIDTH[size], className)}>{children}</div>;
}
