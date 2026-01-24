import { ErrorView } from "@/components/admin/ErrorView";
import { useGetCompanyById } from "@/hooks/api/companies";
import type { UpdateDetailRequest } from "../data/schema";
import { cn } from "@/lib/utils";

interface UpdateCompanyRequestDetailProps {
    requestData: UpdateDetailRequest;
}

const COMPANY_FIELDS = [
    { key: "name", label: "Tên công ty" },
    { key: "domain", label: "Lĩnh vực" },
    { key: "phone", label: "Số điện thoại" },
    { key: "website", label: "Website" },
    { key: "address", label: "Địa chỉ" },
    { key: "description", label: "Mô tả" },
];

export function UpdateCompanyRequestDetail({
    requestData,
}: UpdateCompanyRequestDetailProps) {
    const { data, isLoading, isError, error } = useGetCompanyById(
        requestData.targetId
    );

    if (isLoading) {
        return (
            <div className="py-4 text-muted-foreground">
                Đang tải thông tin công ty...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <ErrorView
                title="Lỗi tải thông tin công ty"
                description="Không thể tải dữ liệu công ty."
                details={(error as Error)?.message}
            />
        );
    }

    const companyData = data.data;
    const changeData = requestData.changeData ?? {};

    return (
        <div className="rounded-lg border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-muted px-4 py-4 text-sm font-semibold">
                <div>&nbsp;</div>
                <div>Giá trị hiện tại</div>
                <div>Giá trị mới</div>
            </div>

            {/* Rows */}
            <div className="divide-y">
                {COMPANY_FIELDS.map(({ key, label }) => {
                    const isChanged = Boolean(changeData[key]);
                    const oldValue = companyData[key] ?? "-";
                    const newValue = isChanged
                        ? changeData[key].new
                        : oldValue;

                    return (
                        <div
                            key={key}
                            className={cn(
                                "grid grid-cols-3 px-4 py-4 text-sm transition-colors",
                                isChanged && [
                                    "bg-yellow-50",
                                    "border-l-4 border-yellow-400",
                                ]
                            )}
                        >
                            {/* Field name */}
                            <div className="font-medium">
                                {label}
                            </div>

                            {/* Current value */}
                            <div className="text-muted-foreground">
                                {oldValue}
                            </div>

                            {/* New value */}
                            <div
                                className={cn(
                                    isChanged && "font-semibold text-yellow-900"
                                )}
                            >
                                {newValue}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
