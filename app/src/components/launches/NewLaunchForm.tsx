"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import type { BusinessModel, CurrentPresence, EntryGoal, SalesMotion, Timeline } from "@/lib/types";
import { CountrySelect } from "./CountrySelect";
import { FormField, fieldInputClasses, fieldInputStyle } from "./FormField";
import {
  primaryButtonClasses,
  primaryButtonStyle,
  secondaryButtonClasses,
  secondaryButtonStyle,
} from "./button-styles";
import { addLaunch, getLaunchById } from "./launch-store";

const BUSINESS_MODEL_OPTIONS: BusinessModel[] = ["B2B", "B2C", "B2B2C"];
const CURRENT_PRESENCE_OPTIONS: CurrentPresence[] = [
  "None",
  "A few customers",
  "Existing global customers with teams there",
];
const SALES_MOTION_OPTIONS: SalesMotion[] = ["Self-serve", "Sales-led", "Partner-led", "Hybrid"];
const ENTRY_GOAL_OPTIONS: EntryGoal[] = ["Test demand", "Soft launch", "Full launch"];
const TIMELINE_OPTIONS: Timeline[] = ["3 months", "6 months", "12 months"];

interface FormState {
  product_name: string;
  product_description: string;
  industry: string;
  business_model: BusinessModel | "";
  home_market: string;
  target_market: string;
  current_presence: CurrentPresence | "";
  target_customer: string;
  sales_motion: SalesMotion | "";
  deal_size: string;
  entry_goal: EntryGoal | "";
  timeline: Timeline | "";
  team_and_budget: string;
}

const EMPTY_FORM: FormState = {
  product_name: "",
  product_description: "",
  industry: "",
  business_model: "",
  home_market: "",
  target_market: "",
  current_presence: "",
  target_customer: "",
  sales_motion: "",
  deal_size: "",
  entry_goal: "",
  timeline: "",
  team_and_budget: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.product_name.trim()) errors.product_name = "Product name is required.";
  else if (values.product_name.length > 100)
    errors.product_name = "Product name must be 100 characters or fewer.";

  if (!values.product_description.trim())
    errors.product_description = "Product description is required.";
  else if (values.product_description.length > 1500)
    errors.product_description = "Product description must be 1,500 characters or fewer.";

  if (!values.industry.trim()) errors.industry = "Industry / vertical is required.";
  if (!values.business_model) errors.business_model = "Business model is required.";
  if (!values.home_market) errors.home_market = "Home market is required.";

  if (!values.target_market) {
    errors.target_market = "Target market is required.";
  } else if (values.home_market && values.target_market === values.home_market) {
    // FR-12 — exact wording required.
    errors.target_market = "Target market must be different from home market.";
  }

  if (!values.current_presence)
    errors.current_presence = "Current presence in target market is required.";
  if (!values.target_customer.trim()) errors.target_customer = "Target customer is required.";
  if (!values.sales_motion) errors.sales_motion = "Sales motion is required.";
  if (!values.entry_goal) errors.entry_goal = "Entry goal is required.";
  if (!values.timeline) errors.timeline = "Timeline is required.";

  return errors;
}

export interface NewLaunchFormProps {
  /** Set when opened as `/new?from=:id` (FR-14/FR-70) — pre-fills every
   * field from that launch except `target_market`, which stays empty. */
  sourceLaunchId?: string;
}

