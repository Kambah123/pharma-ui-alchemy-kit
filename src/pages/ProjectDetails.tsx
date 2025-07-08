
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  ArrowLeft, 
  Download, 
  Edit, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Type,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

// Mock project data
const mockProject = {
  id: 1,
  name: "CardioHealth Pro",
  molecule: "Atorvastatin",
  area: "Cardiovascular",
  status: "completed",
  createdAt: "2024-01-10",
  differentiators: ["Fast-acting", "Once daily", "Fewer side effects"],
  insights: {
    marketPosition: "Premium cardiovascular medication targeting health-conscious patients",
    targetAudience: "Adults 40-65 with elevated cholesterol levels",
    keyMessages: [
      "Proven cardiovascular protection",
      "Convenient once-daily dosing",
      "Trusted by healthcare professionals"
    ],
    competitiveAdvantage: "Superior bioavailability with reduced side effect profile"
  },
  brandNames: [
    { name: "CardioShield Pro", score: 9.2, reasoning: "Strong protection imagery, professional tone" },
    { name: "HeartGuard Elite", score: 8.8, reasoning: "Clear benefit communication, premium positioning" },
    { name: "VitalFlow", score: 8.5, reasoning: "Emphasizes healthy circulation, memorable" },
    { name: "CardioMax", score: 8.1, reasoning: "Simple, direct, easy to remember" }
  ],
  slogans: [
    { text: "Protecting Hearts, Empowering Lives", score: 9.0 },
    { text: "Your Daily Shield Against Cardiovascular Risk", score: 8.7 },
    { text: "Advanced Care for a Healthier Heart", score: 8.4 },
    { text: "One Pill, Complete Protection", score: 8.2 }
  ],
  logos: [
    { id: 1, concept: "Heart with shield symbol", style: "Modern, medical" },
    { id: 2, concept: "Flowing lines forming heart", style: "Dynamic, wellness" },
    { id: 3, concept: "Geometric heart design", style: "Clean, professional" }
  ],
  leaflet: {
    productName: "CardioHealth Pro",
    activeIngredient: "Atorvastatin 20mg",
    indication: "Treatment of hypercholesterolemia and prevention of cardiovascular events",
    dosage: "One tablet daily, preferably in the evening",
    contraindications: ["Known hypersensitivity", "Active liver disease", "Pregnancy"],
    sideEffects: ["Muscle pain", "Headache", "Digestive issues"],
    warnings: "Regular monitoring of liver function recommended"
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}

export default function ProjectDetails() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("insights")
  const { toast } = useToast()

  const handleRegenerate = async (section: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: "Content Regenerated",
        description: `New ${section} have been generated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Downloaded",
      description: "Product leaflet has been downloaded successfully.",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{mockProject.name}</h1>
            <p className="text-muted-foreground">
              {mockProject.molecule} • {mockProject.area}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className="bg-green-100 text-green-800 border-green-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        </div>
      </div>

      {/* Project Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>
                Created on {new Date(mockProject.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Key Differentiators</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {mockProject.differentiators.map((diff, index) => (
                  <Badge key={index} variant="secondary">{diff}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="brand-names" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Brand Names
          </TabsTrigger>
          <TabsTrigger value="slogans" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Slogans
          </TabsTrigger>
          <TabsTrigger value="logos" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Logos
          </TabsTrigger>
          <TabsTrigger value="leaflet" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Leaflet
          </TabsTrigger>
        </TabsList>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Strategic Insights</h2>
            <Button variant="outline" onClick={() => handleRegenerate("insights")} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Position</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockProject.insights.marketPosition}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockProject.insights.targetAudience}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockProject.insights.keyMessages.map((message, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">{message}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Advantage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockProject.insights.competitiveAdvantage}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Brand Names Tab */}
        <TabsContent value="brand-names" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Generated Brand Names</h2>
            <Button variant="outline" onClick={() => handleRegenerate("brand names")} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Generate More
            </Button>
          </div>

          <div className="grid gap-4">
            {mockProject.brandNames.map((brand, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold">{brand.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Score: {brand.score}/10
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-2">{brand.reasoning}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(brand.name)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Slogans Tab */}
        <TabsContent value="slogans" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Brand Slogans</h2>
            <Button variant="outline" onClick={() => handleRegenerate("slogans")} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Generate More
            </Button>
          </div>

          <div className="grid gap-4">
            {mockProject.slogans.map((slogan, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium">"{slogan.text}"</h3>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Score: {slogan.score}/10
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(slogan.text)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Logos Tab */}
        <TabsContent value="logos" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Logo Concepts</h2>
            <Button variant="outline" onClick={() => handleRegenerate("logos")} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Generate More
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProject.logos.map((logo) => (
              <Card key={logo.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">{logo.concept}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{logo.style}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Leaflet Tab */}
        <TabsContent value="leaflet" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Product Leaflet</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleRegenerate("leaflet")} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Information Leaflet</CardTitle>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Compliance Verified</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Product Name</h4>
                    <p className="font-medium">{mockProject.leaflet.productName}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Active Ingredient</h4>
                    <p>{mockProject.leaflet.activeIngredient}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Indication</h4>
                    <p>{mockProject.leaflet.indication}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Dosage</h4>
                    <p>{mockProject.leaflet.dosage}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Contraindications</h4>
                    <ul className="space-y-1">
                      {mockProject.leaflet.contraindications.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-amber-500" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Side Effects</h4>
                    <ul className="space-y-1">
                      {mockProject.leaflet.sideEffects.map((effect, index) => (
                        <li key={index} className="text-sm">• {effect}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Warnings</h4>
                    <p className="text-sm">{mockProject.leaflet.warnings}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
