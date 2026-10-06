import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CountrySelect } from "./CountrySelect";

describe("CountrySelect", () => {
  it("shows every country until the user types a filter", () => {
    render(<CountrySelect id="home" label="Home market" value="" onChange={vi.fn()} />);
    fireEvent.focus(screen.getByRole("combobox", { name: /home market/i }));
    expect(screen.getByRole("option", { name: /Germany/ })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /France/ })).toBeInTheDocument();
  });

  it("filters options as the user types", () => {
    render(<CountrySelect id="home" label="Home market" value="" onChange={vi.fn()} />);
    const input = screen.getByRole("combobox", { name: /home market/i });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "germ" } });
    expect(screen.getByRole("option", { name: /Germany/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /France/ })).not.toBeInTheDocument();
  });

  it("calls onChange with the country name when an option is chosen", () => {
    const onChange = vi.fn();
    render(<CountrySelect id="target" label="Target market" value="" onChange={onChange} />);
    const input = screen.getByRole("combobox", { name: /target market/i });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Germany" } });
    fireEvent.mouseDown(screen.getByRole("option", { name: /Germany/ }));
    expect(onChange).toHaveBeenCalledWith("Germany");
  });

  it("shows a flag once a value is selected", () => {
    render(<CountrySelect id="home" label="Home market" value="Germany" onChange={vi.fn()} />);
    expect(screen.getByText("🇩🇪")).toBeInTheDocument();
  });

  it("renders the inline error message and marks the input invalid", () => {
    render(
      <CountrySelect
        id="target"
        label="Target market"
        value=""
        onChange={vi.fn()}
        error="Target market must be different from home market."
      />,
    );
    expect(
      screen.getByText("Target market must be different from home market."),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /target market/i })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
