import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_ROLE_LABEL, USER_STATUS, USER_STATUS_LABEL, type UserRole, type UserStatus } from "../data/schema";
import { callTypes } from "../data/data";
import { useUpdateUserStatus } from "@/hooks/api/users";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function UserProfileView({ user }: any) {

    const { mutateAsync: updateUserStatus } = useUpdateUserStatus();

    const handleToggleStatus = async () => {
        if (!user?.id) return;

        const newStatus =
            user.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE;

        const updatePromise = updateUserStatus({
            id: user.id,
            status: newStatus,
        });

        toast.promise(updatePromise, {
            loading: "Đang cập nhật trạng thái...",
            success:
                newStatus === USER_STATUS.ACTIVE
                    ? "Tài khoản đã được kích hoạt!"
                    : "Tài khoản đã bị vô hiệu hóa!",
            error: "Cập nhật trạng thái thất bại!",
        });

        try {
            await updatePromise;
            // Nếu bạn muốn UI cập nhật ngay:
            user.status = newStatus;
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="max-w-6xl mx-auto py-6">
            <Card className="p-6 shadow-md">

                {/* MAIN LAYOUT: LEFT | RIGHT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* LEFT SIDE: AVATAR + BASIC INFO */}
                    <div className="flex flex-col items-center space-y-4 border-r pr-6">
                        <Avatar className="h-48 w-48">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback className="text-8xl">{user.fullName[0]}</AvatarFallback>
                        </Avatar>

                        <div className="text-center space-y-1">
                            <h2 className="text-3xl font-bold">
                                {user?.fullName || "Không rõ tên"}
                            </h2>

                            <p className="text-muted-foreground text-xl">
                                {USER_ROLE_LABEL[user?.role as UserRole] || ""}
                            </p>

                            <Button
                                variant={user.status === USER_STATUS.ACTIVE ? "destructive" : "default"}
                                onClick={handleToggleStatus}
                                className="mt-3"
                            >
                                {user.status === USER_STATUS.ACTIVE ? "Vô hiệu hóa" : "Kích hoạt"}
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT SIDE: TABS CONTENT */}
                    <div className="md:col-span-2 pl-6">
                        <Tabs defaultValue="about" className="w-full">

                            <TabsList className="grid w-full grid-cols-2 h-auto bg-gray-100 p-1 rounded-md">
                                <TabsTrigger
                                    value="about"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
                                >
                                    Thông tin
                                </TabsTrigger>

                                <TabsTrigger
                                    value="timeline"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
                                >
                                    Hoạt động
                                </TabsTrigger>
                            </TabsList>

                            {/* ABOUT TAB */}
                            <TabsContent value="about" className="mt-6 grid md:grid-cols-2 gap-8">

                                {/* CONTACT INFORMATION */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Thông tin liên hệ</h3>
                                    <div className="space-y-2">
                                        <InfoItem label="Số điện thoại" value={user?.phone} />
                                        <InfoItem label="Email" value={user?.email} />
                                        <InfoItem label="Địa chỉ" value={user?.address} />
                                        <InfoItem label="Website" value={user?.website} />
                                    </div>
                                </div>

                                {/* PERSONAL INFORMATION */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Thông tin cá nhân</h3>
                                    <div className="space">
                                        <InfoItem
                                            label={"Ngày sinh"}
                                            value={
                                                user?.birthDate
                                                    ? new Date(user.birthDate).toLocaleDateString("vi-VN")
                                                    : "—"
                                            }
                                        />
                                        <InfoItem label="Giới tính" value={user?.genderLabel} />
                                        <InfoItem
                                            label="Trạng thái"
                                            value={
                                                <Badge className={callTypes.get(user.status as UserStatus)}>
                                                    {USER_STATUS_LABEL[user.status as UserStatus]}
                                                </Badge>
                                            }
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TIMELINE TAB */}
                            <TabsContent value="timeline" className="mt-6">
                                <p className="text-muted-foreground">
                                    Chưa có dữ liệu hoạt động.
                                </p>
                            </TabsContent>

                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function InfoItem({ label, value }: any) {
    return (
        <div className="flex items-start justify-between border-b py-2">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <span className="text-sm">{value || "—"}</span>
        </div>
    );
}
