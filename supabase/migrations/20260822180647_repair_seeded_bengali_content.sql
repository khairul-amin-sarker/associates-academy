-- Repair only known mojibake from the historical Windows-applied seed.
-- The predicates preserve any already-correct or subsequently edited content.

update public.pages
set
  draft_content = coalesce(draft_content, '{}'::jsonb) || jsonb_build_object(
    'title', 'আয়কর ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম',
    'description', 'আইন শুধু মুখস্থ নয়—বোঝা, প্রয়োগ করা এবং পেশাগত কাজে আত্মবিশ্বাসের সঙ্গে ব্যবহার করার জন্য structured learning experience।',
    'primaryCta', 'কোর্স দেখুন',
    'secondaryCta', 'eBook দেখুন',
    'founderName', 'খাইরুল আমিন সরকার',
    'founderBio', 'Income Tax, VAT ও professional compliance নিয়ে practical teaching, structured framework এবং নিয়মিত law update-এর মাধ্যমে শিক্ষার্থীদের বাস্তব কাজে প্রস্তুত করেন।'
  ),
  published_content = coalesce(published_content, '{}'::jsonb) || jsonb_build_object(
    'title', 'আয়কর ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম',
    'description', 'আইন শুধু মুখস্থ নয়—বোঝা, প্রয়োগ করা এবং পেশাগত কাজে আত্মবিশ্বাসের সঙ্গে ব্যবহার করার জন্য structured learning experience।',
    'primaryCta', 'কোর্স দেখুন',
    'secondaryCta', 'eBook দেখুন',
    'founderName', 'খাইরুল আমিন সরকার',
    'founderBio', 'Income Tax, VAT ও professional compliance নিয়ে practical teaching, structured framework এবং নিয়মিত law update-এর মাধ্যমে শিক্ষার্থীদের বাস্তব কাজে প্রস্তুত করেন।'
  ),
  seo = coalesce(seo, '{}'::jsonb) || jsonb_build_object(
    'title', 'Associates Academy',
    'description', 'আয়কর, ভ্যাট, আইন ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম।'
  ),
  updated_at = now()
where slug = 'home'
  and (
    coalesce(draft_content::text, '') ~ '[àâ]'
    or coalesce(published_content::text, '') ~ '[àâ]'
    or coalesce(seo::text, '') ~ '[àâ]'
  );

update public.products
set summary = 'Act থেকে Return—complete practical working framework', updated_at = now()
where slug = 'income-tax-working-framework'
  and summary ~ '[àâ]';

update public.products
set summary = '১২৩ পৃষ্ঠার Bengali digital handbook', updated_at = now()
where slug = 'fundamentals-income-tax-ebook'
  and summary ~ '[àâ]';

update public.courses c
set instructor_name = 'খাইরুল আমিন সরকার', updated_at = now()
from public.products p
where p.id = c.product_id
  and p.slug = 'income-tax-working-framework'
  and c.instructor_name ~ '[àâ]';
