import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Pill } from "./Pill";

describe("Pill", () => {
  it("always renders its own text, for every tone", () => {
    const tones = ["go", "cond", "stop", "hold", "accent", "plain"] as const;
    for (const tone of tones) {
      const { unmount } = render(<Pill tone={tone}>{tone.toUpperCase()}</Pill>);
      expect(screen.getByText(tone.toUpperCase())).toBeInTheDocument();
      unmount();
    }
  });

  it("defaults to the plain tone when none is given", () => {
    render(<Pill>Default</Pill>);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });
});
