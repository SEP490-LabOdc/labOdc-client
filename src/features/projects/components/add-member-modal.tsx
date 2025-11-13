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

interface SystemUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

const mockAvailableUsers: SystemUser[] = [
  { id: 'user-1', name: 'Hoàng Văn An', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=An', email: 'an@example.com' },
  { id: 'user-2', name: 'Trần Thị Bích', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bich', email: 'bich@example.com' },
  { id: 'user-3', name: 'Lê Văn Cường', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Cuong', email: 'cuong@example.com' },
  { id: 'user-4', name: 'Phạm Thị Dung', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dung', email: 'dung@example.com' },
  { id: 'user-5', name: 'Nguyễn Văn Giang', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Giang', email: 'giang@example.com' },
  { id: 'user-6', name: 'Vũ Thị Hà', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ha', email: 'ha@example.com' },
]

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMembers: (selectedUsers: SystemUser[]) => void;
}

export function AddMemberModal({ isOpen, onClose, onAddMembers }: AddMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<SystemUser[]>([])

  const filteredUsers = mockAvailableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isUserSelected = (user: SystemUser) => {
    return selectedUsers.some(selected => selected.id === user.id)
  }

  const handleSelectUser = (user: SystemUser, isChecked: boolean) => {
    if (isChecked) {
      if (!isUserSelected(user)) {
        setSelectedUsers([...selectedUsers, user])
      }
    } else {
      setSelectedUsers(selectedUsers.filter(selected => selected.id !== user.id))
    }
  }

  const handleSubmit = () => {
    onAddMembers(selectedUsers)
    onClose()
    setSelectedUsers([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            Thêm thành viên
          </DialogTitle>
          <DialogDescription>
            Tìm kiếm và chọn nhiều thành viên để thêm vào dự án.
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
                      onClick={() => handleSelectUser(user, false)} // Bấm X để bỏ chọn
                      className="rounded-full hover:bg-gray-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Label className="text-sm font-medium">Kết quả tìm kiếm</Label>
          <ScrollArea className="h-[250px] border rounded-md">
            <div className="p-4 space-y-3">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Checkbox
                      id={`user-${user.id}`}
                      // Kiểm tra xem người dùng này đã được chọn chưa
                      checked={isUserSelected(user)}
                      // Hàm xử lý khi check/uncheck
                      onCheckedChange={(isChecked) => handleSelectUser(user, !!isChecked)}
                    />
                    <Label
                      htmlFor={`user-${user.id}`}
                      className="flex-1 flex items-center gap-3 cursor-pointer"
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
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Không tìm thấy thành viên nào.
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
            disabled={selectedUsers.length === 0} // Vô hiệu hóa nếu chưa chọn ai
          >
            Thêm {selectedUsers.length > 0 ? `${selectedUsers.length} thành viên` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}