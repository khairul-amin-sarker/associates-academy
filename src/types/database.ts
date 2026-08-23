export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      ad_campaign_metrics: {
        Row: {
          account_id: string
          attributed_purchases: number
          attributed_revenue: number
          campaign_id: string
          campaign_name: string | null
          clicks: number
          day: string
          impressions: number
          platform: string
          raw_metrics: Json
          spend: number
          synced_at: string
        }
        Insert: {
          account_id: string
          attributed_purchases?: number
          attributed_revenue?: number
          campaign_id: string
          campaign_name?: string | null
          clicks?: number
          day: string
          impressions?: number
          platform: string
          raw_metrics?: Json
          spend?: number
          synced_at?: string
        }
        Update: {
          account_id?: string
          attributed_purchases?: number
          attributed_revenue?: number
          campaign_id?: string
          campaign_name?: string | null
          clicks?: number
          day?: string
          impressions?: number
          platform?: string
          raw_metrics?: Json
          spend?: number
          synced_at?: string
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          after_snapshot: Json | null
          before_snapshot: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: number
          request_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_snapshot?: Json | null
          before_snapshot?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: never
          request_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_snapshot?: Json | null
          before_snapshot?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: never
          request_id?: string | null
        }
        Relationships: []
      }
      analytics_daily_rollups: {
        Row: {
          checkout_started: number
          day: string
          dimension_type: string
          dimension_value: string
          events: number
          revenue: number
          sessions: number
          updated_at: string
          users: number
          verified_purchases: number
        }
        Insert: {
          checkout_started?: number
          day: string
          dimension_type: string
          dimension_value: string
          events?: number
          revenue?: number
          sessions?: number
          updated_at?: string
          users?: number
          verified_purchases?: number
        }
        Update: {
          checkout_started?: number
          day?: string
          dimension_type?: string
          dimension_value?: string
          events?: number
          revenue?: number
          sessions?: number
          updated_at?: string
          users?: number
          verified_purchases?: number
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          event_name: string
          id: string
          occurred_at: string
          path: string
          properties: Json
          received_at: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          event_name: string
          id: string
          occurred_at: string
          path: string
          properties?: Json
          received_at?: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          event_name?: string
          id?: string
          occurred_at?: string
          path?: string
          properties?: Json
          received_at?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "analytics_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_preferences: {
        Row: {
          collection_enabled: boolean
          retention_months: number
          updated_at: string
          user_id: string
        }
        Insert: {
          collection_enabled?: boolean
          retention_months?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          collection_enabled?: boolean
          retention_months?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_sessions: {
        Row: {
          event_count: number
          fbclid_hash: string | null
          first_path: string
          first_seen_at: string
          id: string
          last_path: string
          last_seen_at: string
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          event_count?: number
          fbclid_hash?: string | null
          first_path: string
          first_seen_at: string
          id: string
          last_path: string
          last_seen_at: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          event_count?: number
          fbclid_hash?: string | null
          first_path?: string
          first_seen_at?: string
          id?: string
          last_path?: string
          last_seen_at?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      batches: {
        Row: {
          calendar_url: string | null
          capacity: number | null
          community_url: string | null
          course_id: number
          created_at: string
          ends_at: string | null
          enrollment_closes_at: string | null
          enrollment_opens_at: string | null
          id: number
          is_published: boolean
          meet_url: string | null
          name: string
          starts_at: string | null
          updated_at: string
        }
        Insert: {
          calendar_url?: string | null
          capacity?: number | null
          community_url?: string | null
          course_id: number
          created_at?: string
          ends_at?: string | null
          enrollment_closes_at?: string | null
          enrollment_opens_at?: string | null
          id?: never
          is_published?: boolean
          meet_url?: string | null
          name: string
          starts_at?: string | null
          updated_at?: string
        }
        Update: {
          calendar_url?: string | null
          capacity?: number | null
          community_url?: string | null
          course_id?: number
          created_at?: string
          ends_at?: string | null
          enrollment_closes_at?: string | null
          enrollment_opens_at?: string | null
          id?: never
          is_published?: boolean
          meet_url?: string | null
          name?: string
          starts_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batches_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          batch_name: string | null
          bucket_id: string | null
          course_name: string
          created_at: string
          expires_at: string | null
          grade: string | null
          id: number
          instructor_name: string
          issued_at: string
          object_path: string | null
          status: string
          student_name: string
          updated_at: string
          user_id: string | null
          verification_code: string
        }
        Insert: {
          batch_name?: string | null
          bucket_id?: string | null
          course_name: string
          created_at?: string
          expires_at?: string | null
          grade?: string | null
          id?: never
          instructor_name: string
          issued_at: string
          object_path?: string | null
          status?: string
          student_name: string
          updated_at?: string
          user_id?: string | null
          verification_code: string
        }
        Update: {
          batch_name?: string | null
          bucket_id?: string | null
          course_name?: string
          created_at?: string
          expires_at?: string | null
          grade?: string | null
          id?: never
          instructor_name?: string
          issued_at?: string
          object_path?: string | null
          status?: string
          student_name?: string
          updated_at?: string
          user_id?: string | null
          verification_code?: string
        }
        Relationships: []
      }
      class_sessions: {
        Row: {
          batch_id: number
          calendar_url: string | null
          created_at: string
          ends_at: string
          id: number
          is_published: boolean
          meet_url: string | null
          module_id: number
          starts_at: string
          updated_at: string
        }
        Insert: {
          batch_id: number
          calendar_url?: string | null
          created_at?: string
          ends_at: string
          id?: never
          is_published?: boolean
          meet_url?: string | null
          module_id: number
          starts_at: string
          updated_at?: string
        }
        Update: {
          batch_id?: number
          calendar_url?: string | null
          created_at?: string
          ends_at?: string
          id?: never
          is_published?: boolean
          meet_url?: string | null
          module_id?: number
          starts_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_sessions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_sessions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      content_revisions: {
        Row: {
          content: Json
          created_at: string
          created_by: string | null
          id: string
          page_id: number
          revision_number: number
          seo: Json
        }
        Insert: {
          content: Json
          created_at?: string
          created_by?: string | null
          id?: string
          page_id: number
          revision_number: number
          seo?: Json
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          page_id?: number
          revision_number?: number
          seo?: Json
        }
        Relationships: [
          {
            foreignKeyName: "content_revisions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      coupon_redemptions: {
        Row: {
          coupon_id: number
          created_at: string
          discount_amount: number
          id: number
          normalized_email: string | null
          order_id: number
          user_id: string | null
        }
        Insert: {
          coupon_id: number
          created_at?: string
          discount_amount: number
          id?: never
          normalized_email?: string | null
          order_id: number
          user_id?: string | null
        }
        Update: {
          coupon_id?: number
          created_at?: string
          discount_amount?: number
          id?: never
          normalized_email?: string | null
          order_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_redemptions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          ends_at: string | null
          id: number
          is_active: boolean
          max_redemptions: number | null
          max_redemptions_per_user: number
          product_id: number | null
          starts_at: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          discount_type: string
          discount_value: number
          ends_at?: string | null
          id?: never
          is_active?: boolean
          max_redemptions?: number | null
          max_redemptions_per_user?: number
          product_id?: number | null
          starts_at?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          ends_at?: string | null
          id?: never
          is_active?: boolean
          max_redemptions?: number | null
          max_redemptions_per_user?: number
          product_id?: number | null
          starts_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupons_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      course_resources: {
        Row: {
          bucket_id: string
          course_id: number
          created_at: string
          id: number
          is_published: boolean
          mime_type: string | null
          object_path: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          bucket_id?: string
          course_id: number
          created_at?: string
          id?: never
          is_published?: boolean
          mime_type?: string | null
          object_path: string
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          course_id?: number
          created_at?: string
          id?: never
          is_published?: boolean
          mime_type?: string | null
          object_path?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_resources_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          certificate_enabled: boolean
          created_at: string
          id: number
          instructor_name: string
          instructor_title: string
          learning_outcomes: Json
          product_id: number
          updated_at: string
        }
        Insert: {
          certificate_enabled?: boolean
          created_at?: string
          id?: never
          instructor_name: string
          instructor_title: string
          learning_outcomes?: Json
          product_id: number
          updated_at?: string
        }
        Update: {
          certificate_enabled?: boolean
          created_at?: string
          id?: never
          instructor_name?: string
          instructor_title?: string
          learning_outcomes?: Json
          product_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      ebooks: {
        Row: {
          bucket_id: string
          created_at: string
          edition: string | null
          id: number
          is_published: boolean
          object_path: string | null
          page_count: number | null
          product_id: number
          updated_at: string
        }
        Insert: {
          bucket_id?: string
          created_at?: string
          edition?: string | null
          id?: never
          is_published?: boolean
          object_path?: string | null
          page_count?: number | null
          product_id: number
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          edition?: string | null
          id?: never
          is_published?: boolean
          object_path?: string | null
          page_count?: number | null
          product_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ebooks_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      email_delivery_logs: {
        Row: {
          created_at: string
          detail: Json | null
          event_type: string
          id: number
          outbox_id: string
          provider_message_id: string | null
        }
        Insert: {
          created_at?: string
          detail?: Json | null
          event_type: string
          id?: never
          outbox_id: string
          provider_message_id?: string | null
        }
        Update: {
          created_at?: string
          detail?: Json | null
          event_type?: string
          id?: never
          outbox_id?: string
          provider_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_delivery_logs_outbox_id_fkey"
            columns: ["outbox_id"]
            isOneToOne: false
            referencedRelation: "email_outbox"
            referencedColumns: ["id"]
          },
        ]
      }
      email_outbox: {
        Row: {
          attempt_count: number
          created_at: string
          id: string
          idempotency_key: string
          last_error: string | null
          locked_at: string | null
          next_attempt_at: string
          payload: Json
          recipient_email: string
          sent_at: string | null
          status: Database["public"]["Enums"]["email_status"]
          template_key: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          id?: string
          idempotency_key: string
          last_error?: string | null
          locked_at?: string | null
          next_attempt_at?: string
          payload: Json
          recipient_email: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_status"]
          template_key: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          created_at?: string
          id?: string
          idempotency_key?: string
          last_error?: string | null
          locked_at?: string | null
          next_attempt_at?: string
          payload?: Json
          recipient_email?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_status"]
          template_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          access_ends_at: string | null
          access_starts_at: string | null
          batch_id: number | null
          created_at: string
          id: number
          order_id: number | null
          product_id: number
          status: Database["public"]["Enums"]["enrollment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          access_ends_at?: string | null
          access_starts_at?: string | null
          batch_id?: number | null
          created_at?: string
          id?: never
          order_id?: number | null
          product_id: number
          status?: Database["public"]["Enums"]["enrollment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          access_ends_at?: string | null
          access_starts_at?: string | null
          batch_id?: number | null
          created_at?: string
          id?: never
          order_id?: number | null
          product_id?: number
          status?: Database["public"]["Enums"]["enrollment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_runs: {
        Row: {
          completed_at: string | null
          detail: Json | null
          error_message: string | null
          id: string
          integration_key: string
          records_processed: number
          run_type: string
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          detail?: Json | null
          error_message?: string | null
          id?: string
          integration_key: string
          records_processed?: number
          run_type: string
          started_at?: string
          status: string
        }
        Update: {
          completed_at?: string | null
          detail?: Json | null
          error_message?: string | null
          id?: string
          integration_key?: string
          records_processed?: number
          run_type?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: string | null
          bucket_id: string
          created_at: string
          height: number | null
          id: string
          mime_type: string
          object_path: string
          original_name: string
          size_bytes: number
          uploaded_by: string | null
          verified_at: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          bucket_id: string
          created_at?: string
          height?: number | null
          id?: string
          mime_type: string
          object_path: string
          original_name: string
          size_bytes: number
          uploaded_by?: string | null
          verified_at?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          bucket_id?: string
          created_at?: string
          height?: number | null
          id?: string
          mime_type?: string
          object_path?: string
          original_name?: string
          size_bytes?: number
          uploaded_by?: string | null
          verified_at?: string | null
          width?: number | null
        }
        Relationships: []
      }
      menus: {
        Row: {
          created_at: string
          href: string
          id: number
          is_visible: boolean
          label: string
          location: string
          parent_id: number | null
          position: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: never
          is_visible?: boolean
          label: string
          location: string
          parent_id?: number | null
          position?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: never
          is_visible?: boolean
          label?: string
          location?: string
          parent_id?: number | null
          position?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      module_progress: {
        Row: {
          completed_at: string
          created_at: string
          enrollment_id: number
          id: number
          marked_by: string | null
          module_id: number
          updated_at: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          enrollment_id: number
          id?: never
          marked_by?: string | null
          module_id: number
          updated_at?: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          enrollment_id?: number
          id?: never
          marked_by?: string | null
          module_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      module_resources: {
        Row: {
          bucket_id: string
          created_at: string
          id: number
          is_published: boolean
          mime_type: string | null
          module_id: number
          object_path: string
          position: number
          title: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id?: never
          is_published?: boolean
          mime_type?: string | null
          module_id: number
          object_path: string
          position?: number
          title: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: never
          is_published?: boolean
          mime_type?: string | null
          module_id?: number
          object_path?: string
          position?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_resources_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          course_id: number
          created_at: string
          description: string | null
          id: number
          is_preview: boolean
          is_published: boolean
          position: number
          recording_url: string | null
          title: string
          unlock_at: string | null
          updated_at: string
        }
        Insert: {
          course_id: number
          created_at?: string
          description?: string | null
          id?: never
          is_preview?: boolean
          is_published?: boolean
          position?: number
          recording_url?: string | null
          title: string
          unlock_at?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: number
          created_at?: string
          description?: string | null
          id?: never
          is_preview?: boolean
          is_published?: boolean
          position?: number
          recording_url?: string | null
          title?: string
          unlock_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: number
          interests: string[]
          source: string
          status: string
          subscribed_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: never
          interests?: string[]
          source?: string
          status?: string
          subscribed_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: never
          interests?: string[]
          source?: string
          status?: string
          subscribed_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: number
          line_total: number
          order_id: number
          product_id: number
          quantity: number
          title_snapshot: string
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: never
          line_total: number
          order_id: number
          product_id: number
          quantity?: number
          title_snapshot: string
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: never
          line_total?: number
          order_id?: number
          product_id?: number
          quantity?: number
          title_snapshot?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          checkout_request_id: string | null
          compare_at_price_snapshot: number | null
          coupon_code: string | null
          created_at: string
          currency: string
          customer_snapshot: Json
          discount_amount: number
          expires_at: string | null
          gateway_fee: number
          gateway_fee_mode_snapshot:
            | Database["public"]["Enums"]["gateway_fee_mode"]
            | null
          id: number
          invoice_number: string
          last_verification_at: string | null
          next_reconciliation_at: string | null
          normalized_email: string | null
          paid_at: string | null
          payment_state: string
          product_id_snapshot: number | null
          product_slug_snapshot: string | null
          product_title_snapshot: string | null
          product_type_snapshot:
            | Database["public"]["Enums"]["product_type"]
            | null
          provider_mode: string | null
          provider_reference: string | null
          refunded_at: string | null
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total_amount: number
          updated_at: string
          user_id: string | null
          verification_count: number
        }
        Insert: {
          checkout_request_id?: string | null
          compare_at_price_snapshot?: number | null
          coupon_code?: string | null
          created_at?: string
          currency?: string
          customer_snapshot: Json
          discount_amount?: number
          expires_at?: string | null
          gateway_fee?: number
          gateway_fee_mode_snapshot?:
            | Database["public"]["Enums"]["gateway_fee_mode"]
            | null
          id?: never
          invoice_number: string
          last_verification_at?: string | null
          next_reconciliation_at?: string | null
          normalized_email?: string | null
          paid_at?: string | null
          payment_state?: string
          product_id_snapshot?: number | null
          product_slug_snapshot?: string | null
          product_title_snapshot?: string | null
          product_type_snapshot?:
            | Database["public"]["Enums"]["product_type"]
            | null
          provider_mode?: string | null
          provider_reference?: string | null
          refunded_at?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total_amount: number
          updated_at?: string
          user_id?: string | null
          verification_count?: number
        }
        Update: {
          checkout_request_id?: string | null
          compare_at_price_snapshot?: number | null
          coupon_code?: string | null
          created_at?: string
          currency?: string
          customer_snapshot?: Json
          discount_amount?: number
          expires_at?: string | null
          gateway_fee?: number
          gateway_fee_mode_snapshot?:
            | Database["public"]["Enums"]["gateway_fee_mode"]
            | null
          id?: never
          invoice_number?: string
          last_verification_at?: string | null
          next_reconciliation_at?: string | null
          normalized_email?: string | null
          paid_at?: string | null
          payment_state?: string
          product_id_snapshot?: number | null
          product_slug_snapshot?: string | null
          product_title_snapshot?: string | null
          product_type_snapshot?:
            | Database["public"]["Enums"]["product_type"]
            | null
          provider_mode?: string | null
          provider_reference?: string | null
          refunded_at?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
          verification_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_snapshot_fkey"
            columns: ["product_id_snapshot"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      page_sections: {
        Row: {
          component_type: string
          created_at: string
          draft_content: Json
          id: number
          is_visible: boolean
          page_id: number
          position: number
          published_content: Json | null
          section_key: string
          updated_at: string
        }
        Insert: {
          component_type: string
          created_at?: string
          draft_content?: Json
          id?: never
          is_visible?: boolean
          page_id: number
          position?: number
          published_content?: Json | null
          section_key: string
          updated_at?: string
        }
        Update: {
          component_type?: string
          created_at?: string
          draft_content?: Json
          id?: never
          is_visible?: boolean
          page_id?: number
          position?: number
          published_content?: Json | null
          section_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string
          created_by: string | null
          draft_content: Json
          id: number
          published_at: string | null
          published_content: Json | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          draft_content?: Json
          id?: never
          published_at?: string | null
          published_content?: Json | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          draft_content?: Json
          id?: never
          published_at?: string | null
          published_content?: Json | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      paid_entitlements: {
        Row: {
          claimed_at: string | null
          created_at: string
          id: number
          normalized_email: string
          order_id: number
          product_id: number
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string
          id?: never
          normalized_email: string
          order_id: number
          product_id: number
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          claimed_at?: string | null
          created_at?: string
          id?: never
          normalized_email?: string
          order_id?: number
          product_id?: number
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paid_entitlements_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paid_entitlements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_attempts: {
        Row: {
          callback_received_at: string | null
          created_at: string
          currency: string
          diagnostic_code: string | null
          id: string
          initiated_at: string | null
          last_verified_at: string | null
          order_id: number
          provider: string
          provider_reference: string | null
          provider_status: string | null
          provider_status_code: string | null
          provider_transaction_id: string | null
          raw_response: Json | null
          requested_amount: number
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
          verification_count: number
          verification_source: string | null
          verified_amount: number | null
          verified_at: string | null
        }
        Insert: {
          callback_received_at?: string | null
          created_at?: string
          currency?: string
          diagnostic_code?: string | null
          id?: string
          initiated_at?: string | null
          last_verified_at?: string | null
          order_id: number
          provider?: string
          provider_reference?: string | null
          provider_status?: string | null
          provider_status_code?: string | null
          provider_transaction_id?: string | null
          raw_response?: Json | null
          requested_amount: number
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
          verification_count?: number
          verification_source?: string | null
          verified_amount?: number | null
          verified_at?: string | null
        }
        Update: {
          callback_received_at?: string | null
          created_at?: string
          currency?: string
          diagnostic_code?: string | null
          id?: string
          initiated_at?: string | null
          last_verified_at?: string | null
          order_id?: number
          provider?: string
          provider_reference?: string | null
          provider_status?: string | null
          provider_status_code?: string | null
          provider_transaction_id?: string | null
          raw_response?: Json | null
          requested_amount?: number
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
          verification_count?: number
          verification_source?: string | null
          verified_amount?: number | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_attempts_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_verification_events: {
        Row: {
          amount_matches: boolean
          created_at: string
          currency_matches: boolean | null
          diagnostic_code: string | null
          id: number
          invoice_matches: boolean
          order_id: number
          payment_attempt_id: string
          provider_currency: string | null
          provider_invoice_number: string | null
          provider_reference: string | null
          provider_status: string | null
          provider_status_code: string | null
          provider_transaction_id: string | null
          reference_matches: boolean | null
          request_successful: boolean
          response_snapshot: Json
          source: string
          verified_amount: number | null
        }
        Insert: {
          amount_matches?: boolean
          created_at?: string
          currency_matches?: boolean | null
          diagnostic_code?: string | null
          id?: never
          invoice_matches?: boolean
          order_id: number
          payment_attempt_id: string
          provider_currency?: string | null
          provider_invoice_number?: string | null
          provider_reference?: string | null
          provider_status?: string | null
          provider_status_code?: string | null
          provider_transaction_id?: string | null
          reference_matches?: boolean | null
          request_successful: boolean
          response_snapshot?: Json
          source: string
          verified_amount?: number | null
        }
        Update: {
          amount_matches?: boolean
          created_at?: string
          currency_matches?: boolean | null
          diagnostic_code?: string | null
          id?: never
          invoice_matches?: boolean
          order_id?: number
          payment_attempt_id?: string
          provider_currency?: string | null
          provider_invoice_number?: string | null
          provider_reference?: string | null
          provider_status?: string | null
          provider_status_code?: string | null
          provider_transaction_id?: string | null
          reference_matches?: boolean | null
          request_successful?: boolean
          response_snapshot?: Json
          source?: string
          verified_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_verification_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_verification_events_payment_attempt_id_fkey"
            columns: ["payment_attempt_id"]
            isOneToOne: false
            referencedRelation: "payment_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          compare_at_price: number | null
          created_at: string
          currency: string
          gateway_fee_mode: Database["public"]["Enums"]["gateway_fee_mode"]
          id: number
          is_published: boolean
          metadata: Json
          price: number
          product_type: Database["public"]["Enums"]["product_type"]
          slug: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          compare_at_price?: number | null
          created_at?: string
          currency?: string
          gateway_fee_mode?: Database["public"]["Enums"]["gateway_fee_mode"]
          id?: never
          is_published?: boolean
          metadata?: Json
          price: number
          product_type: Database["public"]["Enums"]["product_type"]
          slug: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          compare_at_price?: number | null
          created_at?: string
          currency?: string
          gateway_fee_mode?: Database["public"]["Enums"]["gateway_fee_mode"]
          id?: never
          is_published?: boolean
          metadata?: Json
          price?: number
          product_type?: Database["public"]["Enums"]["product_type"]
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_path: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          occupation: string | null
          phone: string | null
          updated_at: string
          whatsapp_number: string | null
        }
        Insert: {
          avatar_path?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          occupation?: string | null
          phone?: string | null
          updated_at?: string
          whatsapp_number?: string | null
        }
        Update: {
          avatar_path?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          occupation?: string | null
          phone?: string | null
          updated_at?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          is_secret: boolean
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          is_secret?: boolean
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          is_secret?: boolean
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workshop_registrations: {
        Row: {
          attended_at: string | null
          id: number
          registered_at: string
          user_id: string
          workshop_id: number
        }
        Insert: {
          attended_at?: string | null
          id?: never
          registered_at?: string
          user_id: string
          workshop_id: number
        }
        Update: {
          attended_at?: string | null
          id?: never
          registered_at?: string
          user_id?: string
          workshop_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workshop_registrations_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_registrations_v2: {
        Row: {
          id: number
          registration_code: string
          workshop_id: number
          full_name: string
          mobile: string
          normalized_mobile: string
          email: string
          profession: string
          intent: string
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_term: string | null
          utm_audience: string | null
          referrer: string | null
          landing_page_url: string | null
          registration_status: "registered" | "confirmed" | "cancelled"
          confirmation_status: "pending" | "sent" | "failed"
          attendance_status: "unknown" | "attended" | "absent"
          lead_status: "new" | "interested" | "follow_up" | "converted"
          course_conversion_status: "not_enrolled" | "interested" | "enrolled"
          registered_at: string
          confirmed_at: string | null
          attended_at: string | null
          converted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          registration_code: string
          workshop_id: number
          full_name: string
          mobile: string
          normalized_mobile: string
          email: string
          profession: string
          intent: string
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_term?: string | null
          utm_audience?: string | null
          referrer?: string | null
          landing_page_url?: string | null
          registration_status?: "registered" | "confirmed" | "cancelled"
          confirmation_status?: "pending" | "sent" | "failed"
          attendance_status?: "unknown" | "attended" | "absent"
          lead_status?: "new" | "interested" | "follow_up" | "converted"
          course_conversion_status?: "not_enrolled" | "interested" | "enrolled"
          registered_at?: string
          confirmed_at?: string | null
          attended_at?: string | null
          converted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          registration_code?: string
          workshop_id?: number
          full_name?: string
          mobile?: string
          normalized_mobile?: string
          email?: string
          profession?: string
          intent?: string
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_term?: string | null
          utm_audience?: string | null
          referrer?: string | null
          landing_page_url?: string | null
          registration_status?: "registered" | "confirmed" | "cancelled"
          confirmation_status?: "pending" | "sent" | "failed"
          attendance_status?: "unknown" | "attended" | "absent"
          lead_status?: "new" | "interested" | "follow_up" | "converted"
          course_conversion_status?: "not_enrolled" | "interested" | "enrolled"
          registered_at?: string
          confirmed_at?: string | null
          attended_at?: string | null
          converted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_registrations_v2_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshops: {
        Row: {
          calendar_url: string | null
          capacity: number | null
          course_cta_url: string | null
          created_at: string
          description: string | null
          ends_at: string | null
          id: number
          is_published: boolean
          max_participants: number | null
          meet_url: string | null
          platform: string
          product_id: number | null
          registration_closes_at: string | null
          registration_enabled: boolean
          registration_opens_at: string | null
          related_course_id: number | null
          short_title: string | null
          slug: string
          starts_at: string | null
          status: "draft" | "registration_open" | "registration_closed" | "live" | "completed" | "cancelled"
          timezone: string
          title: string
          updated_at: string
        }
        Insert: {
          calendar_url?: string | null
          capacity?: number | null
          course_cta_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: never
          is_published?: boolean
          max_participants?: number | null
          meet_url?: string | null
          platform?: string
          product_id?: number | null
          registration_closes_at?: string | null
          registration_enabled?: boolean
          registration_opens_at?: string | null
          related_course_id?: number | null
          short_title?: string | null
          slug: string
          starts_at?: string | null
          status?: "draft" | "registration_open" | "registration_closed" | "live" | "completed" | "cancelled"
          timezone?: string
          title: string
          updated_at?: string
        }
        Update: {
          calendar_url?: string | null
          capacity?: number | null
          course_cta_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: never
          is_published?: boolean
          max_participants?: number | null
          meet_url?: string | null
          platform?: string
          product_id?: number | null
          registration_closes_at?: string | null
          registration_enabled?: boolean
          registration_opens_at?: string | null
          related_course_id?: number | null
          short_title?: string | null
          slug?: string
          starts_at?: string | null
          status?: "draft" | "registration_open" | "registration_closed" | "live" | "completed" | "cancelled"
          timezone?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshops_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workshops_related_course_id_fkey"
            columns: ["related_course_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      verify_certificates: {
        Row: {
          batch_name: string | null
          course_name: string | null
          expires_at: string | null
          grade: string | null
          instructor_name: string | null
          issued_at: string | null
          status: string | null
          student_name: string | null
          verification_code: string | null
        }
        Insert: {
          batch_name?: string | null
          course_name?: string | null
          expires_at?: string | null
          grade?: string | null
          instructor_name?: string | null
          issued_at?: string | null
          status?: string | null
          student_name?: string | null
          verification_code?: string | null
        }
        Update: {
          batch_name?: string | null
          course_name?: string | null
          expires_at?: string | null
          grade?: string | null
          instructor_name?: string | null
          issued_at?: string | null
          status?: string | null
          student_name?: string | null
          verification_code?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      claim_email_outbox: {
        Args: { p_limit?: number }
        Returns: {
          attempt_count: number
          created_at: string
          id: string
          idempotency_key: string
          last_error: string | null
          locked_at: string | null
          next_attempt_at: string
          payload: Json
          recipient_email: string
          sent_at: string | null
          status: Database["public"]["Enums"]["email_status"]
          template_key: string
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "email_outbox"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      claim_paid_course_orders: {
        Args: { p_user_id: string }
        Returns: {
          course_slug: string
          invoice_number: string
          newly_claimed: boolean
          order_id: number
        }[]
      }
      create_guest_course_order: {
        Args: {
          p_authenticated_user_id: string
          p_checkout_request_id: string
          p_coupon_code: string
          p_customer: Json
          p_product_slug: string
          p_provider_mode: string
        }
        Returns: {
          course_slug: string
          currency: string
          gateway_fee_mode: Database["public"]["Enums"]["gateway_fee_mode"]
          invoice_number: string
          order_id: number
          payment_attempt_id: string
          provider_reference: string
          total_amount: number
        }[]
      }
      create_order: {
        Args: {
          p_coupon_code?: string
          p_customer: Json
          p_product_slug: string
        }
        Returns: {
          currency: string
          invoice_number: string
          order_id: number
          total_amount: number
        }[]
      }
      fulfill_verified_order: {
        Args: {
          p_currency: string
          p_invoice_number: string
          p_provider_transaction_id: string
          p_raw_response: Json
          p_verified_amount: number
        }
        Returns: boolean
      }
      ingest_analytics_event: {
        Args: {
          p_event_id: string
          p_event_name: string
          p_occurred_at: string
          p_path: string
          p_properties: Json
          p_session_id: string
        }
        Returns: boolean
      }
      publish_page: {
        Args: { p_request_id?: string; p_slug: string }
        Returns: string
      }
      quote_checkout: {
        Args: { p_coupon_code?: string; p_product_slug: string }
        Returns: {
          currency: string
          discount_amount: number
          gateway_fee: number
          subtotal: number
          total_amount: number
        }[]
      }
      quote_guest_course_checkout: {
        Args: {
          p_authenticated_user_id?: string
          p_checkout_email?: string
          p_coupon_code?: string
          p_product_slug: string
        }
        Returns: {
          currency: string
          discount_amount: number
          gateway_fee: number
          gateway_fee_mode: Database["public"]["Enums"]["gateway_fee_mode"]
          subtotal: number
          total_amount: number
        }[]
      }
      record_paystation_verification: {
        Args: {
          p_invoice_number: string
          p_provider_currency: string
          p_provider_invoice_number: string
          p_provider_reference: string
          p_provider_status: string
          p_provider_status_code: string
          p_provider_transaction_id: string
          p_request_successful: boolean
          p_response_snapshot: Json
          p_source: string
          p_verified_amount: number
        }
        Returns: {
          course_slug: string
          diagnostic_code: string
          entitled_user_id: string
          idempotent: boolean
          payment_state: string
        }[]
      }
      rollback_page_revision: {
        Args: { p_request_id?: string; p_revision_id: string }
        Returns: undefined
      }
      save_page_draft: {
        Args: { p_content: Json; p_slug: string }
        Returns: number
      }
      verify_certificate_public: {
        Args: { p_code: string }
        Returns: {
          batch_name: string
          course_name: string
          expires_at: string
          grade: string
          instructor_name: string
          issued_at: string
          status: string
          student_name: string
          verification_code: string
        }[]
      }
    }
    Enums: {
      app_role: "student" | "admin" | "owner"
      content_status: "draft" | "published" | "archived"
      email_status: "pending" | "processing" | "sent" | "failed" | "cancelled"
      enrollment_status:
        | "pending"
        | "active"
        | "expired"
        | "cancelled"
        | "refunded"
      gateway_fee_mode: "merchant" | "customer"
      order_status:
        | "pending"
        | "processing"
        | "paid"
        | "failed"
        | "cancelled"
        | "refunded"
      product_type: "course" | "ebook" | "workshop"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "admin", "owner"],
      content_status: ["draft", "published", "archived"],
      email_status: ["pending", "processing", "sent", "failed", "cancelled"],
      enrollment_status: [
        "pending",
        "active",
        "expired",
        "cancelled",
        "refunded",
      ],
      gateway_fee_mode: ["merchant", "customer"],
      order_status: [
        "pending",
        "processing",
        "paid",
        "failed",
        "cancelled",
        "refunded",
      ],
      product_type: ["course", "ebook", "workshop"],
    },
  },
} as const
