'use client';
import { useState } from 'react';
import { Carousel, ConfigProvider } from 'antd';
import Image from 'next/image';
import { Divider } from '@heroui/divider';

const heroPosts = [
  {
    id: 1,
    title:
      'Phân Tích CreatorDAO: Khi Con Người Có Thể Trở Thành Tài Sản Đầu Tư',
    image:
      'https://hakresearch.com/wp-content/uploads/2025/09/Phan-tich-Pudgy-Party_-Co-hoi-va-cach-kiem-tien.jpg',
  },
  {
    id: 2,
    title: 'Phân Tích Meteora: Thông Tin Cần Biết Khi TGE Đã Đến Gần',
    image:
      'https://hakresearch.com/wp-content/uploads/photos/shares/phan-tich-meteora-thong-tin-can-biet-khi-tge-da-den-gan/1760775336_meteora.jpg',
  },
  {
    id: 3,
    title:
      'Tổng Giám Đốc Redstone Oracle: Mọi Xu Hướng Lớn Phụ Thuộc Vào Oracle',
    image:
      'https://hakresearch.com/wp-content/uploads/photos/shares/phan-tich-meme-rush-don-bay-tao-nen-meme-season-tren-bnb-chain/1760709592_binance%20wallet.png',
  },
  {
    id: 4,
    title: 'Concero Hợp Tác Với Pharos Network: Mở Khóa Khả Năng Tương...',
    image:
      'https://hakresearch.com/wp-content/uploads/2025/09/concero-pharos.png',
  },
  {
    id: 5,
    title: 'Giám Đốc Công Nghệ Pendle: “Tham Vọng Của Pendle Với Boros...”',
    image:
      'https://hakresearch.com/wp-content/uploads/2025/09/Screenshot-2025-09-27-150005.png',
  },
];

const newsPosts = [
  {
    id: 1,
    title: 'RedStone Mua Lại Credora: Bước Tiến Chiến Lược Trong Đánh Giá...',
    image:
      'https://hakresearch.com/wp-content/uploads/2025/09/Screenshot-2025-09-08-152329.png',
  },
  {
    id: 2,
    title: 'Concero Hợp Tác Với Pharos Network: Mở Khóa Khả Năng Tương...',
    image:
      'https://hakresearch.com/wp-content/uploads/2025/09/concero-pharos.png',
  },
  {
    id: 3,
    title: 'Backpack EU Chính Thức Ra Mắt, Cung Cấp Giao Dịch Hợp Đồng...',
    image:
      'https://hakresearch.com/wp-content/uploads/2025/09/Screenshot-2025-09-27-153230.png',
  },
  {
    id: 4,
    title: 'Giám Đốc Công Nghệ Pendle: “Tham Vọng Của Pendle Với Boros...”',
    image:
      'https://hakresearch.com/wp-content/uploads/2025/09/Screenshot-2025-09-27-150005.png',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto space-y-8">
      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Bài lớn */}
        <div className="md:col-span-3 relative rounded-2xl overflow-hidden">
          <Image
            src={heroPosts[0].image}
            alt={heroPosts[0].title}
            width={800}
            height={400}
            className="object-cover w-full h-[400px]"
          />
          <div className="w-full absolute bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-2xl font-semibold">{heroPosts[0].title}</h2>
          </div>
        </div>

        {/* 4 bài nhỏ (2 hàng x 2 cột) */}
        <div className="grid grid-cols-2 md:col-span-2 gap-4 w-full">
          {heroPosts.slice(1, 5).map((post) => (
            <div key={post.id} className="relative rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={200}
                className="object-cover w-full h-[190px]"
              />
              <div className="w-full absolute bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-sm font-medium">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />
      {/* News carousel */}
      <div className="mb-2">
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 30, // 🔹 to mũi tên
                arrowOffset: 20, // 🔹 cách mép
                dotHeight: 5, // 🔹 chiều cao chấm
                dotWidth: 20, // 🔹 chiều rộng chấm
                dotGap: 8, // 🔹 khoảng cách giữa các chấm
                dotActiveWidth: 32, // 🔹 chấm active to hơn
              },
            },
          }}
        >
          <Carousel
            dots={true}
            slidesToShow={4}
            slidesToScroll={1}
            arrows
            infinite
            autoplay
          >
            {newsPosts.map((post) => (
              <div key={post.id} className="px-2 pb-2">
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="object-fill w-full h-[200px]"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-base">{post.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          <style jsx global>{`
            .ant-carousel .slick-dots li button {
              background: #d1d5db !important; /* màu dot thường (xám nhạt) */
              opacity: 1 !important;
            }
            .ant-carousel .slick-dots li.slick-active::after {
              background: #006fee !important; /* màu dot active (HeroUI tím) */
              border-radius: 8px !important;
            }
            .ant-carousel .slick-dots-bottom {
              bottom: -20px !important; /* đẩy dots xuống dưới */
            }
          `}</style>
        </ConfigProvider>
      </div>
    </div>
  );
}
