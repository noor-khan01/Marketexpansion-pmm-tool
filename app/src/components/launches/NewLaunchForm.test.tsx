import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { NewLaunchForm } from "./NewLaunchForm";
import { __resetLaunchStoreForTests } from "./launch-store";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

function selectCountry(labelPattern: RegExp, countryName: string) {
  const input = screen.getByRole("combobox", { name: labelPattern });
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: countryName } });
  fireEvent.mouseDown(screen.getByRole("option", { name: new RegExp(countryName) }));
}

function fillRequiredFields(overrides?: { home?: string; target?: string }) {
  fireEvent.change(screen.getByLabelText(/^Product name/i), { target: { value: "Test product" } });
  fireEvent.change(screen.getByLabelText(/^Product description/i), {
    target: { value: "A description." },
  });
  fireEvent.change(screen.getByLabelText(/^Industry/i), { target: { value: "Fintech" } });
  fireEvent.change(screen.getByLabelText(/^Business model/i), { target: { value: "B2B" } });
  selectCountry(/^Home market/i, overrides?.home ?? "United Kingdom");
  selectCountry(/^Target market/i, overrides?.target ?? "Germany");
  fireEvent.change(screen.getByLabelText(/^Current presence/i), { target: { value: "None" } });
  fireEvent.change(screen.getByLabelText(/^Target customer/i), {
    target: { value: "SMB finance teams" },
  });
  fireEvent.change(screen.getByLabelText(/^Sales motion/i), { target: { value: "Hybrid" } });
  fireEvent.change(screen.getByLabelText(/^Entry goal/i), { target: { value: "Soft launch" } });
  fireEvent.change(screen.getByLabelText(/^Timeline/i), { target: { value: "6 months" } });
}

describe("NewLaunchForm", () => {
  beforeEach(() => {
    __resetLaunchStoreForTests();
    push.mockClear();
  });

  it("blocks submit and shows inline errors when required fields are empty", () => {
    render(<NewLaunchForm />);
    fireEvent.click(screen.getByRole("button", { name: "Generate market entry plan" }));

    expect(screen.getByText("Product name is required.")).toBeInTheDocument();
    expect(screen.getByText("Home market is required.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("shows the exact FR-12 error when target market matches home market", () => {
    render(<NewLaunchForm />);
    fillRequiredFields({ home: "France", target: "France" });
    fireEvent.click(screen.getByRole("button", { name: "Generate market entry plan" }));

    expect(
      screen.getByText("Target market must be different from home market."),
    ).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("pre-fills every field from the source launch except target market (FR-14)", async () => {
    render(<NewLaunchForm sourceLaunchId="launch-ledgerflow-de" />);

    expect(
      await screen.findByDisplayValue("LedgerFlow – cloud invoicing for SMBs"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Home market/i)).toHaveValue("United Kingdom");
    expect(screen.getByLabelText(/^Target market/i)).toHaveValue("");
    expect(screen.getByLabelText(/^Industry/i)).toHaveValue("Fintech / SaaS");
  });

  it("creates a launch and navigates to its Results page once the form is valid", () => {
    render(<NewLaunchForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: "Generate market entry plan" }));

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(expect.stringMatching(/^\/launch\//));
  });
});
