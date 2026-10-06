import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountrySelect } from "@/components/CountrySelect";
import { createLaunch, findLaunch, type LaunchFormValues } from "@/lib/launch-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/new")({
  validateSearch: (search: Record<string, unknown>): { from?: string } =>
    typeof search["from"] === "string" ? { from: search["from"] } : {},
  head: () => ({
    meta: [
      { title: "New launch · Market Entry Copilot" },
      {
        name: "description",
        content:
          "Describe your product, home market and target market to generate a market-specific go-to-market entry plan.",
      },
      { property: "og:title", content: "New launch · Market Entry Copilot" },
      {
        property: "og:description",
        content:
          "Describe your product, home market and target market to generate a market-specific entry plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewLaunchPage,
});

const schema = z
  .object({
    product_name: z.string().trim().min(1, "Product name is required").max(100, "Max 100 characters"),
    product_description: z
      .string()
      .trim()
      .min(1, "Product description is required")
      .max(1500, "Max 1,500 characters"),
    industry: z.string().trim().min(1, "Industry / vertical is required"),
    business_model: z.enum(["B2B", "B2C", "B2B2C"], { message: "Business model is required" }),
    home_market: z.string().min(1, "Home market is required"),
    target_market: z.string().min(1, "Target market is required"),
    current_presence: z.enum(
      ["None", "A few customers", "Existing global customers with teams there"],
      { message: "Current presence is required" },
    ),
    target_customer: z.string().trim().min(1, "Target customer is required"),
    sales_motion: z.enum(["Self-serve", "Sales-led", "Partner-led", "Hybrid"], {
      message: "Sales motion is required",
    }),
    deal_size: z.string().trim().optional(),
    entry_goal: z.enum(["Test demand", "Soft launch", "Full launch"], {
      message: "Entry goal is required",
    }),
    timeline: z.enum(["3 months", "6 months", "12 months"], { message: "Timeline is required" }),
    team_and_budget: z.string().trim().optional(),
  })
  // FR-12
  .refine((v) => !v.home_market || !v.target_market || v.home_market !== v.target_market, {
    path: ["target_market"],
    message: "Target market must be different from home market.",
  });

interface FormState {
  product_name: string;
  product_description: string;
  industry: string;
  business_model: string;
  home_market: string;
  target_market: string;
  current_presence: string;
  target_customer: string;
  sales_motion: string;
  deal_size: string;
  entry_goal: string;
  timeline: string;
  team_and_budget: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
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

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="panel p-5 sm:p-6">
      <legend className="px-1 text-sm font-bold uppercase tracking-widest text-primary">
        {title}
      </legend>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  wide,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  hint?: string | undefined;
  wide?: boolean | undefined;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", wide && "sm:col-span-2")}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
      {error && (
        <p role="alert" className="text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function NewLaunchPage() {
  const navigate = useNavigate();
  const { from } = Route.useSearch();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});

  // FR-14 / FR-70: pre-fill from a source launch except target market
  useEffect(() => {
    if (!from) return;
    const source = findLaunch(from);
    if (!source) return;
    setValues({
      product_name: source.product_name,
      product_description: source.product_description,
      industry: source.industry,
      business_model: source.business_model,
      home_market: source.home_market,
      target_market: "",
      current_presence: source.current_presence,
      target_customer: source.target_customer,
      sales_motion: source.sales_motion,
      deal_size: source.deal_size ?? "",
      entry_goal: source.entry_goal,
      timeline: source.timeline,
      team_and_budget: source.team_and_budget ?? "",
    });
  }, [from]);

  const set = (key: keyof FormState) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = document.getElementById(String(Object.keys(next)[0]));
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus();
      return;
    }
    const data = parsed.data;
    const launch = createLaunch({
      ...data,
      deal_size: data.deal_size || null,
      team_and_budget: data.team_and_budget || null,
    } as LaunchFormValues);
    navigate({ to: "/launch/$id", params: { id: launch.id } });
  }

  return (
    <main className="page-shell max-w-4xl">
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/">
          <ArrowLeft className="size-4" aria-hidden />
          Back to My Launches
        </Link>
      </Button>

      <h1 className="text-3xl font-bold text-foreground">New launch</h1>
      <p className="mt-1 text-muted-foreground">
        Tell us about the product and the two markets. We&apos;ll build the entry plan around what is
        different in the target market.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        <Group title="Product">
          <Field label="Product name" htmlFor="product_name" error={errors.product_name} wide>
            <Input
              id="product_name"
              maxLength={100}
              value={values.product_name}
              onChange={(e) => set("product_name")(e.target.value)}
              placeholder="LedgerFlow – cloud invoicing for SMBs"
            />
          </Field>
          <Field
            label="Product description"
            htmlFor="product_description"
            error={errors.product_description}
            hint={`${values.product_description.length} / 1500 characters`}
            wide
          >
            <Textarea
              id="product_description"
              rows={5}
              maxLength={1500}
              value={values.product_description}
              onChange={(e) => set("product_description")(e.target.value)}
              placeholder="What it does, who it's for, key features, how it's sold today"
            />
          </Field>
          <Field label="Industry / vertical" htmlFor="industry" error={errors.industry}>
            <Input
              id="industry"
              value={values.industry}
              onChange={(e) => set("industry")(e.target.value)}
              placeholder="Fintech, Beauty, HR software"
            />
          </Field>
          <Field label="Business model" htmlFor="business_model" error={errors.business_model}>
            <Select value={values.business_model} onValueChange={set("business_model")}>
              <SelectTrigger id="business_model">
                <SelectValue placeholder="Select a business model" />
              </SelectTrigger>
              <SelectContent>
                {["B2B", "B2C", "B2B2C"].map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Group>

        <Group title="Markets">
          <Field label="Home market" htmlFor="home_market" error={errors.home_market}>
            <CountrySelect
              id="home_market"
              value={values.home_market}
              onChange={set("home_market")}
              invalid={Boolean(errors.home_market)}
            />
          </Field>
          <Field label="Target market" htmlFor="target_market" error={errors.target_market}>
            <CountrySelect
              id="target_market"
              value={values.target_market}
              onChange={set("target_market")}
              invalid={Boolean(errors.target_market)}
            />
          </Field>
          <Field
            label="Current presence in target market"
            htmlFor="current_presence"
            error={errors.current_presence}
            wide
          >
            <Select value={values.current_presence} onValueChange={set("current_presence")}>
              <SelectTrigger id="current_presence">
                <SelectValue placeholder="Select current presence" />
              </SelectTrigger>
              <SelectContent>
                {["None", "A few customers", "Existing global customers with teams there"].map(
                  (o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </Field>
        </Group>

        <Group title="Go-to-market">
          <Field label="Target customer" htmlFor="target_customer" error={errors.target_customer}>
            <Input
              id="target_customer"
              value={values.target_customer}
              onChange={(e) => set("target_customer")(e.target.value)}
              placeholder="mid-market finance teams"
            />
          </Field>
          <Field label="Sales motion" htmlFor="sales_motion" error={errors.sales_motion}>
            <Select value={values.sales_motion} onValueChange={set("sales_motion")}>
              <SelectTrigger id="sales_motion">
                <SelectValue placeholder="Select a sales motion" />
              </SelectTrigger>
              <SelectContent>
                {["Self-serve", "Sales-led", "Partner-led", "Hybrid"].map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="Typical deal size or price point"
            htmlFor="deal_size"
            error={errors.deal_size}
            hint="Optional — e.g. £20k ACV or £35 per order"
            wide
          >
            <Input
              id="deal_size"
              value={values.deal_size}
              onChange={(e) => set("deal_size")(e.target.value)}
              placeholder="£20k ACV"
            />
          </Field>
        </Group>

        <Group title="Goals">
          <Field label="Entry goal" htmlFor="entry_goal" error={errors.entry_goal}>
            <Select value={values.entry_goal} onValueChange={set("entry_goal")}>
              <SelectTrigger id="entry_goal">
                <SelectValue placeholder="Select an entry goal" />
              </SelectTrigger>
              <SelectContent>
                {["Test demand", "Soft launch", "Full launch"].map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Timeline" htmlFor="timeline" error={errors.timeline}>
            <Select value={values.timeline} onValueChange={set("timeline")}>
              <SelectTrigger id="timeline">
                <SelectValue placeholder="Select a timeline" />
              </SelectTrigger>
              <SelectContent>
                {["3 months", "6 months", "12 months"].map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="Team and budget"
            htmlFor="team_and_budget"
            error={errors.team_and_budget}
            hint="Optional — e.g. 2 people, small budget"
            wide
          >
            <Input
              id="team_and_budget"
              value={values.team_and_budget}
              onChange={(e) => set("team_and_budget")(e.target.value)}
              placeholder="2 people, small budget"
            />
          </Field>
        </Group>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg">
            <Sparkles className="size-4" aria-hidden />
            Generate market entry plan
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/">Cancel</Link>
          </Button>
        </div>
      </form>
    </main>
  );
}
