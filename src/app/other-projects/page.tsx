import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OtherProjects() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Other Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Y</CardTitle>
            <CardDescription>Description of other project Y.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Details: Side projects, experiments, etc.</p>
          </CardContent>
          <CardFooter>
            <Button>View Source</Button>
          </CardFooter>
        </Card>
        {/* Thêm các card khác cho dự án khác */}
      </div>
    </div>
  )
}
