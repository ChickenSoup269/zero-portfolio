/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

// 1. Dữ liệu giả lập (DATABASE)
const projectsData: Record<string, any> = {
  "e-commerce-platform": {
    title: "E-Commerce Platform",
    description: "Nền tảng bán hàng trực tuyến với Next.js.",
    imageUrl:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    techStack: ["Next.js", "Prisma", "Stripe", "Tailwind"],
    content:
      "Dự án này giúp người dùng mua sắm dễ dàng, tích hợp thanh toán Stripe an toàn...",
    features: ["Giỏ hàng Realtime", "Thanh toán Online", "Quản lý đơn hàng"],
  },
  "task-management": {
    title: "Task Management",
    description: "Ứng dụng quản lý công việc cho nhóm.",
    imageUrl:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
    techStack: ["React", "Firebase", "Redux"],
    content:
      "Hệ thống Kanban board giúp đội nhóm theo dõi tiến độ công việc...",
    features: ["Kéo thả Task", "Chat nội bộ", "Phân quyền User"],
  },
}

// 2. Định nghĩa kiểu dữ liệu cho Params (Next.js 15: params là Promise)
interface PageProps {
  params: Promise<{ slug: string }>
}

// 3. Component chính (Phải có async)
export default async function ProjectDetailPage({ params }: PageProps) {
  // BƯỚC QUAN TRỌNG: Phải await params trước khi dùng
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // Lấy dữ liệu
  const project = projectsData[slug]

  // Nếu không tìm thấy project -> Chuyển hướng 404
  if (!project) {
    return notFound()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Nút quay lại */}
      <Button
        variant="ghost"
        asChild
        className="mb-8 pl-0 hover:pl-2 transition-all"
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </Button>

      {/* Header */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-xl overflow-hidden border shadow-sm aspect-video bg-muted">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-8" />

      {/* Nội dung chi tiết */}
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="leading-relaxed text-muted-foreground text-lg">
            {project.content}
          </p>

          <h2 className="text-2xl font-bold pt-4">Key Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feature: string, idx: number) => (
              <li
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột bên phải */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold mb-4 text-lg">Project Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Year</span>
                <span className="font-medium">2024</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Client</span>
                <span className="font-medium">Personal Project</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">Fullstack Dev</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
