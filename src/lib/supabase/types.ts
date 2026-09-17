export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          patient_name: string
          country: string
          whatsapp_number: string
          email: string | null
          treatment_needed: string
          preferred_hospital: string | null
          preferred_city: string | null
          medical_summary: string | null
          status: 'new' | 'contacted' | 'opinion_requested' | 'quotation_sent' | 'visa_initiated' | 'scheduled' | 'closed'
          source_page: string | null
          medical_reports_urls: string[] | null
          assigned_coordinator: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          patient_name: string
          country: string
          whatsapp_number: string
          email?: string | null
          treatment_needed: string
          preferred_hospital?: string | null
          preferred_city?: string | null
          medical_summary?: string | null
          status?: 'new' | 'contacted' | 'opinion_requested' | 'quotation_sent' | 'visa_initiated' | 'scheduled' | 'closed'
          source_page?: string | null
          medical_reports_urls?: string[] | null
          assigned_coordinator?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          patient_name?: string
          country?: string
          whatsapp_number?: string
          email?: string | null
          treatment_needed?: string
          preferred_hospital?: string | null
          preferred_city?: string | null
          medical_summary?: string | null
          status?: 'new' | 'contacted' | 'opinion_requested' | 'quotation_sent' | 'visa_initiated' | 'scheduled' | 'closed'
          source_page?: string | null
          medical_reports_urls?: string[] | null
          assigned_coordinator?: string | null
        }
        Relationships: []
      }
      procedures: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          specialty: string
          price_inr_min: number
          price_inr_max: number
          currency: string
          duration_stay_days: number
          short_trust_blurb: string
          status: 'draft' | 'pending_review' | 'approved' | 'published'
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          specialty: string
          price_inr_min?: number
          price_inr_max?: number
          currency?: string
          duration_stay_days?: number
          short_trust_blurb?: string
          status?: 'draft' | 'pending_review' | 'approved' | 'published'
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          specialty?: string
          price_inr_min?: number
          price_inr_max?: number
          currency?: string
          duration_stay_days?: number
          short_trust_blurb?: string
          status?: 'draft' | 'pending_review' | 'approved' | 'published'
        }
        Relationships: []
      }
      landing_pages: {
        Row: {
          id: string
          created_at: string
          procedure_id: string | null
          slug: string
          headline: string
          subheadline: string
          meta_title: string
          meta_description: string
          hero_cta_text: string
          generated_at: string
          reviewed_by: string | null
          approved_at: string | null
          published_at: string | null
          status: 'draft' | 'pending_review' | 'approved' | 'published'
        }
        Insert: {
          id?: string
          created_at?: string
          procedure_id?: string | null
          slug: string
          headline: string
          subheadline: string
          meta_title: string
          meta_description: string
          hero_cta_text?: string
          generated_at?: string
          reviewed_by?: string | null
          approved_at?: string | null
          published_at?: string | null
          status?: 'draft' | 'pending_review' | 'approved' | 'published'
        }
        Update: {
          id?: string
          created_at?: string
          procedure_id?: string | null
          slug?: string
          headline?: string
          subheadline?: string
          meta_title?: string
          meta_description?: string
          hero_cta_text?: string
          generated_at?: string
          reviewed_by?: string | null
          approved_at?: string | null
          published_at?: string | null
          status?: 'draft' | 'pending_review' | 'approved' | 'published'
        }
        Relationships: []
      }
      blog_topics: {
        Row: {
          id: string
          created_at: string
          target_keyword: string
          working_title: string
          category: string
          priority: 'top-of-funnel' | 'bottom-of-funnel'
          status: 'queued' | 'drafted' | 'pending_review' | 'approved' | 'published'
        }
        Insert: {
          id?: string
          created_at?: string
          target_keyword: string
          working_title: string
          category: string
          priority?: 'top-of-funnel' | 'bottom-of-funnel'
          status?: 'queued' | 'drafted' | 'pending_review' | 'approved' | 'published'
        }
        Update: {
          id?: string
          created_at?: string
          target_keyword?: string
          working_title?: string
          category?: string
          priority?: 'top-of-funnel' | 'bottom-of-funnel'
          status?: 'queued' | 'drafted' | 'pending_review' | 'approved' | 'published'
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          topic_id: string | null
          title: string
          slug: string
          content: string
          meta_title: string
          meta_description: string
          faq_items: Json | null
          author: string
          medical_reviewer_name: string | null
          medical_reviewer_credentials: string | null
          medical_reviewer_reg_number: string | null
          last_reviewed_date: string | null
          status: 'draft' | 'pending_review' | 'approved' | 'published'
          published_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          topic_id?: string | null
          title: string
          slug: string
          content: string
          meta_title: string
          meta_description: string
          faq_items?: Json | null
          author?: string
          medical_reviewer_name?: string | null
          medical_reviewer_credentials?: string | null
          medical_reviewer_reg_number?: string | null
          last_reviewed_date?: string | null
          status?: 'draft' | 'pending_review' | 'approved' | 'published'
          published_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          topic_id?: string | null
          title?: string
          slug?: string
          content?: string
          meta_title?: string
          meta_description?: string
          faq_items?: Json | null
          author?: string
          medical_reviewer_name?: string | null
          medical_reviewer_credentials?: string | null
          medical_reviewer_reg_number?: string | null
          last_reviewed_date?: string | null
          status?: 'draft' | 'pending_review' | 'approved' | 'published'
          published_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
