import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetUserById, useUpdatePassword } from "@/hooks/api/users";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export function AccountForm() {
    const userId =
        typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

    const { data: userData, isLoading, refetch } = useGetUserById(userId);
    const { mutateAsync: updatePassword } = useUpdatePassword();

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [passwordFields, setPasswordFields] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (userId) refetch();
    }, [userId, refetch]);

    if (isLoading) {
        return <p className="text-center py-6">Đang tải dữ liệu người dùng...</p>;
    }

    const form = useForm({
        defaultValues: {},
    });


    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Form {...form}>
                {/* FORM KHÔNG SUBMIT GÌ CẢ */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-8"
                >
                    {/* Email */}
                    <FormField
                        name="email"
                        render={() => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled
                                        value={userData?.data.email ?? ""}
                                    />
                                </FormControl>
                                <FormDescription>Email không thể thay đổi.</FormDescription>
                            </FormItem>
                        )}
                    />

                    {/* Mật khẩu dạng ****** */}
                    <div className="grid gap-2">
                        <FormLabel>Mật khẩu</FormLabel>
                        <Input value="********" disabled />

                        <Button
                            type="button"
                            variant="outline"
                            className="mt-2 w-50"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                        >
                            {showPasswordForm ? "Hủy thay đổi" : "Thay đổi mật khẩu"}
                        </Button>
                    </div>

                    {/* Form thay đổi mật khẩu */}
                    {showPasswordForm && (
                        <div
                            className="
            rounded-xl shadow-sm p-6 space-y-5
            bg-white dark:bg-neutral-900
            border border-gray-200 dark:border-neutral-700
        "
                        >
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                Đổi mật khẩu
                            </h3>

                            {/* Mật khẩu hiện tại */}
                            <div className="space-y-2">
                                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Mật khẩu hiện tại
                                </FormLabel>
                                <Input
                                    type="password"
                                    value={passwordFields.currentPassword}
                                    onChange={(e) =>
                                        setPasswordFields({
                                            ...passwordFields,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                    className="
                    bg-blue-50 dark:bg-neutral-800
                    dark:text-white
                    dark:border-neutral-700
                "
                                />
                            </div>

                            {/* Mật khẩu mới */}
                            <div className="space-y-2">
                                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Mật khẩu mới
                                </FormLabel>
                                <Input
                                    type="password"
                                    value={passwordFields.newPassword}
                                    onChange={(e) =>
                                        setPasswordFields({
                                            ...passwordFields,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    className="dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
                                />
                            </div>

                            {/* Xác nhận mật khẩu */}
                            <div className="space-y-2">
                                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Xác nhận mật khẩu mới
                                </FormLabel>
                                <Input
                                    type="password"
                                    value={passwordFields.confirmPassword}
                                    onChange={(e) =>
                                        setPasswordFields({
                                            ...passwordFields,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    className="dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
                                />
                            </div>

                            <Button
                                className="
                w-full h-11 text-white
                bg-[#264653] hover:bg-[#1f3a43]
                dark:bg-[#1f363c] dark:hover:bg-[#172b30]
            "
                                type="button"
                                onClick={async () => {
                                    if (!userId) return toast.error("Không tìm thấy ID người dùng!");

                                    if (passwordFields.newPassword !== passwordFields.confirmPassword)
                                        return toast.error("Xác nhận mật khẩu không khớp!");

                                    try {
                                        const res = await updatePassword({
                                            id: userId,
                                            payload: {
                                                currentPassword: passwordFields.currentPassword,
                                                newPassword: passwordFields.newPassword,
                                                confirmPassword: passwordFields.confirmPassword,
                                                passwordMatch: true,
                                            },
                                        });

                                        if (res?.success === false) {
                                            return toast.error(res.message || "Đổi mật khẩu thất bại!");
                                        }

                                        toast.success("Đổi mật khẩu thành công!");

                                        setShowPasswordForm(false);
                                        setPasswordFields({
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmPassword: "",
                                        });

                                    } catch (err) {
                                        toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
                                    }
                                }}
                            >
                                Xác nhận đổi mật khẩu
                            </Button>

                        </div>
                    )}


                </form>
            </Form>
        </div>
    );
}
