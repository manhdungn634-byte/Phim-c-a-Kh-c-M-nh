# Phim – web chạy riêng (KKPhim có sẵn)

Dữ liệu lấy sẵn từ KKPhim (https://phimapi.com), không cần nhập API.

## Chạy
- Host tĩnh: đưa cả thư mục lên GitHub Pages, Netlify, Vercel, Cloudflare Pages.
- Server riêng (nếu trình duyệt báo lỗi CORS): `node server.js` rồi mở http://localhost:3000
  (server có sẵn /proxy cho phimapi.com và ophim1.com).

## Đóng gói APK
Đưa web lên HTTPS rồi dán link vào pwabuilder.com, chọn Android. Icon dùng icon-512.png.
