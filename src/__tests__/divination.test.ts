import { describe, it, expect } from "vitest";
import { hashText, getToolReading } from "@/lib/divination";
import type { ToolInput } from "@/types";

describe("hashText", () => {
  it("returns the same hash for the same input", () => {
    expect(hashText("hello")).toBe(hashText("hello"));
  });

  it("returns different hashes for different inputs", () => {
    expect(hashText("hello")).not.toBe(hashText("world"));
  });

  it("returns a positive integer", () => {
    const result = hashText("test");
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThan(0);
  });
});

describe("getToolReading", () => {
  const baseInput: ToolInput = {
    name: "Alice",
    birthDate: "2000-01-01",
    birthTime: "12:00",
    question: "What does the year hold for me?",
    numberA: 3,
    numberB: 8,
  };

  it("returns a valid reading for bazi", () => {
    const reading = getToolReading("bazi", baseInput);
    expect(reading.title).toBeTruthy();
    expect(reading.summary).toBeTruthy();
    expect(reading.score).toBeGreaterThanOrEqual(0);
    expect(reading.score).toBeLessThanOrEqual(100);
    expect(reading.sections.length).toBeGreaterThan(0);
    expect(reading.chart.length).toBe(5); // Five Elements
  });

  it("returns real bazi pillars from lunar calendar (not pseudo-random)", () => {
    const reading = getToolReading("bazi", baseInput);
    // 2000-01-01 12:00 → 己卯 丙子 戊午 戊午
    const yearSection = reading.sections.find((s) => s.label === "年柱");
    const monthSection = reading.sections.find((s) => s.label === "月柱");
    const daySection = reading.sections.find((s) => s.label === "日柱");
    const hourSection = reading.sections.find((s) => s.label === "时柱");
    const dayMasterSection = reading.sections.find((s) => s.label === "日主");

    expect(yearSection?.value).toContain("己卯");
    expect(monthSection?.value).toContain("丙子");
    expect(daySection?.value).toContain("戊午");
    expect(hourSection?.value).toContain("戊午");
    // Day Master is the stem of day pillar
    expect(dayMasterSection?.value).toContain("戊");
    // Verify NaYin is included
    expect(yearSection?.value).toContain("纳音");
    expect(reading.tags).toContain("纳音");
    expect(reading.tags).toContain("十神");
  });

  it("returns real five-element chart from birth chart characters", () => {
    const reading = getToolReading("bazi", baseInput);
    // Element chart should have 5 elements each with a value in 10-30 range
    expect(reading.chart).toHaveLength(5);
    for (const item of reading.chart) {
      expect(item.value).toBeGreaterThanOrEqual(10);
      expect(item.value).toBeLessThanOrEqual(30);
    }
    // Element names should be the five elements
    const names = reading.chart.map((d) => d.name).sort();
    expect(names).toEqual(["土", "木", "水", "火", "金"]);
  });

  it("returns deterministic results for same input", () => {
    const a = getToolReading("bazi", baseInput);
    const b = getToolReading("bazi", baseInput);
    expect(a).toEqual(b);
  });

  it("returns different bazi readings for different birth dates", () => {
    const reading1 = getToolReading("bazi", baseInput);
    const reading2 = getToolReading("bazi", {
      ...baseInput,
      birthDate: "1990-06-15",
      birthTime: "08:00",
    });
    // Different birth dates should produce different pillars
    const year1 = reading1.sections.find((s) => s.label === "年柱")?.value;
    const year2 = reading2.sections.find((s) => s.label === "年柱")?.value;
    expect(year1).not.toBe(year2);
  });

  it("returns a reading for every known tool slug", () => {
    const slugs = [
      "ziwei", "bazi", "meihua", "qimen", "liuyao",
      "tarot", "dream", "daily-fortune", "almanac",
      "name", "wuxing", "ai-reading",
    ] as const;

    for (const slug of slugs) {
      const reading = getToolReading(slug, baseInput);
      expect(reading).toBeDefined();
      expect(reading.title.length).toBeGreaterThan(0);
    }
  });
});
