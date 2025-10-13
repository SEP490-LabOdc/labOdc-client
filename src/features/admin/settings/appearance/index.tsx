import { ContentSection } from '../components/content-section'
import { AppearanceForm } from '../components/appearance-form'

export function SettingsAppearance() {
    return (
        <ContentSection
            title='Giao diện'
            desc='Tùy chỉnh giao diện của ứng dụng. Tự động chuyển đổi giữa chủ đề ngày và đêm.'
        >
            <AppearanceForm />
        </ContentSection>
    )
}