export function NewLaunchForm({ sourceLaunchId }: NewLaunchFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (!sourceLaunchId) return;
    const source = getLaunchById(sourceLaunchId);
    if (!source) return;
    setForm({
      product_name: source.product_name,
      product_description: source.product_description,
      industry: source.industry,
      business_model: source.business_model,
      home_market: source.home_market,
      target_market: "", // FR-14/FR-71: the duplicate is independent of the source.
      current_presence: source.current_presence,
      target_customer: source.target_customer,
      sales_motion: source.sales_motion,
      deal_size: source.deal_size ?? "",
      entry_goal: source.entry_goal,
      timeline: source.timeline,
      team_and_budget: source.team_and_budget ?? "",
    });
  }, [sourceLaunchId]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (submitAttempted) setErrors(validate(next));
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalidKey = Object.keys(nextErrors)[0];
    if (firstInvalidKey) {
      document.getElementById(firstInvalidKey)?.focus();
      return;
    }

    const launch = addLaunch({
      product_name: form.product_name.trim(),
      product_description: form.product_description.trim(),
      industry: form.industry.trim(),
      business_model: form.business_model as BusinessModel,
      home_market: form.home_market,
      target_market: form.target_market,
      current_presence: form.current_presence as CurrentPresence,
      target_customer: form.target_customer.trim(),
      sales_motion: form.sales_motion as SalesMotion,
      deal_size: form.deal_size.trim() || null,
      entry_goal: form.entry_goal as EntryGoal,
      timeline: form.timeline as Timeline,
      team_and_budget: form.team_and_budget.trim() || null,
    });
    router.push(`/launch/${launch.id}`);
  }

  const fieldError = (key: keyof FormState) => (submitAttempted ? errors[key] : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend
          className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
          style={{ color: "var(--ink-faint)" }}
        >
          Product
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="product_name"
            label="Product name"
            required
            error={fieldError("product_name")}
          >
            <input
              id="product_name"
              value={form.product_name}
              maxLength={100}
              onChange={(event) => update("product_name", event.target.value)}
              className={fieldInputClasses}
              style={fieldInputStyle(!!fieldError("product_name"))}
            />
          </FormField>
          <FormField
            id="industry"
            label="Industry / vertical"
            required
            error={fieldError("industry")}
          >
            <input
              id="industry"
              value={form.industry}
              placeholder='e.g. "Fintech", "Beauty", "HR software"'
              onChange={(event) => update("industry", event.target.value)}
              className={fieldInputClasses}
              style={fieldInputStyle(!!fieldError("industry"))}
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField
              id="product_description"
              label="Product description"
              required
              error={fieldError("product_description")}
            >
              <textarea
                id="product_description"
                value={form.product_description}
                maxLength={1500}
                rows={4}
                placeholder="What it does, who it's for, key features, how it's sold today"
                onChange={(event) => update("product_description", event.target.value)}
                className={fieldInputClasses}
                style={fieldInputStyle(!!fieldError("product_description"))}
              />
            </FormField>
          </div>
          <FormField
            id="business_model"
            label="Business model"
            required
            error={fieldError("business_model")}
          >
            <select
              id="business_model"
              value={form.business_model}
              onChange={(event) => update("business_model", event.target.value as BusinessModel)}
              className={fieldInputClasses}
              style={fieldInputStyle(!!fieldError("business_model"))}
            >
              <option value="">Select…</option>
              {BUSINESS_MODEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend
          className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
          style={{ color: "var(--ink-faint)" }}
        >
          Markets
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CountrySelect
            id="home_market"
            label="Home market"
            required
            value={form.home_market}
            onChange={(value) => update("home_market", value)}
            error={fieldError("home_market")}
          />
          <CountrySelect
            id="target_market"
            label="Target market"
            required
            value={form.target_market}
            onChange={(value) => update("target_market", value)}
            error={fieldError("target_market")}
          />
          <div className="sm:col-span-2">
            <FormField
              id="current_presence"
              label="Current presence in target market"
              required
              error={fieldError("current_presence")}
            >
              <select
                id="current_presence"
                value={form.current_presence}
                onChange={(event) =>
                  update("current_presence", event.target.value as CurrentPresence)
                }
                className={fieldInputClasses}
                style={fieldInputStyle(!!fieldError("current_presence"))}
              >
                <option value="">Select…</option>
                {CURRENT_PRESENCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend
          className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
          style={{ color: "var(--ink-faint)" }}
        >
          Go-to-market
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="target_customer"
            label="Target customer"
            required
            error={fieldError("target_customer")}
          >
            <input
              id="target_customer"
              value={form.target_customer}
              placeholder='e.g. "mid-market finance teams", "Gen Z online shoppers"'
              onChange={(event) => update("target_customer", event.target.value)}
              className={fieldInputClasses}
              style={fieldInputStyle(!!fieldError("target_customer"))}
            />
          </FormField>
          <FormField
            id="sales_motion"
            label="Sales motion"
            required
            error={fieldError("sales_motion")}
          >
            <select
              id="sales_motion"
              value={form.sales_motion}
              onChange={(event) => update("sales_motion", event.target.value as SalesMotion)}
              className={fieldInputClasses}
              style={fieldInputStyle(!!fieldError("sales_motion"))}
            >
              <option value="">Select…</option>
              {SALES_MOTION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="deal_size" label="Typical deal size or price point" hint="Optional">
            <input
              id="deal_size"
              value={form.deal_size}
              placeholder='e.g. "£20k ACV", "£35 per order"'
              onChange={(event) => update("deal_size", event.target.value)}
              className={fieldInputClasses}
              style={fieldInputStyle(false)}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend
          className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
          style={{ color: "var(--ink-faint)" }}
        >
          Goals
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField id="entry_goal" label="Entry goal" required error={fieldError("entry_goal")}>
            <select
              id="entry_goal"
              value={form.entry_goal}
              onChange={(event) => update("entry_goal", event.target.value as EntryGoal)}
              className={fieldInputClasses}
              style={fieldInputStyle(!!fieldError("entry_goal"))}
            >
              <option value="">Select…</option>
              {ENTRY_GOAL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="timeline" label="Timeline" required error={fieldError("timeline")}>
            <select
              id="timeline"
              value={form.timeline}
              onChange={(event) => update("timeline", event.target.value as Timeline)}
              className={fieldInputClasses}
              style={fieldInputStyle(!!fieldError("timeline"))}
            >
              <option value="">Select…</option>
              {TIMELINE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="team_and_budget" label="Team and budget" hint="Optional">
            <input
              id="team_and_budget"
              value={form.team_and_budget}
              placeholder='e.g. "2 people, small budget"'
              onChange={(event) => update("team_and_budget", event.target.value)}
              className={fieldInputClasses}
              style={fieldInputStyle(false)}
            />
          </FormField>
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <button type="submit" className={primaryButtonClasses} style={primaryButtonStyle}>
          Generate market entry plan
        </button>
        <Link href="/" className={secondaryButtonClasses} style={secondaryButtonStyle}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
