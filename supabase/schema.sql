-- ==============================================================================
-- healthremade — Supabase Database Architecture Schema
-- Execute this script in your Supabase SQL Editor: Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. PATIENT LEADS & QUOTE REQUESTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    patient_name TEXT NOT NULL,
    country TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    email TEXT,
    treatment_needed TEXT NOT NULL,
    preferred_hospital TEXT,
    preferred_city TEXT,
    medical_summary TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'opinion_requested', 'quotation_sent', 'visa_initiated', 'scheduled', 'closed')),
    source_page TEXT,
    medical_reports_urls TEXT[],
    assigned_coordinator TEXT
);

-- Index for querying leads by status and date
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);

-- RLS: Allow anyone (anon) to submit a quote, but only admins to view/update
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous lead submission" ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated staff full access to leads" ON public.leads
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- ==============================================================================
-- 3. FLAGSHIP & DYNAMIC PROCEDURES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.procedures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    specialty TEXT NOT NULL,
    price_inr_min NUMERIC NOT NULL DEFAULT 0,
    price_inr_max NUMERIC NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'INR',
    duration_stay_days INTEGER NOT NULL DEFAULT 14,
    short_trust_blurb TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'published'))
);

CREATE INDEX IF NOT EXISTS idx_procedures_slug ON public.procedures (slug);
CREATE INDEX IF NOT EXISTS idx_procedures_status ON public.procedures (status);

ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published procedures" ON public.procedures
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

CREATE POLICY "Allow authenticated staff full procedure management" ON public.procedures
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- ==============================================================================
-- 4. AI-GENERATED LANDING PAGES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.landing_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    procedure_id UUID REFERENCES public.procedures(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    headline TEXT NOT NULL,
    subheadline TEXT NOT NULL,
    meta_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    hero_cta_text TEXT NOT NULL DEFAULT 'Get Free Hospital Quotes',
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_by TEXT,
    approved_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'published'))
);

CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON public.landing_pages (slug);
CREATE INDEX IF NOT EXISTS idx_landing_pages_status ON public.landing_pages (status);

ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published landing pages" ON public.landing_pages
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

CREATE POLICY "Allow authenticated staff full landing page management" ON public.landing_pages
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- ==============================================================================
-- 5. SEO BLOG TOPICS & PIPELINE TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.blog_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    target_keyword TEXT NOT NULL,
    working_title TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'top-of-funnel' CHECK (priority IN ('top-of-funnel', 'bottom-of-funnel')),
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'drafted', 'pending_review', 'approved', 'published'))
);

CREATE INDEX IF NOT EXISTS idx_blog_topics_status ON public.blog_topics (status);

ALTER TABLE public.blog_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated staff full access to blog topics" ON public.blog_topics
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- ==============================================================================
-- 6. SEO BLOG POSTS (WITH MANDATORY DOCTOR REVIEW BYLINE)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    topic_id UUID REFERENCES public.blog_topics(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    meta_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    faq_items JSONB,
    author TEXT NOT NULL DEFAULT 'healthremade Medical Editorial Team',
    medical_reviewer_name TEXT,
    medical_reviewer_credentials TEXT,
    medical_reviewer_reg_number TEXT,
    last_reviewed_date DATE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'published')),
    published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts (status);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published blog posts" ON public.blog_posts
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

CREATE POLICY "Allow authenticated staff full blog management" ON public.blog_posts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- ==============================================================================
-- 7. STORAGE BUCKET FOR PATIENT MEDICAL SCANS & REPORTS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'patient-medical-reports',
    'patient-medical-reports',
    false,
    26214400, -- 25 MB file limit
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Allow anyone to upload a medical report when submitting a quote
CREATE POLICY "Allow anonymous upload of patient reports"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'patient-medical-reports');

-- Only authenticated coordinators can view medical reports
CREATE POLICY "Allow staff to read patient reports"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'patient-medical-reports');
