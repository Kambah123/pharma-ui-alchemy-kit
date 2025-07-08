
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, X, Lightbulb, Target, Pill } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

interface FormData {
  projectName: string
  molecule: string
  therapeuticArea: string
  differentiators: string[]
  additionalInfo: string
}

interface FormErrors {
  projectName?: string
  molecule?: string
  therapeuticArea?: string
  differentiators?: string
}

const therapeuticAreas = [
  "Cardiovascular",
  "Oncology", 
  "Neurology",
  "Endocrinology",
  "Respiratory",
  "Gastroenterology",
  "Immunology",
  "Infectious Diseases",
  "Dermatology",
  "Ophthalmology"
]

export default function CreateProject() {
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    molecule: "",
    therapeuticArea: "",
    differentiators: [],
    additionalInfo: ""
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [newDifferentiator, setNewDifferentiator] = useState("")
  
  const { toast } = useToast()
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required"
    }
    
    if (!formData.molecule.trim()) {
      newErrors.molecule = "Molecule name is required"
    }
    
    if (!formData.therapeuticArea) {
      newErrors.therapeuticArea = "Therapeutic area is required"
    }
    
    if (formData.differentiators.length === 0) {
      newErrors.differentiators = "At least one differentiator is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addDifferentiator = () => {
    if (newDifferentiator.trim() && !formData.differentiators.includes(newDifferentiator.trim())) {
      setFormData(prev => ({
        ...prev,
        differentiators: [...prev.differentiators, newDifferentiator.trim()]
      }))
      setNewDifferentiator("")
      // Clear differentiators error if it exists
      if (errors.differentiators) {
        setErrors(prev => ({ ...prev, differentiators: undefined }))
      }
    }
  }

  const removeDifferentiator = (index: number) => {
    setFormData(prev => ({
      ...prev,
      differentiators: prev.differentiators.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Project Created Successfully!",
        description: "AI insights are being generated for your pharmaceutical brand.",
      })
      
      // Navigate to the project details page
      navigate("/project/new")
      
    } catch (error) {
      toast({
        title: "Error Creating Project",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Project</h1>
        <p className="text-lg text-muted-foreground">
          Start building your pharmaceutical brand with AI-powered insights and creative assets.
        </p>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Project Details
          </CardTitle>
          <CardDescription>
            Provide information about your pharmaceutical project to generate tailored brand insights.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-sm font-medium">
                Project Name *
              </Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                placeholder="e.g., CardioHealth Pro, DiabetCare Plus"
                className={errors.projectName ? "border-destructive" : ""}
              />
              {errors.projectName && (
                <p className="text-sm text-destructive">{errors.projectName}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Choose a memorable name that reflects your brand's purpose
              </p>
            </div>

            {/* Molecule */}
            <div className="space-y-2">
              <Label htmlFor="molecule" className="text-sm font-medium flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Active Molecule *
              </Label>
              <Input
                id="molecule"
                value={formData.molecule}
                onChange={(e) => setFormData(prev => ({ ...prev, molecule: e.target.value }))}
                placeholder="e.g., Atorvastatin, Metformin, Lisinopril"
                className={errors.molecule ? "border-destructive" : ""}
              />
              {errors.molecule && (
                <p className="text-sm text-destructive">{errors.molecule}</p>
              )}
              <p className="text-xs text-muted-foreground">
                The primary active pharmaceutical ingredient
              </p>
            </div>

            {/* Therapeutic Area */}
            <div className="space-y-2">
              <Label htmlFor="therapeuticArea" className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Therapeutic Area *
              </Label>
              <select
                id="therapeuticArea"
                value={formData.therapeuticArea}
                onChange={(e) => setFormData(prev => ({ ...prev, therapeuticArea: e.target.value }))}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.therapeuticArea ? "border-destructive" : ""
                }`}
              >
                <option value="">Select therapeutic area</option>
                {therapeuticAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.therapeuticArea && (
                <p className="text-sm text-destructive">{errors.therapeuticArea}</p>
              )}
              <p className="text-xs text-muted-foreground">
                The medical field your drug targets
              </p>
            </div>

            {/* Differentiators */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Key Differentiators *
              </Label>
              
              <div className="flex gap-2">
                <Input
                  value={newDifferentiator}
                  onChange={(e) => setNewDifferentiator(e.target.value)}
                  placeholder="e.g., Fast-acting, Once daily dosing"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDifferentiator())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addDifferentiator}
                  disabled={!newDifferentiator.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.differentiators.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.differentiators.map((diff, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {diff}
                      <button
                        type="button"
                        onClick={() => removeDifferentiator(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              
              {errors.differentiators && (
                <p className="text-sm text-destructive">{errors.differentiators}</p>
              )}
              <p className="text-xs text-muted-foreground">
                What makes your drug unique? Add key benefits and advantages
              </p>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-sm font-medium">
                Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                placeholder="Any additional context, target demographics, or specific requirements..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Optional: Provide any additional context to help generate better insights
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Project & Generating Insights...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Create Project & Generate Insights
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Our AI will analyze your inputs to generate:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Strategic brand insights and positioning</li>
            <li>• Creative brand names and slogans</li>
            <li>• Professional logo concepts</li>
            <li>• Compliant product leaflet drafts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
