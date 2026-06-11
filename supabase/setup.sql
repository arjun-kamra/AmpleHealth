-- AmpleHealth blog schema + seed. Run in the Supabase SQL editor.

create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  category text,
  image_url text,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Allow public (anon) read access; writes happen via the service-role key only.
alter table blog_posts enable row level security;

drop policy if exists "Public read access" on blog_posts;
create policy "Public read access" on blog_posts for select using (true);

-- Seed the 7 existing posts (idempotent on slug).
insert into blog_posts (title, slug, excerpt, content, category, image_url, published_at) values
  ('The New Era of Wrinkle Reduction: Botox vs Xeomin in 2026', 'botox-vs-xeomin-2026', 'Many people are exploring nonsurgical cosmetic treatments, like Botox® and Xeomin®, to improve their skin''s appearance. But what''s the difference, and which is best for your situation?', 'Nonsurgical cosmetic treatments have never been more accessible — or more confusing. Two of the most popular neuromodulators on the market, Botox® and Xeomin®, both relax the muscles responsible for dynamic wrinkles, but they''re not identical products. Understanding the difference can help you have a more informed conversation with your provider.

Botox® (onabotulinumtoxinA) has been the gold standard for decades. It contains the botulinum toxin type A complexed with accessory proteins. These proteins may help stabilize the active ingredient, which is why some providers find it has a slightly longer track record across a wide range of uses.

Xeomin® (incobotulinumtoxinA) is sometimes called a ''naked'' neuromodulator because it''s formulated without those accessory proteins. Some research suggests this may reduce the likelihood of developing antibody resistance over repeated treatments, making it an appealing option for patients who receive injections regularly.

In clinical practice, both products produce comparable results for crow''s feet, forehead lines, and the ''11 lines'' between the brows. The choice often comes down to provider preference, patient history, and specific treatment goals.

At AmpleHealth, our physician-led aesthetic care means you''re receiving these treatments from someone trained in anatomy, not just technique. We take a conservative, natural approach — the goal is always to look like a refreshed version of yourself.

If you''re curious about whether Botox or Xeomin is right for you, book a consultation with our team. We''ll walk you through your options and create a plan tailored to your face and your goals.', 'Aesthetics', 'https://source.unsplash.com/featured/1200x600/?skincare', '2026-05-07'),
  ('Warning Signs of Alzheimer''s', 'warning-signs-alzheimers', 'Alzheimer''s disease affects millions of Americans. There''s no cure, but early detection can help slow symptom progression and improve quality of life. Learn how to spot the early signs.', 'Alzheimer''s disease is the most common form of dementia, affecting more than 6 million Americans. While there is currently no cure, early detection remains one of the most powerful tools available — giving patients and families more time to plan, access support, and pursue treatments that may slow progression.

The challenge is that many early signs of Alzheimer''s are subtle and easy to attribute to normal aging. Knowing what to look for can make a meaningful difference.

Memory loss that disrupts daily life is the most well-known warning sign, but it''s important to distinguish this from occasionally forgetting a name or appointment. People with early Alzheimer''s often forget recently learned information, ask the same questions repeatedly, or increasingly rely on memory aids for things they previously managed easily.

Other early signs include: challenges in planning or solving problems (difficulty following familiar recipes or managing bills); confusion with time or place (losing track of dates, seasons, or where they are); trouble with visual images and spatial relationships; new problems with words in speaking or writing; misplacing things and being unable to retrace steps; decreased or poor judgment; and withdrawal from social activities.

It''s worth noting that occasional memory lapses are normal at any age. The difference with Alzheimer''s is frequency, severity, and impact on daily functioning.

If you or someone you love is experiencing several of these signs, talk to a physician. At AmpleHealth, we offer cognitive assessments as part of our geriatric and preventive care and can help you navigate next steps with compassion and clarity.', 'Geriatrics', 'https://source.unsplash.com/featured/1200x600/?senior-care', '2026-04-07'),
  ('Choosing the Right Birth Control for You', 'choosing-birth-control', 'Birth control can help prevent an unintended pregnancy or manage conditions like endometriosis. But there are so many options. How do you know what''s best for your needs and lifestyle?', 'Choosing a birth control method is one of the most personal healthcare decisions a person can make. The right choice depends on your health history, lifestyle, future pregnancy plans, and what matters most to you — whether that''s convenience, effectiveness, hormone-free options, or managing an underlying condition like endometriosis or PCOS.

Hormonal methods — including the pill, patch, ring, injection, and hormonal IUD — work by preventing ovulation, thickening cervical mucus, or thinning the uterine lining. They are highly effective when used correctly and can provide additional benefits like reducing menstrual pain, managing acne, and treating endometriosis.

Long-acting reversible contraceptives (LARCs) like the hormonal IUD and copper IUD are among the most effective options available and require no daily action. The copper IUD offers highly effective, hormone-free protection and can also be used as emergency contraception.

Barrier methods — condoms, diaphragms, and cervical caps — do not affect hormones and provide the added benefit (for condoms) of protection against sexually transmitted infections. They require consistent use to be effective.

Permanent options like tubal ligation and vasectomy are appropriate for people who are certain they do not want future pregnancies.

The best birth control is the one you''ll use consistently and that fits your health profile. Our providers at AmpleHealth take the time to understand your full picture before making a recommendation — no rushed consultations, no one-size-fits-all answers.', 'Women''s Health', 'https://source.unsplash.com/featured/1200x600/?women-health', '2026-03-17'),
  ('The Importance of Your Annual Physical Exam', 'annual-physical-exam', 'If you feel healthy, it''s easy to put off a physical exam. But many medical issues, like high blood pressure, don''t have obvious symptoms. Learn why you should schedule an annual physical.', 'It''s tempting to skip the annual physical when you feel fine. But feeling fine and being healthy are not the same thing — and that gap is exactly what the annual physical is designed to close.

Many of the most serious and common health conditions develop silently. High blood pressure, elevated cholesterol, pre-diabetes, and early kidney disease often produce no noticeable symptoms until they''ve been progressing for years. By then, the damage is harder to reverse. Regular checkups catch these conditions early, when intervention is most effective.

The annual physical also gives your physician a baseline. Over time, your doctor builds a longitudinal picture of your health — tracking trends in your lab work, weight, blood pressure, and more. This context is invaluable when something changes.

Beyond the numbers, the annual physical is a conversation. It''s an opportunity to discuss anything on your mind — sleep, stress, joint pain, medication side effects, preventive screenings you might be due for, or health goals you want support with.

Preventive screenings are another key component. Depending on your age, sex, and risk factors, your annual visit may include colorectal cancer screening, mammography referral, bone density testing, STI screening, vision and hearing checks, and immunization review.

At AmpleHealth, we don''t rush annual physicals. We use them as a foundation for the kind of longitudinal, relationship-driven care that actually keeps people healthy over time. If you haven''t scheduled yours yet, there''s no better time.', 'Prevention', 'https://source.unsplash.com/featured/1200x600/?healthcare', '2026-02-18'),
  ('PRP: Why It''s a Game-Changer in Remedying Joint Pain', 'prp-joint-pain', 'When you''re in pain, medication can mask it for a while, but stopping it for good would be life-changing. Find out if platelet-rich plasma (PRP) could be the therapy that finally gives you your life back.', 'Joint pain is one of the most common reasons patients seek medical care — and one of the most frustrating to treat. Anti-inflammatory medications can reduce pain in the short term, but they don''t address the underlying tissue damage, and long-term use carries its own risks.

Platelet-rich plasma (PRP) therapy offers a different approach: using your body''s own healing mechanisms to repair damaged tissue. PRP is derived from a small sample of your own blood, which is then processed to concentrate the platelets — cells that are rich in growth factors critical to tissue repair and regeneration.

The concentrated PRP is then injected directly into the affected joint or tissue. The growth factors stimulate cellular repair, reduce inflammation, and support the regeneration of tendons, ligaments, and cartilage. For many patients with osteoarthritis, tendinopathy, or sports injuries, PRP provides sustained relief that outlasts conventional treatments.

The evidence base for PRP continues to grow. Studies have shown meaningful improvements in knee osteoarthritis, rotator cuff tendinopathy, and lateral epicondylitis (tennis elbow), among other conditions. Because PRP is derived from your own blood, the risk of adverse reactions is low.

PRP isn''t right for everyone, and it''s important to set realistic expectations. It typically requires one to three sessions and may take several weeks for the full effect to be felt. But for patients who have plateaued with physical therapy and want to avoid surgery, it represents a meaningful option.

Talk to your AmpleHealth provider to find out if PRP therapy might be appropriate for your situation.', 'Chronic Care', 'https://source.unsplash.com/featured/1200x600/?wellness', '2026-01-26'),
  ('What Are My Birth Control Options?', 'birth-control-options', 'Birth control can prevent unwanted pregnancies and help manage certain medical conditions, but which type is right for you?', 'Understanding your birth control options is an important part of managing your reproductive health. Whether your goal is preventing pregnancy, managing a medical condition, or both, there''s likely an option that fits your life.

Hormonal contraceptives include combined oral contraceptive pills (estrogen and progestin), progestin-only pills (the ''mini-pill''), the contraceptive patch, the vaginal ring, the injectable (Depo-Provera), and hormonal IUDs. Each has different dosing schedules, side effect profiles, and suitability depending on your health history.

Non-hormonal options include the copper IUD (highly effective, hormone-free, lasts up to 10 years), barrier methods like condoms and diaphragms, and fertility awareness-based methods for those who prefer a natural approach.

Permanent contraception (tubal ligation, vasectomy) is available for individuals certain they do not want future pregnancies.

Emergency contraception — including Plan B and the copper IUD — is available for use after unprotected sex.

The right choice is deeply personal. Your medical history, future pregnancy plans, and lifestyle all matter. Schedule an appointment with an AmpleHealth provider for a confidential conversation about which options are right for you.', 'Women''s Health', 'https://source.unsplash.com/featured/1200x600/?women-health', '2025-06-04'),
  ('Can Telehealth Work for Me If I''m Technically Challenged?', 'telehealth-for-everyone', 'Worried that telehealth might be too complicated if you''re not great with technology? You might be surprised at how simple and accessible virtual visits have become.', 'Telehealth has come a long way. What once required specialized software, headsets, and a steep learning curve now works on virtually any smartphone or computer with a browser and a camera. If you can video chat with a family member, you can do a telehealth visit.

The most common concern we hear is: ''I''m not good with technology.'' But modern telehealth platforms are designed with accessibility in mind. Most require nothing more than clicking a link in an email or text message. No downloads, no accounts, no passwords.

For patients who prefer a guided experience, our staff can walk you through the setup process over the phone before your appointment. We build in time to troubleshoot together so that technical issues don''t cut into your visit time.

Telehealth is particularly well-suited for follow-up appointments, medication management, minor acute concerns, and conversations about lab results or care plans. For these types of visits, the quality of care is equivalent to an in-person visit.

There are situations where an in-person visit is necessary — physical exams, procedures, and certain urgent concerns require being in the office. Our team will always help you identify the right format for your needs.

If you''ve been putting off a visit because getting to the office is difficult, telehealth may be the answer. Call us to schedule, and we''ll make sure you''re comfortable with the technology before your appointment.', 'Telehealth', 'https://source.unsplash.com/featured/1200x600/?telehealth', '2025-05-05')
on conflict (slug) do nothing;
