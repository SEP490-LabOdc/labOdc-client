import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { memo, useState } from "react";
import { toast } from "sonner";
import { LongText } from "@/components/long-text";
import { InputFile } from "@/components/admin/InputFile";
import { Input } from "@/components/ui/input";

// ================= Utility =================
function excelDateToJSDate(serial: number) {
    if (typeof serial !== "number") return serial;
    const utc_days = Math.floor(serial - 25569);
    return new Date(utc_days * 86400 * 1000).toISOString().split("T")[0];
}

// ================= MAPPING =================
const HEADER_MAPPING: Record<string, string> = {
    "Họ và tên": "fullName",
    "Số điện thoại": "phone",
    "Email": "email",
    "Địa chỉ": "address",
    "Ngày sinh": "birthDate",
    "Giới tính": "gender",
    "Link Avarta": "avatarUrl",
};

const FIELD_LABELS = Object.fromEntries(
    Object.entries(HEADER_MAPPING).map(([vi, key]) => [key, vi])
);

// ================= COMPONENT =================
export function UsersImportDialog({ open, onOpenChange }: any) {
    const [rowsRaw, setRowsRaw] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [fileKey, setFileKey] = useState(Date.now());

    const resetState = () => {
        setRows([]);
        setRowsRaw([]);
        setSearch("");
        setFileKey(Date.now());
    };

    const handleOpenChange = (v: boolean) => {
        if (!v) resetState();
        onOpenChange(v);
    };

    const fail = (msg: string) => {
        toast.error(msg);
        resetState();
    };

    const filterRows = (text: string, source: any[]) => {
        const t = text.trim().toLowerCase();
        if (!t) return source;

        return source.filter((u) =>
            u.fullName?.toLowerCase().includes(t) ||
            u.email?.toLowerCase().includes(t)
        );
    };

    // ================= HANDLE FILE IMPORT =================
    const handleFile = async (file: File | null) => {
        if (!file) return resetState();

        try {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

            if (json.length < 2) return fail("File Excel không có dữ liệu!");

            const headers = json[0] as string[];

            const missing = Object.keys(HEADER_MAPPING).filter(h => !headers.includes(h));
            if (missing.length > 0) return fail("Thiếu cột: " + missing.join(", "));

            const mappedRows = json.slice(1).map((row: any[], index: number) => {
                const obj: any = {};

                headers.forEach((h, idx) => {
                    const key = HEADER_MAPPING[h];
                    let value = row[idx] ?? "";
                    if (key === "birthDate") value = excelDateToJSDate(value);
                    obj[key] = value;
                });

                obj.__line = index + 2;
                return obj;
            });

            if (mappedRows.length > 100) return fail("Chỉ được nhập tối đa 100 người dùng!");

            const invalid = mappedRows.filter(u => !u.fullName || !u.email || !u.phone);
            if (invalid.length > 0) {
                const msg = invalid.map(u => `- Dòng ${u.__line}`).join("\n");
                return fail("Thiếu Họ tên / Email / Số điện thoại tại:\n" + msg);
            }

            const emailMap = new Map<string, number[]>();
            mappedRows.forEach(u => {
                const email = u.email.trim().toLowerCase();
                if (!emailMap.has(email)) emailMap.set(email, []);
                emailMap.get(email)!.push(u.__line);
            });

            const dupEmails = [...emailMap.entries()].filter(([_, lines]) => lines.length > 1);
            if (dupEmails.length > 0) {
                let msg = "Email bị trùng:\n";
                dupEmails.forEach(([email, lines]) => {
                    msg += `- ${email} (dòng ${lines.join(", ")})\n`;
                });
                return fail(msg);
            }

            const phoneMap = new Map<string, number[]>();
            mappedRows.forEach(u => {
                const phone = String(u.phone).trim();
                if (!phoneMap.has(phone)) phoneMap.set(phone, []);
                phoneMap.get(phone)!.push(u.__line);
            });

            const dupPhones = [...phoneMap.entries()].filter(([_, lines]) => lines.length > 1);
            if (dupPhones.length > 0) {
                let msg = "Số điện thoại bị trùng:\n";
                dupPhones.forEach(([phone, lines]) => {
                    msg += `- ${phone} (dòng ${lines.join(", ")})\n`;
                });
                return fail(msg);
            }

            // PASS
            setRowsRaw(mappedRows);
            setRows(mappedRows);

        } catch {
            return fail("Không thể đọc file Excel!");
        }
    };

    // ================= RENDER =================
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-5xl h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Nhập người dùng từ Excel</DialogTitle>
                </DialogHeader>

                {/* Input file */}
                <div className="mt-2">
                    <InputFile
                        key={fileKey}
                        accept=".xlsx"
                        onFileSelected={handleFile}
                        placeholder="Tải lên file exel (không quá 100 dòng)"
                    />
                </div>

                {/* Search box */}
                {rowsRaw.length > 0 && (
                    <div className="flex items-center gap-3">
                        <Input
                            placeholder="Tìm theo tên hoặc email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setRows(filterRows(search, rowsRaw));
                                }
                            }}
                            className="w-80"
                        />

                        {/* Nút tìm kiếm */}
                        <Button
                            onClick={() => setRows(filterRows(search, rowsRaw))}
                        >
                            Tìm kiếm
                        </Button>

                        {/* Nút xóa filter */}
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearch("");
                                setRows(rowsRaw); // reset
                            }}
                        >
                            Xóa lọc
                        </Button>
                    </div>
                )}
                {/* Preview Table */}
                <div className="flex-1 rounded-md border overflow-auto mt-4" style={{ marginTop: "-1px" }}>
                    {rows.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Chưa có dữ liệu để hiển thị
                        </div>
                    ) : (
                        <PreviewTable rows={rows} />
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleOpenChange(false)}>Đóng</Button>
                    <Button disabled>Import (Chưa kết nối API)</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const PreviewTable = memo(function PreviewTable({ rows }: { rows: any[] }) {
    return (
        <table className="w-full text-sm table-fixed">
            <thead className="bg-white sticky top-0 z-10 shadow">
                <tr>
                    <th className="px-3 py-2 border text-left font-semibold w-12">#</th>
                    {Object.keys(rows[0])
                        .filter(k => k !== "__line")
                        .map(field => (
                            <th
                                key={field}
                                className="px-3 py-2 border text-left font-semibold max-w-[200px] truncate"
                            >
                                {FIELD_LABELS[field] || field}
                            </th>
                        ))}
                </tr>
            </thead>

            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                        <td className="px-3 py-2 border text-center">{i + 1}</td>
                        {Object.keys(row)
                            .filter(k => k !== "__line")
                            .map(field => (
                                <td
                                    key={field}
                                    className="px-3 py-2 border max-w-[200px] truncate"
                                >
                                    <LongText>{row[field] || ""}</LongText>
                                </td>
                            ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
});
