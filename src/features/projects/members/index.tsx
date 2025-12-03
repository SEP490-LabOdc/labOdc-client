import { useGetProjectsParticipants } from '@/hooks/api/projects/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Loader2 } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import { getAvatarUrl } from '@/lib/utils.ts'

interface ProjectMember {
  id: string;
  name: string;
  roleName: string;
  avatar: string;
  leader: boolean;
}

export default function ProjectMembers() {
  const { projectId } = useParams({ strict: false  });
  const { data, isLoading, error } = useGetProjectsParticipants(projectId as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load project members
      </div>
    );
  }

  const members: ProjectMember[] = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Members ({members.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    <img src={getAvatarUrl(member.name)} alt={member.name} />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{member.name}</p>
                    {member.leader && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.roleName}
                  </p>
                </div>
              </div>

              {member.leader && (
                <Badge variant="secondary">Leader</Badge>
              )}
            </div>
          ))}

          {members.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No members found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
