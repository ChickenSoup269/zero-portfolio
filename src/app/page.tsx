import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section - Đẹp nhất với gradient và centered content */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="Your Photo" />
            <AvatarFallback>YOU</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            I&apos;m a passionate developer building amazing things with Next.js
            and more.
          </p>
          <Button size="lg" asChild>
            <Link href="/featured-projects">View Projects</Link>
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          I&apos;m a full-stack developer with 5+ years of experience in web
          technologies. Passionate about clean code, user experience, and
          innovative solutions.
        </p>
      </section>

      <Separator />

      {/* Skills Section - Sử dụng badges cho đẹp */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">SQL</Badge>
          <Badge variant="secondary">UI/UX Design</Badge>
        </div>
      </section>

      <Separator />

      {/* Featured Projects Teaser - Cards grid responsive */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Projects Preview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project A</CardTitle>
              <CardDescription>Awesome app built with Next.js</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Short description here.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Learn More</Button>
            </CardFooter>
          </Card>
          {/* Thêm card tương tự cho Project B, C */}
        </div>
        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/featured-projects">See All Featured</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
