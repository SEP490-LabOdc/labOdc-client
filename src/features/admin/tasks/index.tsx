import {
    Table,
    TableHeader,
    TableBody,
    // TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/components/ui/table"

export default function Task() {
    return (
        <Table>
            <TableCaption>Danh sách người dùng</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Nguyễn Văn A</TableCell>
                    <TableCell>nguyenvana@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Trần Thị B</TableCell>
                    <TableCell>tranthib@gmail.com</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
