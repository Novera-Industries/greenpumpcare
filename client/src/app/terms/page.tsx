import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions | GreenPump Care Halifax",
  description:
    "GreenPump Care Inc. terms and conditions of service. Scope of services, pricing, payment terms, cancellation, warranty, Care Plan terms, and more.",
  slug: "/terms",
});

const LAST_UPDATED = "April 2026";

export default function TermsPage() {
  return (
    <article className="py-20 lg:py-28">
      <div className="container max-w-[760px]">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Legal
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-text tracking-tight mb-4">
            Terms &amp; Conditions of Service
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <section className="space-y-4 text-gray-700 leading-relaxed mb-10">
          <p>
            These Terms and Conditions of Service govern the relationship
            between GreenPump Care Inc. (&ldquo;the Company&rdquo;) and each
            customer who engages the Company for heat pump cleaning,
            maintenance, repair, or care plan services. By accepting an
            estimate, signing a work order, or authorizing the Company to
            perform any services, the Customer agrees to be bound by these
            Terms and Conditions.
          </p>
        </section>

        <Section title="1. Definitions">
          <ul className="space-y-3">
            <DefItem term="Company">
              GreenPump Care Inc., a corporation incorporated under the laws
              of Nova Scotia, carrying on business at 3600 Kempt Rd 212,
              Halifax, NS B3K 4X8.
            </DefItem>
            <DefItem term="Customer">
              Any individual, household, or business entity that engages the
              Company to perform services, either by accepting a written or
              verbal estimate, executing a work order, or enrolling in a care
              plan.
            </DefItem>
            <DefItem term="Services">
              All heat pump cleaning, maintenance, diagnostics, repair,
              installation, and related work carried out by the Company or its
              authorized subcontractors.
            </DefItem>
            <DefItem term="Equipment">
              Any heat pump, ductless mini-split, ducted system, air handler,
              outdoor condensing unit, thermostat, or ancillary component on
              which the Company performs services.
            </DefItem>
            <DefItem term="Work Order">
              A written or digital document issued by the Company that
              describes the scope of a specific service visit, the associated
              pricing, and any Customer approvals required.
            </DefItem>
          </ul>
        </Section>

        <Section title="2. Scope of Services">
          <p>
            The Company provides the following types of services, as described
            in individual Work Orders:
          </p>
          <Bullets
            items={[
              <>
                <strong>Heat pump cleaning</strong> — includes indoor
                evaporator coil cleaning, filter cleaning or replacement, drain
                pan treatment, and outdoor condenser coil rinse.
              </>,
              <>
                <strong>Preventive maintenance</strong> — includes system
                inspection, refrigerant pressure check, electrical connection
                inspection, and performance testing.
              </>,
              <>
                <strong>Repairs</strong> — diagnosis and correction of faults,
                including parts supply and labour, as specifically described
                in the applicable Work Order.
              </>,
              <>
                <strong>Care Plans</strong> — subscription-based recurring
                maintenance and priority service packages as described in
                Section 8.
              </>,
            ]}
          />
          <p className="mt-4">
            The Company does not undertake any work beyond the scope described
            in the applicable Work Order without written or verbal Customer
            approval. Additional work identified during a service visit will
            be communicated to the Customer prior to commencement.
          </p>
        </Section>

        <Section title="3. Estimates and Pricing">
          <p>
            All written estimates provided by the Company are valid for thirty
            (30) days from the date of issue unless otherwise stated. Pricing
            is subject to change after the validity period expires or if the
            scope of work is modified.
          </p>
          <p className="mt-3">
            Parts and materials are priced at the time of the service visit.
            The Company reserves the right to adjust parts pricing due to
            supply chain changes or manufacturer price increases, and will
            notify the Customer of any material changes prior to proceeding.
          </p>
          <p className="mt-3">
            Any additional work identified during a service visit that is not
            covered by the original estimate will require explicit Customer
            approval before the Company proceeds. Verbal approval is accepted
            and will be recorded in the Company&apos;s service records.
          </p>
        </Section>

        <Section title="4. Payment Terms">
          <div className="overflow-hidden rounded-card border border-gray-100 my-4">
            <table className="w-full text-sm">
              <thead className="bg-stripe text-left">
                <tr>
                  <th className="px-4 py-3 font-heading font-semibold text-primary w-1/3">
                    Account Type
                  </th>
                  <th className="px-4 py-3 font-heading font-semibold text-primary">
                    Terms
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-text">Residential</td>
                  <td className="px-4 py-3 text-gray-700">
                    Payment due upon completion of service visit.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">Commercial</td>
                  <td className="px-4 py-3 text-gray-700">
                    Net 30 days from invoice date for approved commercial
                    accounts.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3">Accepted payment methods include:</p>
          <Bullets
            items={[
              "Cash",
              "Credit or debit card (Visa, Mastercard, American Express)",
              <>
                Interac e-Transfer to{" "}
                <a
                  href={COMPANY.emailHref}
                  className="text-primary hover:underline"
                >
                  {COMPANY.email}
                </a>
              </>,
            ]}
          />
          <p className="mt-4">
            Invoices not paid within the due period are subject to a late
            payment fee of two percent (2%) per month (24% per annum) on the
            outstanding balance, calculated from the due date until the date
            of payment in full. The Company reserves the right to suspend
            services for accounts with outstanding overdue balances.
          </p>
        </Section>

        <Section title="5. Cancellation and Rescheduling">
          <p>
            The Company requests a minimum of twenty-four (24) hours&apos;
            notice for cancellation or rescheduling of any booked service
            appointment. Customers may cancel or reschedule by contacting the
            Company by phone at{" "}
            <a href={COMPANY.phoneHref} className="text-primary hover:underline">
              {COMPANY.phone}
            </a>{" "}
            or by email at{" "}
            <a href={COMPANY.emailHref} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
            .
          </p>
          <p className="mt-3">
            <strong>Same-day cancellations</strong> — those received less than
            24 hours before a scheduled appointment — may incur a cancellation
            fee of up to $75.00 to recover the Company&apos;s dispatch costs.
            This fee will be communicated to the Customer at the time of
            cancellation and invoiced if applicable.
          </p>
          <p className="mt-3">
            Repeated late cancellations may result in a requirement for
            pre-payment before future bookings are confirmed.
          </p>
        </Section>

        <Section title="6. Customer Responsibilities">
          <p>
            To enable the safe and effective delivery of services, the
            Customer agrees to:
          </p>
          <Bullets
            items={[
              "Ensure that all Equipment to be serviced is accessible at the time of the scheduled appointment, including both indoor and outdoor units.",
              "Provide safe, unobstructed access to the service area, including adequate clearance around the Equipment.",
              "Disclose any known hazards, defects, or unusual conditions relating to the Equipment or the property prior to commencement of services.",
              "Ensure that all pets are secured and kept away from the work area during the service visit.",
              "Ensure that a responsible adult (18 years of age or older) is present during the service visit, or provide written authorization for unattended access.",
              "Provide a suitable parking space and, where applicable, safe roof or ladder access for outdoor unit work.",
            ]}
          />
          <p className="mt-4">
            Failure to meet these responsibilities may result in rescheduling
            of the appointment and may be subject to a service call fee.
          </p>
        </Section>

        <Section title="7. Warranty and Workmanship">
          <p>
            The Company warrants that all services will be performed in a
            professional and workmanlike manner, consistent with industry
            standards. This workmanship warranty covers defects in the
            Company&apos;s labour for a period of thirty (30) days from the
            date the service was performed.
          </p>
          <p className="mt-3">The workmanship warranty does not cover:</p>
          <Bullets
            items={[
              "Pre-existing conditions or defects that were present prior to the service visit.",
              "Damage or failure resulting from Customer misuse, unauthorized modifications, or repairs performed by third parties after our service.",
              "Normal wear and tear of Equipment components.",
              "Issues arising from power surges, extreme weather events, or other causes beyond the Company's control.",
            ]}
          />
          <p className="mt-4">
            Parts and components supplied by the Company may be subject to
            separate manufacturer warranties. Where applicable, the Company
            will communicate the terms of any manufacturer warranty to the
            Customer at the time of service. Manufacturer warranties are
            administered directly by the manufacturer and are separate from
            the Company&apos;s workmanship warranty.
          </p>
        </Section>

        <Section title="8. Care Plan Terms">
          <p>
            GreenPump Care Plans are subscription-based service agreements
            that provide the Customer with scheduled maintenance visits,
            priority booking, and additional benefits as described in the
            Customer&apos;s specific Care Plan enrollment documentation.
          </p>
          <ul className="space-y-3 mt-4">
            <DefItem term="Billing">
              Care Plan fees are billed monthly on or around the anniversary
              date of enrollment. The Customer authorizes recurring monthly
              charges to the payment method on file.
            </DefItem>
            <DefItem term="Commitment">
              Care Plans require a minimum twelve (12) month commitment from
              the enrollment date. Early termination of the plan within the
              commitment period may result in a termination fee equivalent to
              the value of any discounts applied during the committed term.
            </DefItem>
            <DefItem term="Price Lock">
              The monthly Care Plan rate is locked for the duration of the
              initial 12-month term.
            </DefItem>
            <DefItem term="Annual Adjustment">
              Following the initial term, the Company reserves the right to
              adjust the Care Plan rate annually by up to five percent (5%).
              The Customer will receive thirty (30) days&apos; written notice
              of any price adjustment.
            </DefItem>
            <DefItem term="Auto-Renewal">
              Care Plans automatically renew on a month-to-month basis upon
              completion of the initial term. To cancel, the Customer must
              provide thirty (30) days&apos; written notice by email to{" "}
              <a
                href={COMPANY.emailHref}
                className="text-primary hover:underline"
              >
                {COMPANY.email}
              </a>{" "}
              or in writing to the Company&apos;s office address.
            </DefItem>
            <DefItem term="Missed Visits">
              Scheduled maintenance visits included in a Care Plan cannot be
              carried forward beyond the subscription year in which they are
              scheduled.
            </DefItem>
          </ul>
        </Section>

        <Section title="9. Limitation of Liability">
          <div className="bg-stripe border-l-4 border-primary rounded-r-card p-4 my-4">
            <p className="text-text">
              To the maximum extent permitted by applicable law, the
              Company&apos;s total liability to the Customer — whether in
              contract, tort, or otherwise — shall not exceed the total amount
              paid by the Customer for the specific service that gave rise to
              the claim.
            </p>
          </div>
          <p>The Company is not liable for:</p>
          <Bullets
            items={[
              "Pre-existing defects, deterioration, or damage to Equipment or property that existed prior to the service visit.",
              "Consequential, incidental, special, or indirect damages, including loss of use, lost revenue, or business interruption.",
              "Equipment failure caused by factors outside the Company's control, including but not limited to power fluctuations, extreme temperatures, or acts of nature.",
              "Damage to Equipment or property arising from the Customer's failure to disclose known hazards or pre-existing conditions.",
            ]}
          />
        </Section>

        <Section title="10. Property Access and Damage">
          <p>
            The Company&apos;s technicians will take reasonable care when
            accessing Customer property and working in and around the service
            area. Where applicable, floor and wall protection will be used to
            minimize the risk of damage to surfaces.
          </p>
          <p className="mt-3">
            The Customer must report any damage believed to have been caused
            by the Company&apos;s technicians within forty-eight (48) hours of
            the service visit. Reports made after this period may not be
            eligible for consideration. Damage reports should be submitted by
            phone at{" "}
            <a href={COMPANY.phoneHref} className="text-primary hover:underline">
              {COMPANY.phone}
            </a>{" "}
            or by email to{" "}
            <a href={COMPANY.emailHref} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
            .
          </p>
          <p className="mt-3">
            The Company is not responsible for damage to property that results
            from pre-existing structural weaknesses, hidden utilities, or
            other conditions not visible or disclosed prior to the service
            visit.
          </p>
        </Section>

        <Section title="11. Safety and Compliance">
          <p>
            The Company operates in compliance with the Nova Scotia
            Occupational Health and Safety Act and all applicable provincial
            regulations. All technicians are trained in safe work practices
            applicable to HVAC and heat pump services.
          </p>
          <p className="mt-3">
            The Company holds a valid Nova Scotia contractor license, License
            No. 4615849. Proof of licensing is available upon request.
          </p>
          <p className="mt-3">
            The Customer is responsible for ensuring that the work environment
            is safe and accessible. The Company&apos;s technicians reserve the
            right to postpone or decline service if, in their professional
            judgment, the work environment presents an unacceptable safety
            risk.
          </p>
        </Section>

        <Section title="12. Privacy">
          <p>
            The Company collects and uses Customer information solely for the
            purposes of delivering services, processing payments, and
            communicating with the Customer regarding services. The Company
            does not sell or share Customer data with third parties except as
            required to deliver services (e.g., payment processors) or as
            required by law.
          </p>
          <p className="mt-3">
            The Company&apos;s full{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            is available on this website. Customers are encouraged to review
            the Privacy Policy prior to engaging the Company&apos;s services.
          </p>
        </Section>

        <Section title="13. Dispute Resolution">
          <p>
            In the event of a dispute arising out of or in connection with
            these Terms and Conditions or any services provided by the
            Company, the parties agree to the following resolution process:
          </p>

          <h4 className="font-heading font-semibold text-text mt-5 mb-2">
            Step 1 — Good Faith Negotiation
          </h4>
          <p>
            The Customer and the Company will first attempt to resolve the
            dispute through good-faith negotiations. The Customer should
            contact the Company directly at{" "}
            <a href={COMPANY.phoneHref} className="text-primary hover:underline">
              {COMPANY.phone}
            </a>{" "}
            or{" "}
            <a href={COMPANY.emailHref} className="text-primary hover:underline">
              {COMPANY.email}
            </a>{" "}
            to raise concerns.
          </p>

          <h4 className="font-heading font-semibold text-text mt-5 mb-2">
            Step 2 — Mediation
          </h4>
          <p>
            If the dispute is not resolved through negotiation within thirty
            (30) days, either party may refer the matter to a mutually agreed
            mediator. The costs of mediation will be shared equally between
            the parties unless otherwise agreed.
          </p>

          <h4 className="font-heading font-semibold text-text mt-5 mb-2">
            Step 3 — Governing Law
          </h4>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with the laws of the Province of Nova Scotia and the
            applicable laws of Canada. Any unresolved disputes shall be
            subject to the jurisdiction of the courts of Nova Scotia.
          </p>
        </Section>

        <Section title="14. Force Majeure">
          <p>
            Neither party shall be held liable for failure or delay in
            performing obligations under these Terms and Conditions where such
            failure or delay arises from causes beyond the reasonable control
            of the affected party. Force majeure events include, but are not
            limited to, acts of God, natural disasters, severe weather,
            pandemics, government-imposed restrictions, labour disputes,
            supply chain disruptions, or other extraordinary circumstances
            outside the party&apos;s reasonable control.
          </p>
          <p className="mt-3">
            The affected party will notify the other party as soon as
            practicable and will resume performance as soon as the force
            majeure event has ceased. Service appointments impacted by force
            majeure events will be rescheduled without cancellation fees.
          </p>
        </Section>

        <Section title="15. Amendments">
          <p>
            The Company reserves the right to amend these Terms and
            Conditions at any time. Customers will be provided with a minimum
            of thirty (30) days&apos; written notice prior to any material
            changes taking effect. Notice will be delivered by email to the
            Customer&apos;s address on file, or by inclusion with a scheduled
            invoice.
          </p>
          <p className="mt-3">
            Continued use of the Company&apos;s services after the effective
            date of any amendment constitutes the Customer&apos;s acceptance
            of the revised Terms and Conditions. The most current version of
            these Terms and Conditions will always be available at{" "}
            <a
              href={COMPANY.website}
              className="text-primary hover:underline"
            >
              {COMPANY.website.replace(/^https?:\/\//, "")}
            </a>
            .
          </p>
          <p className="mt-3">
            If a Customer does not accept the amended terms, they may
            terminate their service agreement or Care Plan by providing
            written notice to the Company prior to the effective date of the
            amendment, without incurring an early termination fee.
          </p>
        </Section>

        <Section title="16. Contact Information" hideBorder>
          <p>
            For questions, concerns, service requests, or notices under these
            Terms and Conditions, please contact GreenPump Care Inc. using
            the information below:
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <strong className="text-text">Address:</strong> 3600 Kempt Rd
              212, Halifax, NS B3K 4X8
            </li>
            <li>
              <strong className="text-text">Phone:</strong>{" "}
              <a
                href={COMPANY.phoneHref}
                className="text-primary hover:underline"
              >
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <strong className="text-text">Email:</strong>{" "}
              <a
                href={COMPANY.emailHref}
                className="text-primary hover:underline"
              >
                {COMPANY.email}
              </a>
            </li>
            <li>
              <strong className="text-text">Website:</strong>{" "}
              <a
                href={COMPANY.website}
                className="text-primary hover:underline"
              >
                {COMPANY.website.replace(/^https?:\/\//, "")}
              </a>
            </li>
          </ul>

          <div className="mt-8 bg-stripe border-l-4 border-primary rounded-r-card p-4">
            <p className="text-text text-sm">
              By authorizing any service, signing a work order, or enrolling
              in a Care Plan, the Customer acknowledges that they have read,
              understood, and agree to be bound by these Terms and Conditions
              of Service. — GreenPump Care Inc.
            </p>
          </div>
        </Section>

        {/* Footer note */}
        <footer className="mt-12 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>
            GreenPump Care Inc. · 3600 Kempt Rd 212, Halifax, NS B3K 4X8
          </p>
        </footer>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
  hideBorder = false,
}: {
  title: string;
  children: React.ReactNode;
  hideBorder?: boolean;
}) {
  return (
    <section
      className={`py-8 ${hideBorder ? "" : "border-b border-gray-100"}`}
    >
      <h2 className="font-heading text-2xl font-semibold text-text tracking-tight mb-4">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-1">{children}</div>
    </section>
  );
}

function DefItem({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <li className="text-gray-700">
      <strong className="text-text">{term}</strong> — {children}
    </li>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-primary">
      {items.map((item, i) => (
        <li key={i} className="text-gray-700 leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}
