import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const styleSource = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("homepage motion contracts", () => {
  it("keeps service selection in place", () => {
    expect(homeSource).toContain("onClick={() => setActiveService(index)}");
    expect(homeSource).not.toContain("window.location.assign(service.path)");
    expect(homeSource).toContain("className=\"service-focus-panel\"");
  });

  it("keeps the laptop render centered and readable", () => {
    expect(homeSource).toContain("luminara-macbook-stage.png");
    expect(styleSource).toContain(".laptop-stage-render { left:0; top:0; width:100%; height:100%; opacity:1;");
    expect(styleSource).toContain(".laptop-stage { width:min(82vw,1080px);");
  });

  it("binds visit steps and the side path to one scroll progress value", () => {
    expect(homeSource).toContain("target: journeyRef");
    expect(homeSource).toContain("style={{ y: journeySideY }}");
    expect(homeSource).toContain("progress={journeyProgress}");
  });

  it("provides an explicit reduced-motion fallback", () => {
    expect(styleSource).toContain("@media (prefers-reduced-motion:reduce)");
    expect(styleSource).toContain(".journey-item{transform:none!important;opacity:1!important}");
    expect(styleSource).toContain(".laptop-stage{transition:none!important}");
  });

  it("keeps visit details in accessible hover and focus flip cards", () => {
    expect(homeSource).toContain("className=\"visit-card\"");
    expect(homeSource).toContain("tabIndex={0}");
    expect(homeSource).toContain("visit-card-face visit-card-back");
    expect(styleSource).toContain(".visit-card:hover .visit-card-inner, .visit-card:focus .visit-card-inner");
  });
});
