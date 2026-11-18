import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { DashboardHome } from "./dashboard-home";
import { DashboardSidebar } from "@THE-TRANSPORTER/ui/components/application/dashboard/dashboard-sidebar";

test("dashboard exposes its main navigation and sidebar control", () => {
  const html = renderToStaticMarkup(<DashboardHome />);
  expect(html).not.toContain("Example dashboard");
  expect(html).toContain('aria-label="Collapse sidebar"');
  expect(html).toContain('aria-label="Dashboard navigation"');
  expect(html).toContain('aria-label="Mobile dashboard navigation"');
  expect(html).toContain('aria-current="page"');
  expect(html).toContain("Airport pickups");
  expect(html).toContain("Recent trips");
});

test("collapsed sidebar offers an accessible expand control", () => {
  const html = renderToStaticMarkup(
    <DashboardSidebar
      header={null}
      action={null}
      navigation={null}
      footer={null}
      collapsed
      onToggle={() => {}}
    />,
  );
  expect(html).toContain('aria-label="Expand sidebar"');
  expect(html).toContain('aria-expanded="false"');
});
