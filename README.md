# Phim – web chạy riêng

## Cách 1: Host tĩnh (đơn giản nhất)
Đưa cả thư mục lên Netlify (kéo thả tại app.netlify.com/drop), Vercel, Cloudflare Pages hoặc GitHub Pages. Mở link, bấm **NHẬP API** và dán link, ví dụ:
- https://phimapi.com/v1/api/danh-sach/phim-bo
- https://ophim1.com/v1/api/danh-sach/phim-le

## Cách 2: Server riêng (khi bị lỗi CORS)
    node server.js          # mở http://localhost:3000
Server có sẵn /proxy để gọi API khi trình duyệt bị chặn CORS. Chỉ cho phép phimapi.com và ophim1.com;
muốn thêm nguồn: ALLOW="phimapi.com,ophim1.com,nguon-khac.com" node server.js
Có thể deploy lên Render, Railway hoặc VPS (lệnh chạy: node server.js).

## Đóng gói APK
Sau khi web chạy bằng HTTPS, vào pwabuilder.com, dán link web, chọn Android và tải APK/AAB.
Icon dùng icon-512.png. Với Android TV cần thêm cấu hình TV trong project Android (PWABuilder hỗ trợ xuất project).

## Tối ưu tốc độ
- Ảnh poster được nén nhỏ và đổi sang WebP qua wsrv.nl (tắt/bật trong Cá nhân > Tối ưu ảnh). Nếu lỗi sẽ tự dùng ảnh gốc.
- Ảnh đã xem được lưu trong máy (tối đa 240 ảnh), lần sau hiện ngay.
- Danh sách phim lần trước hiện tức thì, cập nhật mới ngầm phía sau.
- Lưới phim tải dần khi cuộn, hls.js chỉ tải khi bấm phát.
