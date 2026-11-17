import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin";

const withVarlock = varlockNextConfigPlugin();
import type { NextConfig } from "next";

import { withPwa } from "./pwa.config";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  // shortcut: production image optimization returns 404; re-enable when routing is fixed.
  images: { unoptimized: true },
  allowedDevOrigins: ['192.168.0.159'],
};

export default withVarlock(withPwa(nextConfig));
