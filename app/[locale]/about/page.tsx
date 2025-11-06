import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const trans = useTranslations();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <section className="bg-white dark:bg-gray-800">
        <div className="px-4 py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Giới thiệu về ACME
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ACME là nền tảng tổng hợp thông tin thị trường Crypto, Airdrop và
            tin tức đầu tư — giúp bạn nắm bắt cơ hội sớm, đưa ra quyết định
            thông minh hơn trong không gian Web3.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nội dung chính */}
        <div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            “Giúp bạn không bỏ lỡ cơ hội trong thế giới Crypto.” ACME cung cấp
            dữ liệu cập nhật, phân tích chuyên sâu và hướng dẫn thực tế cho cả
            người mới và nhà đầu tư chuyên nghiệp.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Cập nhật nhanh',
                desc: 'Tin tức và dữ liệu thị trường được làm mới liên tục.',
              },
              {
                title: 'Hướng dẫn Airdrop',
                desc: 'Các Airdrop đáng chú ý và cách tham gia step-by-step.',
              },
              {
                title: 'Phân tích chuyên sâu',
                desc: 'Bài viết nghiên cứu, đánh giá dự án từ nguồn đáng tin cậy.',
              },
              {
                title: 'Kết nối cộng đồng',
                desc: 'Nơi kết nối nhà đầu tư, dự án và chuyên gia Web3.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
            Những con số
          </h4>
          <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <strong>10k+</strong> bài viết & phân tích
            </li>
            <li>
              <strong>2k+</strong> airdrop tracked
            </li>
            <li>
              <strong>50+</strong> quỹ & partner
            </li>
            <li>
              <strong>24/7</strong> cập nhật thị trường
            </li>
          </ul>

          <div className="mt-6 space-y-3">
            <a
              href="/"
              className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Đăng ký nhận bản tin
            </a>
            <a
              href="/contact"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white block w-full text-center py-2 rounded-md transition"
            >
              Liên hệ
            </a>
          </div>
        </aside>
      </section>

      {/* Tầm nhìn */}
      <section className="px-4 py-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Tầm nhìn
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Trở thành cổng thông tin hàng đầu về Crypto và Web3 tại Việt Nam —
            cung cấp kiến thức, dữ liệu và cộng đồng giúp mọi người tiếp cận đầu
            tư an toàn và hiệu quả.
          </p>

          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
            Đội ngũ
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { initials: 'NT', name: 'Nguyễn T.', role: 'CEO & Founder' },
              { initials: 'PL', name: 'Phạm L.', role: 'CTO' },
              { initials: 'HK', name: 'Hà K.', role: 'Editor' },
              { initials: 'TD', name: 'Trần D.', role: 'Research' },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl font-semibold text-gray-900 dark:text-white">
                  {member.initials}
                </div>
                <p className="mt-2 font-medium text-gray-900 dark:text-white">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">
              Sẵn sàng cập nhật cơ hội tiếp theo?
            </h3>
            <p className="text-sm opacity-90 mt-1">
              Đăng ký nhận bản tin hàng tuần của ACME — phân tích, airdrop, & dự
              án nổi bật.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <a
              href="/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition"
            >
              Đăng ký
            </a>
            <a
              href="/contact"
              className="border border-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md transition"
            >
              Liên hệ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
