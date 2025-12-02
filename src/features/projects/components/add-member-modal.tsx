import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Search, X, Users } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { getAvatarUrl } from '@/lib/utils.ts'

interface SystemUser {
  projectMemberId: string
  fullName: string
  avatarUrl: string
  email: string
  roleName: string
}

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAddMembers: (selectedUserIds: string[]) => void
  projectMembers?: SystemUser[]
}

export function AddMemberModal({
                                 isOpen,
                                 onClose,
                                 onAddMembers,
                                 projectMembers = []
                               }: AddMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<SystemUser[]>([])

  // Lọc chỉ lấy các thành viên có roleName là TALENT
  const talentMembers = projectMembers.filter(user => user.roleName === 'TALENT')

  const filteredUsers = talentMembers.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isUserSelected = (user: SystemUser) => {
    return selectedUsers.some(selected => selected.projectMemberId === user.projectMemberId)
  }

  const handleSelectUser = (user: SystemUser, isChecked: boolean) => {
    if (isChecked) {
      if (!isUserSelected(user)) {
        setSelectedUsers([...selectedUsers, user])
      }
    } else {
      setSelectedUsers(selectedUsers.filter(selected => selected.projectMemberId !== user.projectMemberId))
    }
  }

  const handleSubmit = () => {
    onAddMembers(selectedUsers.map(user => user.projectMemberId))
    onClose()
    setSelectedUsers([])
    setSearchQuery('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            Thêm thành viên vào Milestone
          </DialogTitle>
          <DialogDescription>
            Chọn Talent từ danh sách dự án để thêm vào milestone này.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm theo tên hoặc email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {selectedUsers.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Đã chọn ({selectedUsers.length})</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-gray-50 min-h-[40px]">
                {selectedUsers.map(user => (
                  <Badge
                    key={user.projectMemberId}
                    variant="secondary"
                    className="flex items-center gap-2 p-1 pr-2"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>
                        <img src={getAvatarUrl(user.fullName)} alt={user.fullName} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.fullName}</span>
                    <button
                      onClick={() => handleSelectUser(user, false)}
                      className="rounded-full hover:bg-gray-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Label className="text-sm font-medium">
            Talent trong dự án ({talentMembers.length})
          </Label>
          <ScrollArea className="h-[250px] border rounded-md">
            <div className="p-4 space-y-3">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.projectMemberId} className="flex items-center gap-3">
                    <Checkbox
                      id={`user-${user.projectMemberId}`}
                      checked={isUserSelected(user)}
                      onCheckedChange={(isChecked) => handleSelectUser(user, !!isChecked)}
                    />
                    <Label
                      htmlFor={`user-${user.projectMemberId}`}
                      className="flex-1 flex items-center gap-3 cursor-pointer"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>
                          <img src={getAvatarUrl(user.fullName)} alt={user.fullName} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.fullName}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  {searchQuery
                    ? 'Không tìm thấy Talent nào.'
                    : 'Dự án chưa có Talent nào.'}
                </p>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={selectedUsers.length === 0}
          >
            Thêm {selectedUsers.length > 0 ? `${selectedUsers.length} thành viên` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
