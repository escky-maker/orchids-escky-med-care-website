import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          phone_number: string | null;
          date_of_birth: string | null;
          emergency_contact: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          phone_number?: string | null;
          date_of_birth?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          phone_number?: string | null;
          date_of_birth?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      clinic_visits: {
        Row: {
          id: string;
          user_id: string;
          visit_date: string;
          visit_type: string;
          notes: string | null;
          next_visit_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          visit_date: string;
          visit_type: string;
          notes?: string | null;
          next_visit_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          visit_date?: string;
          visit_type?: string;
          notes?: string | null;
          next_visit_date?: string | null;
          created_at?: string;
        };
      };
      test_results: {
        Row: {
          id: string;
          user_id: string;
          visit_id: string | null;
          test_name: string;
          test_date: string;
          result_value: string;
          normal_range: string | null;
          interpretation: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          visit_id?: string | null;
          test_name: string;
          test_date: string;
          result_value: string;
          normal_range?: string | null;
          interpretation?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          visit_id?: string | null;
          test_name?: string;
          test_date?: string;
          result_value?: string;
          normal_range?: string | null;
          interpretation?: string | null;
          created_at?: string;
        };
      };
      child_milestones: {
        Row: {
          id: string;
          user_id: string;
          child_name: string;
          milestone_type: string;
          milestone_date: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          child_name: string;
          milestone_type: string;
          milestone_date: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          child_name?: string;
          milestone_type?: string;
          milestone_date?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      vaccinations: {
        Row: {
          id: string;
          user_id: string;
          child_name: string;
          vaccine_name: string;
          vaccination_date: string;
          next_dose_date: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          child_name: string;
          vaccine_name: string;
          vaccination_date: string;
          next_dose_date?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          child_name?: string;
          vaccine_name?: string;
          vaccination_date?: string;
          next_dose_date?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
