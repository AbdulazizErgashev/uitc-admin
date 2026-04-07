import { z } from "zod";

export const PortfolioCategory = {
  WEB: "web",
  MOBILE: "mobile",
  DESKTOP: "app",
  THREE_D_MODELING: "three_d_modeling",
  THREE_D_ANIMATION: "three_d_animation",
};

// Auth schemas
export const AdminRegisterSchema = z
  .object({
    full_name: z.string().min(1, "Full name is required"),
    phone: z.string().min(1, "Phone is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const AdminLoginSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(1, "Password is required"),
});

export const AdminUpdateSchema = z
  .object({
    phone: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    confirm_password: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

// User schema (admin only)
export const UserSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Company schema
export const CompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  logo: z.any().optional(), // file input
});

// Course schema
export const CourseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  duration: z.string().optional(),
});

// Portfolio schema
export const PortfolioSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(Object.values(PortfolioCategory), {
    errorMap: () => ({ message: "Invalid category selected" }),
  }),
  platform: z.string().optional(),
  url: z.string().url("Invalid URL").optional(),
  media_url: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Team member schema
export const TeamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().optional(),
  long_bio: z.string().optional(),
  image: z.string().optional(),
  linkedin: z.string().url("Invalid URL").optional(),
  twitter: z.string().url("Invalid URL").optional(),
  github: z.string().url("Invalid URL").optional(),
  email: z.string().email("Invalid email").optional(),
  expertise: z.string().optional(),
  // expertise: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  etag: z.string().optional(),
});

// Testimonial schema
export const TestimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  course_id: z.string().uuid("Invalid UUID").optional(),
  company_id: z.string().uuid("Invalid UUID").optional(),
  quote: z.string().min(1, "Quote is required"),
  long_quote: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  video_url: z.string().url("Invalid URL").optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

// Comment schema
export const CommentSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required")
    .max(500, "Text must be less than 500 characters"),
});

// ID param schema
export const IdParamSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
});
