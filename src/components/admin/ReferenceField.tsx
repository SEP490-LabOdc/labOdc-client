import React from "react"
import { cn, getRoleBasePath } from "@/lib/utils"
import { Info } from "lucide-react"
import { Input } from "../ui/input";
import { toast } from "sonner"
import { useUser } from "@/context/UserContext";

interface ReferenceFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    type: "company" | "user" | "project"
    id?: string
}

export function ReferenceField({ type, id, className, disabled, ...props }: ReferenceFieldProps) {
    const { user } = useUser();

    const prefix = getRoleBasePath(user.role);

    const getTypeSegment = () => {
        switch (type) {
            case "company": return "/companies/"
            case "user": return "/users/"
            case "project": return "/projects/"
            default: return ""
        }
    }

    const buildUrl = () => {
        if (!id) return undefined
        const segment = getTypeSegment()

        if (!prefix || !segment) return undefined

        return `${prefix}${segment}${id}`
    }

    const openLink = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!id) {
            toast.error("ID trống hoặc không hợp lệ.")
            return
        }
        if (!prefix) {
            toast.error("Không xác định được quyền truy cập (userRole không hợp lệ).")
            return
        }

        const segment = getTypeSegment()
        if (!segment) {
            toast.error("Loại đối tượng không hợp lệ (type không hợp lệ).")
            return
        }

        const url = buildUrl()
        if (!url) {
            toast.error("Không thể tạo URL hợp lệ để mở liên kết.")
            return
        }

        // Only redirect when everything is correct
        window.open(url, "_blank")
    }

    return (
        <div className="relative flex items-center w-full">
            <Input
                {...props}
                disabled={disabled}
                className={cn(
                    "pr-9 bg-muted/20 text-foreground disabled:opacity-100",
                    className
                )}
            />

            <button
                type="button"
                onClick={openLink}
                className="
                    absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded 
                    hover:bg-muted
                "
            >
                <Info size={18} className="text-muted-foreground" />
            </button>
        </div>
    )
}
