import { useState } from "react"
import { Search, Filter, Clock, DollarSign, Users, Star, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { projects } from "../data/project-data"

const teams = [
    {
        id: 1,
        name: "Alpha Development Team",
        mentor: "Dr. Sarah Johnson",
        skillsMatch: 95,
        completionTime: "2.5 months",
        rating: 4.9,
        previousProjects: 12,
    },
    {
        id: 2,
        name: "Beta Innovation Lab",
        mentor: "Prof. Michael Chen",
        skillsMatch: 88,
        completionTime: "3 months",
        rating: 4.7,
        previousProjects: 8,
    },
    {
        id: 3,
        name: "Gamma Tech Solutions",
        mentor: "Dr. Emily Rodriguez",
        skillsMatch: 92,
        completionTime: "2.8 months",
        rating: 4.8,
        previousProjects: 15,
    },
]

export default function ProjectListPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState("all")
    const [selectedDuration, setSelectedDuration] = useState("all")
    const [viewMode, setViewMode] = useState("grid")

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesType = selectedType === "all" || project.type === selectedType
        return matchesSearch && matchesType
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero Section */}
            <section className="bg-[#264653] text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6 text-balance">Find the Right Team for Your Project</h1>
                    <p className="text-xl mb-8 text-slate-200 max-w-2xl mx-auto text-pretty">
                        Post projects, receive proposals, and get results faster with Lab-based ODC teams.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-[#e9c46a] text-[#264653] hover:bg-[#f4a261] font-semibold">
                            Post a Project
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-[#264653] bg-transparent"
                        >
                            Browse Projects
                        </Button>
                    </div>
                </div>
            </section>

            {/* Search & Filters */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search projects by keywords, skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-4 items-center">
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Project Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="Web">Web</SelectItem>
                                    <SelectItem value="Mobile">Mobile</SelectItem>
                                    <SelectItem value="AI">AI</SelectItem>
                                    <SelectItem value="Cloud">Cloud</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Durations</SelectItem>
                                    <SelectItem value="short">Short-term</SelectItem>
                                    <SelectItem value="long">Long-term</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                More Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Listings */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-[#264653]">Available Projects</h2>
                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className={viewMode === "grid" ? "bg-[#2a9d8f] hover:bg-[#264653]" : ""}
                            >
                                Grid
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className={viewMode === "list" ? "bg-[#2a9d8f] hover:bg-[#264653]" : ""}
                            >
                                List
                            </Button>
                        </div>
                    </div>

                    <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                        {filteredProjects.map((project) => (
                            <Card key={project.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-[#2a9d8f]">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="secondary" className="bg-[#e9c46a] text-[#264653]">
                                            {project.type}
                                        </Badge>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="h-4 w-4 mr-1" />
                                            {project.proposals} proposals
                                        </div>
                                    </div>
                                    <CardTitle className="text-[#264653] text-lg">{project.title}</CardTitle>
                                    <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.skills.slice(0, 3).map((skill) => (
                                                <Badge key={skill} variant="outline" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {project.skills.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{project.skills.length - 3} more
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {project.duration}
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="h-4 w-4 mr-1" />
                                                {project.budget}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                                {project.rating}
                                            </div>
                                            <p className="text-sm font-medium text-[#264653]">{project.enterprise}</p>
                                        </div>

                                        <div className="flex gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                                        View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-[#264653]">{project.title}</DialogTitle>
                                                        <DialogDescription>{project.enterprise}</DialogDescription>
                                                    </DialogHeader>

                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h4 className="font-semibold mb-2 text-[#264653]">Project Description</h4>
                                                                <p className="text-sm text-gray-600">{project.description}</p>
                                                            </div>

                                                            <div>
                                                                <h4 className="font-semibold mb-2 text-[#264653]">Required Skills</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {project.skills.map((skill) => (
                                                                        <Badge key={skill} className="bg-[#2a9d8f] text-white">
                                                                            {skill}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <h4 className="font-semibold mb-1 text-[#264653]">Duration</h4>
                                                                    <p className="text-sm text-gray-600">{project.duration}</p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold mb-1 text-[#264653]">Budget</h4>
                                                                    <p className="text-sm text-gray-600">{project.budget}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="font-semibold text-[#264653]">Submit Your Proposal</h4>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <Label htmlFor="team-name">Team Name</Label>
                                                                    <Input id="team-name" placeholder="Enter your team name" />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="proposal">Proposal Details</Label>
                                                                    <Textarea
                                                                        id="proposal"
                                                                        placeholder="Describe your approach, timeline, and why you're the right team for this project..."
                                                                        rows={4}
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div>
                                                                        <Label htmlFor="timeline">Estimated Timeline</Label>
                                                                        <Input id="timeline" placeholder="e.g., 3 months" />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="budget">Your Quote</Label>
                                                                        <Input id="budget" placeholder="e.g., $20,000" />
                                                                    </div>
                                                                </div>
                                                                <Button className="w-full bg-[#2a9d8f] hover:bg-[#264653]">
                                                                    <Send className="h-4 w-4 mr-2" />
                                                                    Submit Proposal
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Button size="sm" className="bg-[#2a9d8f] hover:bg-[#264653] flex-1">
                                                Propose Solution
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Showcase Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#264653] mb-4">Top Performing ODC Teams</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Connect with our highest-rated lab-based teams ready to tackle your next project
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <Card key={team.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-[#264653] text-lg">{team.name}</CardTitle>
                                            <CardDescription>Mentor: {team.mentor}</CardDescription>
                                        </div>
                                        <Badge className="bg-[#e9c46a] text-[#264653]">{team.skillsMatch}% match</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Completion Time:</span>
                                            <span className="font-medium">{team.completionTime}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Previous Projects:</span>
                                            <span className="font-medium">{team.previousProjects}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Rating:</span>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">{team.rating}</span>
                                            </div>
                                        </div>
                                        <Button className="w-full mt-4 bg-[#f4a261] hover:bg-[#e76f51] text-white">
                                            View Team Profile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enterprise Benefits Banner */}
            <section className="py-16 bg-[#264653] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Why Choose Lab-based ODC Teams?</h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="space-y-3">
                            <div className="w-16 h-16 bg-[#2a9d8f] rounded-full flex items-center justify-center mx-auto">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold">Trusted Expertise</h3>
                            <p className="text-slate-200">Work with vetted teams from top institutions with proven track records</p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-16 h-16 bg-[#e9c46a] rounded-full flex items-center justify-center mx-auto">
                                <FileText className="h-8 w-8 text-[#264653]" />
                            </div>
                            <h3 className="text-xl font-semibold">Full Transparency</h3>
                            <p className="text-slate-200">Clear proposals, milestone tracking, and regular progress updates</p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-16 h-16 bg-[#f4a261] rounded-full flex items-center justify-center mx-auto">
                                <Star className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold">Quality Guarantee</h3>
                            <p className="text-slate-200">Rigorous quality standards with mentor oversight and support</p>
                        </div>
                    </div>
                    <Button size="lg" className="bg-[#e76f51] hover:bg-[#f4a261] text-white font-semibold">
                        Start Your Project Now
                    </Button>
                </div>
            </section>
        </div>
    )
}
