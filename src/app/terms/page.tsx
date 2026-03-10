import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Use | Clear Journey",
  description:
    "Clear Journey Terms of Use — GY Innovation Group Pty Ltd ACN 674 150 406.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout>
      <div className="legal-content space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
            Clear Journey Terms of Use
          </h1>
          <p className="text-sm text-charcoal-light">
            GY Innovation Group Pty Ltd ACN 674 150 406
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">1. Background</h2>
          <p>
            Thank you for visiting our Terms of Use (Agreement), we are GY
            Innovation Group Pty Ltd ACN 674 150 406 (GY Innovation, we, our, us
            and other similar terms). We provide a cloud-based software platform
            known as Clear Journey, designed to help travel advisors manage
            client information, workflows, follow-ups and related business
            operations. (Clear Journey).
          </p>
          <p>
            This Agreement outlines the terms and conditions associated with your
            use of Clear Journey. It is your obligation to ensure that you have
            read, understood and agreed to the most recent terms available at{" "}
            <a
              href="https://clearjourney.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline hover:text-navy-dark"
            >
              https://clearjourney.io/
            </a>{" "}
            (Website).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">2. Agreement</h2>

          <h3 className="text-lg font-medium text-charcoal">
            2.1 Accepting this Agreement
          </h3>
          <p>
            By creating a Clear Journey Account, you agree to comply with and be
            legally bound by the terms and conditions of this Agreement. If you
            do not agree to these terms, you have no right to continue using
            Clear Journey.
          </p>
          <p>
            You must not use Clear Journey if you are not able to form legally
            binding contracts or are under the age of 18. If you create an
            Account on behalf of your employer or any other entity, you represent
            and warrant you hold authority to enter into this Agreement on behalf
            of that entity and that the entity will comply with the obligations
            contained herein.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            2.2 About this Agreement
          </h3>
          <p>
            Throughout the Agreement we use some capitalised words and phrases,
            like the word Agreement. These capitalised words and phrases are
            defined throughout this Agreement and in clause 16. They aid to
            clarify the terms and conditions.
          </p>
          <p>
            Please feel free to email us at{" "}
            <a
              href="mailto:hq@clearjourney.io"
              className="text-navy underline hover:text-navy-dark"
            >
              hq@clearjourney.io
            </a>{" "}
            if you have any questions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">3. Term</h2>
          <p>
            This Agreement will commence when you create a Clear Journey Account
            and will continue until the date of termination of this Agreement
            in accordance with clause 14.
          </p>
          <p>
            If this Agreement is not terminated in accordance with clause 14,
            prior to the expiry of the then current Subscription Period, this
            Agreement will automatically renew for a period equal to the current
            Subscription Period.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">4. Licence</h2>
          <p>
            We grant you a non-transferrable, non-exclusive and revocable
            licence to access Clear Journey for the Subscription Period, subject
            to any Usage Restrictions and conditional upon your compliance with
            the terms and conditions of this Agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">5. Payment</h2>
          <p>
            Unless expressed otherwise, Subscription Fees are quoted in
            Australian Dollars and are exclusive of GST, withholding taxes,
            duties and charges imposed or levied in Australia, or overseas, in
            connection with this Agreement.
          </p>
          <p>
            You are responsible for all bank fees and charges applied by the
            payment gateway provider, which you choose to use.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            6. Requirements for use
          </h2>

          <h3 className="text-lg font-medium text-charcoal">6.1 Access</h3>
          <p>
            You acknowledge and agree Clear Journey will only be accessible using
            the internet, by users with a valid Account and will not be
            available &ldquo;locally&rdquo; from your own servers or devices.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            6.2 Support
          </h3>
          <p>
            Support for Clear Journey is provided in accordance with the support
            arrangements as set out on our Website and may vary from time to
            time.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            6.3 Clear Journey outages and system maintenance
          </h3>
          <p>
            If it is necessary to interrupt your use of Clear Journey, we will
            endeavour to provide you with reasonable notice (where possible) of
            when, and the anticipated duration for which, Clear Journey will be
            unavailable.
          </p>
          <p>
            You acknowledge that access to Clear Journey may be changed,
            interrupted or discontinued for many reasons, some of which are
            beyond our control and during routine maintenance there may be
            updates to Clear Journey which may change the interface and manner
            in which it functions.
          </p>
          <p>
            You agree that we are not liable for any loss, foreseeable or not,
            arising from any interruption to your access to Clear Journey,
            planned or not, and any such interruptions will not constitute a
            breach by us of these terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            7. Your use of Clear Journey
          </h2>

          <h3 className="text-lg font-medium text-charcoal">
            7.1 Registering an Account
          </h3>
          <p>
            In order to use Clear Journey, you are required to provide us with
            Personal Information and create an Account with us.
          </p>
          <p>
            You agree to provide any information reasonably requested by us for
            the purpose of setting up your Account. You warrant that all of the
            information you provide to us is accurate and complete in all
            respects; you will inform us by updating your Account details
            whenever any such information changes; and you will not provide false
            or misleading information.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            7.2 Account security
          </h3>
          <p>
            Maintaining the security of your Account is important to ensuring
            your Personal Information, and that data which we process on your
            behalf, remains safe. We work hard to keep Clear Journey secure and
            we ask you to contribute.
          </p>
          <p>
            You agree not to request or allow another person to create an
            Account on your behalf, for your use, or for your benefit, except
            that an authorised employee or agent may create an Account on behalf
            of your business. You also agree not to disclose your Account
            security credentials to another person or permit them to access your
            Account. You are responsible for the activities undertaken using
            your Account which occur via Clear Journey, whether such activities
            are authorised by you or not.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            7.3 Lawful use of Clear Journey
          </h3>
          <p>
            You undertake not to upload, store or access any data on or use Clear
            Journey in any manner, or at all, if such access, use or storage
            would infringe a person&apos;s Intellectual Property rights, breach
            any Privacy Law or breach any other law or applicable code (including
            any common law, statute, delegated legislation, rule or ordinance of
            the Commonwealth, or a State or Territory of Australia, or a law in
            the jurisdiction in which you operate).
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            7.4 Prohibited Conduct
          </h3>
          <p>
            You may only acquire and make use of Clear Journey for the sole
            purpose of meeting your internal business needs. You must not use or
            include any part of Clear Journey in any service bureau or fee
            generating service offered to third parties.
          </p>
          <p>You must not:</p>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>
              (a) in any way tamper with, hinder or modify Clear Journey;
            </li>
            <li>
              (b) use Clear Journey directly or indirectly for any activity or
              transmit any information or material unlawfully, or which is
              obscene, indecent, uses offensive language, defames, abuses,
              harasses, stalks, threatens, menaces or offends any person;
            </li>
            <li>
              (c) knowingly transmit any viruses or other disabling features to
              or via Clear Journey;
            </li>
            <li>
              (d) intentionally disable or circumvent any protection or
              disabling mechanism of Clear Journey;
            </li>
            <li>
              (e) install or store any software applications, code or scripts on
              or through Clear Journey;
            </li>
            <li>
              (f) use Clear Journey in any way which could be reasonably expected
              to interfere with or damage our systems, any other operator&apos;s
              systems, or another user&apos;s enjoyment of Clear Journey;
            </li>
            <li>
              (g) attempt, facilitate or assist another person to do any of the
              above acts.
            </li>
          </ul>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            7.5 Right to suspend
          </h3>
          <p>
            We reserve the right to limit or suspend all or part of your access
            to Clear Journey and alter your Account information, if in our
            reasonable opinion:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>
              (a) you are in breach of any of the obligations or undertakings in
              this Agreement;
            </li>
            <li>(b) your Account information is incomplete;</li>
            <li>
              (c) your Account is not used for a period of greater than 12
              months; or
            </li>
            <li>(d) we suspect a security breach associated with your Account.</li>
          </ul>
          <p>
            Suspending your Account will not constitute a breach of this
            Agreement by us, nor will it alter your obligation to pay the
            Subscription Fees.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">8. Privacy</h2>
          <p>
            You agree and consent to us handling your Personal Information in
            accordance with our{" "}
            <Link
              href="/privacy"
              className="text-navy underline hover:text-navy-dark"
            >
              Privacy Policy
            </Link>
            . We may amend our Privacy Policy in our sole discretion. If we amend
            our Privacy Policy, we will post the new version on our Website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            9. Third Party Services
          </h2>
          <p>
            Certain components or features of Clear Journey may include materials
            from third parties, links to other websites, data, resources,
            services and/or content that are operated by third party service
            providers that are not affiliated with us (Third Party Services). You
            acknowledge and agree that we are:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>(a) not responsible for the availability of such Third Party Services;</li>
            <li>
              (b) in no way liable for any data, content, advertising or
              materials made available through such Third Party Services; and
            </li>
            <li>
              (c) not liable for any damages you incur or allege to incur, either
              directly or indirectly as a result of your use and/or reliance upon
              any such Third Party Services.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            10. User Content and Intellectual Property
          </h2>

          <h3 className="text-lg font-medium text-charcoal">
            10.1 Your User Content
          </h3>
          <p>
            If you provide us with content, including, without limitation, text,
            photos, images, and any other materials (User Content), your User
            Content stays yours. This Agreement does not transfer ownership of
            User Content to us.
          </p>
          <p>
            When you provide User Content, you grant us a non-exclusive,
            worldwide, perpetual, royalty-free, sublicensable, transferable right
            and license to use, host, store, reproduce, modify, create derivative
            works of (such as those resulting from translations, adaptations or
            other changes we make so that User Content works better with Clear
            Journey), communicate and publish User Content for the purposes of
            allowing us to provide, improve, promote and protect Clear Journey.
            You waive any claims against us relating to any moral rights or
            similar rights worldwide that you may have in the User Content.
          </p>
          <p>
            You represent that you own all rights to your User Content or
            otherwise have (and will continue to have) all rights and
            permissions to legally use, share, display, transfer and license your
            User Content to the extent that it is used within Clear Journey.
          </p>
          <p>
            While we reserve the right to take down any User Content which is in
            breach of this Agreement, you acknowledge and agree we are not
            required to monitor User Content, nor are we responsible for it.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            10.2 Use of our Intellectual Property
          </h3>
          <p>
            We retain all right, title, and interest in and to Clear Journey.
          </p>
          <p>
            We warrant that we own or have a licence to use the Intellectual
            Property in Clear Journey.
          </p>
          <p>
            You must not do any of the following, assist anyone to do any of the
            following or permit any person over whom you have effective control
            to:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>
              (a) create an adaptation or translation of all or part of Clear
              Journey in any way;
            </li>
            <li>
              (b) use Clear Journey in a manner which may infringe any other
              persons Intellectual Property;
            </li>
            <li>
              (c) incorporate all or part of Clear Journey in any other webpage,
              site, application or other digital or non-digital format; or
            </li>
            <li>
              (d) except to the extent that reproduction occurs automatically
              through its ordinary use, directly or indirectly copy, recreate,
              decompile, reverse engineer or otherwise obtain, modify or use any
              source or object code, content, architecture, or algorithms
              contained in Clear Journey.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">11. Warranties</h2>
          <p>
            Subject to the Non-excludable Conditions and to the fullest extent
            permitted under the law, we make no warranties or guarantees that
            Clear Journey is fault free, regarding Clear Journey&apos;s fitness
            for any particular purpose which we have not expressed, or regarding
            your access to, or the results of your access to, Clear Journey
            including its correctness, accuracy, timeliness, completeness,
            reliability or otherwise.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            12. Limitation of liability
          </h2>

          <h3 className="text-lg font-medium text-charcoal">
            12.1 Implied conditions
          </h3>
          <p>
            We expressly exclude all conditions, warranties and other terms which
            might otherwise be implied by any law, regulation, statute, common
            law or law of equity except any Non-excludable Condition.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            12.2 Limitation of liability
          </h3>
          <p>
            Subject to the Non-excludable Conditions, we exclude all other
            liability for any costs, including consequential losses, suffered or
            incurred directly or indirectly by you in connection with this
            Agreement, including:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>(a) loss of profits or any other pure economic loss;</li>
            <li>(b) Clear Journey being inaccessible for any reason;</li>
            <li>
              (c) incorrect or corrupt data, lost data, or any inputs or outputs
              of Clear Journey;
            </li>
            <li>
              (d) computer virus, trojan and other malware in connection with
              Clear Journey;
            </li>
            <li>
              (e) security vulnerabilities in Clear Journey or any breach of
              security that results in unauthorised access to, or corruption of
              data;
            </li>
            <li>
              (f) negligence arising from our activities or that of our service
              providers;
            </li>
            <li>(g) any unauthorised activity in relation to Clear Journey;</li>
            <li>(h) the occurrence of an Event of Force Majeure;</li>
            <li>(i) your breach of this Agreement; or</li>
            <li>
              (j) any act or omission by you, your personnel, your associates or
              any related body corporate under or in relation to this Agreement.
            </li>
          </ul>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            12.3 Limits to liability associated with goods and services
          </h3>
          <p>
            To the fullest extent possible under the law, we limit our liability
            for any breach to: (a) in the case of goods: the re-supply of the
            goods or payment of the cost of the re-supply of the goods, or the
            replacement or repair of the goods or payment of the cost of
            replacement or repair of the goods; and (b) in the case of services:
            the resupply of the services or the payment of the cost of having the
            services resupplied.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            12.4 Indemnity
          </h3>
          <p>
            You are solely responsible for ensuring that you have all legal right
            to use and upload your User Content to Clear Journey.
          </p>
          <p>
            You indemnify us against all costs suffered or incurred by us,
            however caused, arising wholly or partially, directly or indirectly,
            from your infringement of any third party Intellectual Property
            rights and your breach of any law including, Privacy Law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            13. Dispute Resolution
          </h2>
          <p>
            A party claiming a dispute has arisen under this Agreement
            (Dispute) must give written notice to the other party specifying the
            nature of the Dispute. The parties must submit themselves to the
            dispute resolution procedure set out in this clause 13 before
            commencing any legal proceedings.
          </p>
          <p>
            If the parties cannot resolve the Dispute between themselves within
            30 days then either party may require the Dispute to be referred for
            mediation. The mediation must be undertaken in accordance with the
            Resolution Institute Mediation Rules, within the jurisdiction of the
            Agreement and, unless otherwise agreed between the parties, using a
            mediator nominated by the Resolution Institute. If the Dispute is
            not resolved within 30 days of the mediation commencing either party
            may commence proceedings in respect of the Dispute.
          </p>
          <p>
            Each party must pay its own internal and legal costs in relation to
            complying with this clause 13. The mediator&apos;s costs are to be
            shared equally.
          </p>
          <p>
            The parties acknowledge and agree this clause 13 does not apply to
            the recovery of any debt or prevent a party from instituting
            proceedings for the purposes of seeking urgent injunctive or similar
            interim relief from a court.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            14. Termination
          </h2>

          <h3 className="text-lg font-medium text-charcoal">
            14.1 Termination
          </h3>
          <p>
            Either party may terminate this Agreement if the other party commits
            a material breach of this Agreement and the breach is incapable of
            being remedied or if the breach is capable of being remedied, the
            party in breach has failed to remedy the breach within 30 days after
            the receipt of notice to remedy.
          </p>
          <p>
            We may terminate this Agreement prior to any Subscription Period in
            which case this Agreement ends at the end of the then current
            Subscription Period.
          </p>
          <p>
            You may terminate this Agreement with us immediately by closing your
            Account or notifying us in writing.
          </p>

          <h3 className="mt-6 text-lg font-medium text-charcoal">
            14.2 Actions upon termination
          </h3>
          <p>
            Upon termination you must immediately stop using Clear Journey; we
            reserve the right to permanently erase any data and User Content
            associated with your Account; and you will no longer have access to
            your Account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">15. General</h2>
          <p>
            <strong>Assignment</strong> – Neither party may assign, encumber,
            declare a trust over or otherwise create an interest in its rights in
            this Agreement without the other party&apos;s consent.
          </p>
          <p>
            <strong>Entire Agreement</strong> - This Agreement contains the
            entire agreement between the parties about its subject matter. Any
            previous understanding, agreement, representation or warranty
            relating to that subject matter is replaced by this Agreement and has
            no further effect.
          </p>
          <p>
            <strong>Governing law</strong> - The laws of Queensland govern this
            Agreement. The parties submit to the exclusive jurisdiction of courts
            exercising jurisdiction there.
          </p>
          <p>
            <strong>Notices</strong> - The parties agree all notices, disclosures
            and other communications that are provided in accordance with this
            clause, satisfy any legal requirement that such communications be in
            writing. Any communication under or in connection with this
            Agreement:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>
              (a) which we send to you, will be sent to the email address
              provided to us in your Account and by accepting these terms you
              give your consent to receive communications from us by email; and
            </li>
            <li>
              (b) which you send, must be either delivered or posted by prepaid
              post to our registered office or sent by email to our email
              address set out at clause 2.2.
            </li>
          </ul>
          <p>
            <strong>Relationship</strong> - Nothing in this Agreement is
            intended to create or be construed as creating a relationship of
            agency, joint venture or partnership between any of the parties.
          </p>
          <p>
            <strong>Severability</strong> - Any provision of this document which
            is unenforceable or partly unenforceable is, where possible, to be
            severed to the extent necessary to make this Agreement enforceable,
            unless this would materially change its intended effect.
          </p>
          <p>
            <strong>Variations to this Agreement</strong> - We may vary this
            Agreement (including the alteration of Subscription Fees or Usage
            Restrictions of a Subscription Package) by giving written notice to
            you. If you do not accept the terms of the variation, you may
            terminate your subscription in accordance with clause 14.1. The
            variation takes effect at the beginning of the next Subscription
            Period.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-charcoal">
            16. Definitions
          </h2>
          <p>
            Unless the terms and conditions of the Agreement state otherwise, the
            following expressions used in this Agreement have the following
            meanings:
          </p>
          <p>
            <strong>Account</strong> or <strong>Clear Journey Account</strong>{" "}
            means the username and access credentials used when you access Clear
            Journey.
          </p>
          <p>
            <strong>Agreement</strong> means these terms and conditions and any
            document incorporated into them by reference.
          </p>
          <p>
            <strong>Event of Force Majeure</strong> means an act of war (whether
            declared or not) or terrorism, the mobilisation of armed forces,
            civil commotion or riot, natural disaster, health epidemic, industrial
            action or labour disturbance, currency restriction, embargo, action
            or inaction by a government, a failure of a supplier, public utility
            or common carrier or computer disruption due to the effects of a
            computer virus, trojan, malware, a ransomware attack or other
            malicious code.
          </p>
          <p>
            <strong>Intellectual Property</strong> means all present and future
            rights conferred by statute, common law or equity (and all moral
            rights) in or in relation to business names, domain names, circuit
            layouts, computer code, confidential information, copyright,
            designs, formulas, inventions, knowhow, patents, plant varieties,
            recipes, trademarks, and other results of intellectual activity in
            the industrial, commercial, scientific, literary or artistic field,
            the benefit of any application to register such a right and the
            benefit of any renewal or extension of such a right.
          </p>
          <p>
            <strong>Non-excludable Condition</strong> means any guarantee,
            condition or warranty (such as the consumer guarantees implied by the
            Competition and Consumer Act 2010 (Cth)), which cannot by law be
            excluded.
          </p>
          <p>
            <strong>Personal Information</strong> means information or an
            opinion about an identifiable individual (not a company), whether or
            not that information or opinion is true or in a material form.
          </p>
          <p>
            <strong>Privacy Law</strong> means both the privacy laws in the
            jurisdiction in which you operate and the Privacy Act 1988 (Cth)
            incorporating the Australian Privacy Principles.
          </p>
          <p>
            <strong>Privacy Policy</strong> means the privacy policy available
            on our Website as amended by us from time to time.
          </p>
          <p>
            <strong>Subscription Fee</strong> means the price for the Clear
            Journey Subscription Package as set out on our Website.
          </p>
          <p>
            <strong>Subscription Package</strong> means any one of the
            subscription packages advertised on our Website from time to time.
          </p>
          <p>
            <strong>Subscription Period</strong> means the period of time attached
            to the Subscription Package which you sign up for and if no period of
            time is stated then 1 month.
          </p>
          <p>
            <strong>You</strong> or <strong>your</strong> means the person or
            entity using Clear Journey.
          </p>
          <p>
            <strong>Usage Restrictions</strong> means any limits to the use of
            Clear Journey, including but not limited to client, record, storage,
            feature, usage or user limits, and as set out on our Website or in
            the details of the Subscription Package.
          </p>
          <p>
            <strong>Us</strong>, <strong>we</strong> or <strong>our</strong> means
            GY Innovation Group Pty Ltd ACN 674 150 406.
          </p>
          <p>
            <strong>Website</strong> means the website located at{" "}
            <a
              href="https://clearjourney.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline hover:text-navy-dark"
            >
              https://clearjourney.io/
            </a>{" "}
            and any of its subdomains.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
