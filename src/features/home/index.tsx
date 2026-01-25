import { Card, CardContent } from '@/components/ui/card'
import { HeroSection } from './components/hero-section'
import { FeatureSection } from './components/feature-section'

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection />
            {/* Features Section */}
            <FeatureSection />

            {/* Team Section */}
            <section id="team" className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-balance">Gặp gỡ Nhân tài & Mentor Chuyên nghiệp</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Sarah Vance",
                                role: "Kỹ sư Phần mềm Trưởng nhóm",
                                image: "https://tse1.mm.bing.net/th/id/OIP.QxF8jo3HQJhIHh--HjeCHAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
                            },
                            {
                                name: "Marcus Chen",
                                role: "Quản lý Dự án Cấp cao",
                                image: "https://mshc.imgix.net/images/general/People/Marcus-Chen.jpg?auto=format",
                            },
                            {
                                name: "Sophia Rodriguez",
                                role: "Trưởng nhóm Thiết kế UI/UX",
                                image: "https://tse1.mm.bing.net/th/id/OIP.jtKpEFLPC85l3Y1De-5gTwHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
                            },
                            {
                                name: "David Kim",
                                role: "Chuyên gia DevOps",
                                image: "https://tse1.mm.bing.net/th/id/OIP.zyaK-O1oXn5q_JPXdej7CAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
                            },
                        ].map((member, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                                        <img
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-primary">{member.name}</h3>
                                        <p className="text-muted-foreground text-sm">{member.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
