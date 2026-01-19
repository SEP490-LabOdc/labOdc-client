import { ContentSection } from '../components/content-section'
import { AccountForm } from '../components/account-form'

export function SettingsAccount() {
    return (
        <ContentSection
            title='Tài khoản'
            desc='Cập nhật cài đặt tài khoản của bạn. Thiết lập ngôn ngữ và múi giờ ưu tiên.'
        >
            <AccountForm />
        </ContentSection>
    )
}