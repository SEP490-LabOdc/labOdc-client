import React from "react"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import { Input } from "../ui/input";
import { toast } from "sonner"

export const REFERENCE_USER_ROLE = {
    SYSTEM_ADMIN: "SYSTEM_ADMIN",
    LAB_ADMIN: "LAB_ADMIN",
    SUPERVISOR: "SUPERVISOR",
    USER: "USER",
    COMPANY: "COMPANY",
} as const;

interface ReferenceFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    type: "company" | "user" | "project"
    id?: string
    userRole: keyof typeof REFERENCE_USER_ROLE
}

export function ReferenceField({ type, id, userRole, className, disabled, ...props }: ReferenceFieldProps) {

    const getPrefix = () => {
        switch (userRole) {
            case REFERENCE_USER_ROLE.SYSTEM_ADMIN: return "/admin/"
            case REFERENCE_USER_ROLE.LAB_ADMIN: return "/lab-admin/"
            case REFERENCE_USER_ROLE.SUPERVISOR: return "/mentor/"
            case REFERENCE_USER_ROLE.USER: return "/talent/"
            case REFERENCE_USER_ROLE.COMPANY: return "/company/"
            default: return ""
        }
    }

    const getTypeSegment = () => {
        switch (type) {
            case "company": return "companies/"
            case "user": return "users/"
            case "project": return "projects/"
            default: return ""
        }
    }

    const buildUrl = () => {
        if (!id) return undefined

        const prefix = getPrefix()
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

        const prefix = getPrefix()
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
