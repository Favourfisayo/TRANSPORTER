import { RiLoader4Line } from "@remixicon/react";

export default function Loader() {
  return (
    <div className="flex h-full items-center justify-center pt-8">
      <RiLoader4Line className="animate-spin" aria-hidden="true" />
    </div>
  );
}
