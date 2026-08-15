import { InfoPage } from "@/components/marketing/info-page";
import { businessAddressContent, businessInfo } from "@/lib/content/legal";

export default function ContactPage() {
  return (
    <InfoPage eyebrow="CONTACT" title="আমাদের সঙ্গে যোগাযোগ করুন">
      <p>
        Associates Academy-এর course, payment, enrollment, digital product,
        refund অথবা technical support সংক্রান্ত যেকোনো বিষয়ে আমাদের সঙ্গে
        যোগাযোগ করতে পারেন।
      </p>
      <p className="whitespace-pre-line">
        Registered Business Name: {businessInfo.registeredBusinessName}
        {"\n"}Business/Office Address: {businessInfo.address}
        {"\n"}Trade License No.: {businessInfo.tradeLicense}
        {"\n"}Country: {businessInfo.country}
      </p>
      <p>
        Phone:{" "}
        {businessInfo.phones.map((phone, index) => (
          <span key={phone}>
            {index > 0 ? " / " : ""}
            <a
              className="text-brand-indigo font-semibold underline underline-offset-4"
              href={businessInfo.phoneHrefs[index]}
            >
              {phone}
            </a>
          </span>
        ))}
      </p>
      <p>
        Email:{" "}
        <a
          className="text-brand-indigo font-semibold underline underline-offset-4"
          href={`mailto:${businessInfo.email}`}
        >
          {businessInfo.email}
        </a>
      </p>
      <p>{businessAddressContent.support}</p>
    </InfoPage>
  );
}
