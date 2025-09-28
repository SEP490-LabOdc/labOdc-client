import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Heart, MapPin, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import type { Company } from '..';

export function CardCompany({ company, onToggleFollow }: { company: Company; onToggleFollow: (id: string) => void }) {
    return (
        <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden p-0">
            <div className="relative w-full h-48">
                <img
                    src={company.coverUrl || "/placeholder.svg"}
                    alt={`${company.name} banner`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-6 left-4">
                    <Link to='/' className="h-12 w-12 rounded-md overflow-hidden border border-gray-200 bg-white shadow-md flex items-center justify-center">
                        <img
                            src={company.logoUrl || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            className="h-10 w-10 object-contain"
                        />
                    </Link>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleFollow(company.id)}
                    className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full"
                >
                    <Heart className={`h-5 w-5 ${company.isFollowed ? "fill-red-600 text-red-600" : "text-gray-600"}`} />
                </Button>
            </div>

            <CardContent className="px-4">
                <div className="flex items-center justify-between mb-2">
                    <Link to='/' className="font-semibold text-lg truncate hover:underline">{company.name}</Link>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{company.rating}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{company.location}</span>
                    <Badge variant="secondary" className="ml-auto">{company.industry}</Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {company.bio}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <div className="text-sm font-medium">{company.openProjects}</div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <Users className="h-4 w-4 text-primary" />
                        <div className="text-sm font-medium">{company.collaboratedTalents}</div>
                        <div className="text-xs text-muted-foreground">Talents</div>
                    </div>
                </div>

                {/* Actions */}
                {/* <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1">
                        Xem chi tiết
                    </Button>
                </div> */}
            </CardContent>
        </Card>
    )
}

