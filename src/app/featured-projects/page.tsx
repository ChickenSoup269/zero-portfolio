"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Youtube, ArrowRight } from "lucide-react"

// 1. CẬP NHẬT DỮ LIỆU: Thêm 'imageUrl'
const projects = [
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "Nền tảng bán hàng trực tuyến với Next.js.",
    videoId: "3mcsG_p_j7s",
    // Link ảnh mẫu (bạn thay bằng link thật của bạn)
    imageUrl:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
  },
  {
    id: "task-management",
    title: "Task Management",
    description: "Ứng dụng quản lý công việc cho nhóm.",
    videoId: "LXb3EKWsInQ",
    // Link ảnh mẫu
    imageUrl:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
  },
]

export default function FeaturedProjects() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Featured Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              {/* 2. CSS CHO ẢNH ĐẠI DIỆN */}
              <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4 border bg-muted">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Đây là mô tả ngắn gọn về công nghệ và tính năng chính của dự
                án...
              </p>
            </CardContent>

            <CardFooter>
              <div className="w-full grid grid-cols-2 gap-3">
                {/* 1. BUTTON VIEW DEMO (POPUP) */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Youtube className="mr-2 h-4 w-4 text-red-600" />
                      Demo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
                    <DialogHeader className="p-4 bg-muted/20">
                      <DialogTitle>{project.title} - Demo</DialogTitle>
                    </DialogHeader>
                    {/* Iframe Youtube */}
                    <div className="aspect-video w-full">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* 2. BUTTON VIEW DETAIL (LINK) */}
                <Button asChild className="w-full">
                  <Link href={`/projects/${project.id}`}>
                    Detail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
