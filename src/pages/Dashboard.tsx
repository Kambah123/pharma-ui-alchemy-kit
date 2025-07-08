
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, MoreVertical, Calendar, Folder, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "CardioHealth Pro",
    molecule: "Atorvastatin",
    area: "Cardiovascular",
    status: "completed",
    lastUpdated: "2024-01-15",
    thumbnail: null,
    tags: ["Heart Health", "Cholesterol"]
  },
  {
    id: 2,
    name: "DiabetCare Plus",
    molecule: "Metformin",
    area: "Endocrinology",
    status: "in-progress",
    lastUpdated: "2024-01-10",
    thumbnail: null,
    tags: ["Diabetes", "Type 2"]
  },
  {
    id: 3,
    name: "NeuroShield",
    molecule: "Donepezil",
    area: "Neurology",
    status: "draft",
    lastUpdated: "2024-01-08",
    thumbnail: null,
    tags: ["Alzheimer's", "Memory"]
  },
  {
    id: 4,
    name: "RespiClear",
    molecule: "Salbutamol",
    area: "Respiratory",
    status: "completed",
    lastUpdated: "2024-01-05",
    thumbnail: null,
    tags: ["Asthma", "COPD"]
  }
]

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200"
}

function ProjectCard({ project }: { project: typeof mockProjects[0] }) {
  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {project.molecule} • {project.area}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Updated {new Date(project.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <Badge 
            variant="outline" 
            className={`text-xs ${statusColors[project.status as keyof typeof statusColors]}`}
          >
            {project.status.replace('-', ' ').toUpperCase()}
          </Badge>
          
          <Link to={`/project/${project.id}`}>
            <Button variant="outline" size="sm">
              View Project
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      
      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back!</h1>
        <p className="text-lg text-muted-foreground">
          Manage your pharmaceutical brand projects and generate AI-powered insights.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">66% completion rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Active this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Recent Projects</h2>
          <p className="text-muted-foreground">Your latest pharmaceutical brand projects</p>
        </div>
        
        <Link to="/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Project
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          // Show skeleton loading
          Array.from({ length: 8 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))
        ) : (
          // Show actual projects
          mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>

      {/* Empty State */}
      {!isLoading && mockProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <Folder className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No projects yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first pharmaceutical brand project to get started.
            </p>
            <Link to="/create">
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
