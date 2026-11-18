import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

export function FigmaIcon({ name, className }: { name: string; className?: string }) {
  const mask = `url(/assets/dashboard-icons/${name}.svg)`;
  return <span aria-hidden="true" className={cx("inline-block shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]", className)} style={{ maskImage: mask, WebkitMaskImage: mask }} />;
}
