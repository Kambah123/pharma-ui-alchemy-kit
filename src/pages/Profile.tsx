
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Mail, Phone, Building, Award, Clock } from "lucide-react"

const Profile = () => {
  const achievements = [
    { title: "Project Pioneer", description: "Created your first project", date: "Dec 2024" },
    { title: "Brand Master", description: "Generated 50+ brand names", date: "Dec 2024" },
    { title: "Compliance Expert", description: "100% compliance rate for 3 months", date: "Nov 2024" },
    { title: "Creative Genius", description: "Generated 100+ creative assets", date: "Oct 2024" }
  ]

  const recentProjects = [
    { name: "GlucoGuard Campaign", status: "Active", lastModified: "2 hours ago" },
    { name: "CardioShield Launch", status: "Draft", lastModified: "1 day ago" },
    { name: "NeuroBoost Plus", status: "Completed", lastModified: "3 days ago" },
    { name: "PainRelief Pro", status: "Active", lastModified: "1 week ago" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and view your activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Senior Brand Manager</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>john@pharma.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>Pharma Innovations Inc.</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>New York, NY</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined December 2024</span>
            </div>
            
            <Button className="w-full mt-4">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Activity & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <p className="text-xs text-muted-foreground">Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">156</div>
                <p className="text-xs text-muted-foreground">Assets</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">98.5%</div>
                <p className="text-xs text-muted-foreground">Compliance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">45</div>
                <p className="text-xs text-muted-foreground">Days Active</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Your milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <Badge variant="secondary" className="text-xs mt-1">{achievement.date}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Projects
              </CardTitle>
              <CardDescription>Your latest project activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{project.name}</h4>
                      <p className="text-xs text-muted-foreground">Modified {project.lastModified}</p>
                    </div>
                    <Badge 
                      variant={project.status === 'Active' ? 'default' : project.status === 'Completed' ? 'secondary' : 'outline'}
                    >
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
