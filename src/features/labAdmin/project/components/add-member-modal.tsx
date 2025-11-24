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
import { Label } from '@/components/ui/label.tsx'
import { useGetMentorByProjectId } from '@/hooks/api/users'
import { toast } from 'sonner'

interface SystemUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMembers: (selectedUsers: SystemUser[]) => void;
  projectId: string;
  maxSelected?: number;   // SỐ LƯỢNG TỐI ĐA CHO PHÉP CHỌN
}

export function AddMemberModal({
  isOpen,
  onClose,
  onAddMembers,
  projectId,
  maxSelected = 2,     // mặc định tối đa chọn 2 người (mentor1 + mentor2)
}: AddMemberModalProps) {

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<SystemUser[]>([])

  const { data: mentors = [], isLoading: mentorLoading } =
    useGetMentorByProjectId(projectId)

  // Convert API ⇒ SystemUser
  const cleanedMentors: SystemUser[] = mentors.map((m: any) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(m.name)}`,
  }))

  const filteredUsers = cleanedMentors.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isUserSelected = (user: SystemUser) => {
    return selectedUsers.some(selected => selected.id === user.id)
  }

  const handleSelectUser = (user: SystemUser, isChecked: boolean) => {
    // Nếu cố chọn thêm khi đã đạt max → không cho chọn
    if (isChecked && selectedUsers.length >= maxSelected) {
      toast.error(`Bạn chỉ được phép chọn tối đa ${maxSelected} mentor.`)
      return
    }

    if (isChecked) {
      setSelectedUsers(prev => [...prev, user])
    } else {
      setSelectedUsers(prev => prev.filter(selected => selected.id !== user.id))
    }
  }

  const handleSubmit = () => {
    onAddMembers(selectedUsers)
    setSelectedUsers([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            Chọn mentor cho dự án
          </DialogTitle>
          <DialogDescription>
            Hãy chọn 1 hoặc <strong>{maxSelected}</strong>  mentor để phụ trách dự án này.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm theo tên hoặc email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* SELECTED */}
          {selectedUsers.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Đã chọn ({selectedUsers.length}/{maxSelected})
              </Label>

              <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-gray-50">
                {selectedUsers.map(user => (
                  <Badge
                    key={user.id}
                    variant="secondary"
                    className="flex items-center gap-2 p-1 pr-2"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
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

          {/* LIST */}
          <Label className="text-sm font-medium">Kết quả tìm kiếm</Label>
          <ScrollArea className="h-[250px] border rounded-md">
            <div className="p-4 space-y-3">
              {mentorLoading ? (
                <p className="text-center text-gray-500">Đang tải...</p>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map(user => {
                  const disabled =
                    !isUserSelected(user) &&
                    selectedUsers.length >= maxSelected

                  return (
                    <div key={user.id} className="flex items-center gap-3 opacity-100">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={isUserSelected(user)}
                        disabled={disabled}
                        onCheckedChange={(isChecked) => handleSelectUser(user, !!isChecked)}
                      />

                      <Label
                        htmlFor={`user-${user.id}`}
                        className={`flex-1 flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-40 cursor-not-allowed' : ''
                          }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </Label>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Không tìm thấy mentor nào.
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
            disabled={selectedUsers.length === 0}  // ít nhất 1 user mới bấm được
          >
            Phê duyệt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
