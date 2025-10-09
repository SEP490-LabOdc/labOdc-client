import { ContentSection } from './content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
    return (
        <ContentSection
            title='Hồ sơ'
            desc='Đây là cách người khác sẽ nhìn thấy bạn trên trang web.'
        >
            <ProfileForm />
        </ContentSection>
    )
}
