import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UsersImportDialog } from "./users-import-dialog";

export function UsersImportButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Import người dùng</Button>
            <UsersImportDialog open={open} onOpenChange={setOpen} />
        </>
    );
}
