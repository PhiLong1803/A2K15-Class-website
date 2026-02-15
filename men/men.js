let currentIndex = 0;
const dataList = [
  {
    type: "image",
    url: "images/01.jpg",
    title: "“mấy ổng”",
  },
  {
    type: "image",
    url: "images/02.jpg",
    title: "tụi mình",
  },
  {
    type: "image",
    url: "images/03.jpg",
    title: "cũng là tụi mình nhưng mà kiểu khác =)))",
  },
  {
    type: "image",
    url: "images/04.jpg",
    title: "chiếc bảng des vội 🤯",
  },
  {
    type: "image",
    url: "images/05.jpg",
    title: "bản des dành riêng cho mấy “ổng” 🫰🫰",
  },
  {
    type: "image",
    url: "images/06.jpg",
    title: "Thầy Linh Phan 🫶",
  },
  {
    type: "image",
    url: "images/07.jpg",
    title: "đầu tàu Nhật Nam 🚂",
  },
  {
    type: "image",
    url: "images/08.jpg",
    title: "Một người rất là đẹp trai, rất là mềm mỏng, rất là thông minh học dỏii Phạm Võ Phi Long",
  },
  {
    type: "image",
    url: "images/09.jpg",
    title: "Thầy Bảo khen là người đẹp trai nhất 😳",
  },
  {
    type: "image",
    url: "images/10.jpg",
    title: "Rapper của Under The Hood 😎 Khả Toàn",
  },
  {
    type: "image",
    url: "images/11.jpg",
    title: "quà tặng rất đúng trọng tâm =)))",
  },
  {
    type: "image",
    url: "images/12.jpg",
    title: "“Đối thủ của bạn Khoa” Nguyễn Tấn Duy",
  },
  {
    type: "image",
    url: "images/13.jpg",
    title: "Giỏi văn số 1 🫨",
  },
  {
    type: "image",
    url: "images/14.jpg",
    title: "Sport Boy Bình Nguyên",
  },
  {
    type: "image",
    url: "images/15.jpg",
    title: "Đức báo",
  },
  {
    type: "image",
    url: "images/16.jpg",
    title: "Đức Phật Quốc An 😎",
  },
  {
    type: "image",
    url: "images/17.jpg",
    title: "“Bạn đang cầm bịch muối, lên đây” =)) Trần Duy An",
  },
  {
    type: "image",
    url: "images/18.jpg",
    title: "Bạn này đệp trai nhất lớp 🫨",
  },
  {
    type: "image",
    url: "images/19.jpg",
    title: "“Người ồn ào nhất” Lê Nguyễn Nhật Khoa",
  },
  {
    type: "image",
    url: "images/20.jpg",
    title: "10 điểm toánn 😳",
  },
  {
    type: "image",
    url: "images/21.jpg",
    title: "Lê Minh Nghĩa quà tặng rất ý nghĩa 🎁",
  },
  {
    type: "image",
    url: "images/22.jpg",
    title: "Lê Minh Nghĩa quá phiền, đi về dùm cái",
  },
  {
    type: "image",
    url: "images/23.jpg",
    title: "thay de thuong",
  },
  {
    type: "image",
    url: "images/24.jpg",
    title: "em ci cười tươi hơn thầy nuẫ =))))))))",
  },
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
const itemsPerPage = 9; // Bạn có thể chỉnh số này (ví dụ 16 hoặc 20)
let filteredData = [...dataList];

function renderGallery() {
  const oldVideos = gallery.querySelectorAll("video");
  oldVideos.forEach((v) => {
    v.pause();
    v.src = "";
    v.load();
    v.remove();
  });

  gallery.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredData.slice(start, end);

  pageItems.forEach((item) => {
    let mediaContent = "";
    const realIndex = dataList.indexOf(item);

    if (item.type === "image") {
      // Thêm loading="lazy" để web mượt hơn nữa
      mediaContent = `<img src="${item.url}" loading="lazy">`;
    } else {
      mediaContent = `<video src="${item.url}#t=0.001" preload="metadata" muted loop onmouseenter="this.play()" onmouseleave="this.pause(); this.currentTime = 0;"></video>`;
    }

    gallery.innerHTML += `
            <div class="media-card" data-index="${realIndex}">
                ${mediaContent}
                <div class="caption">${item.title}</div>
            </div>
        `;
  });

  // Cập nhật số trang hiển thị
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  pageInfo.innerText = `Trang ${currentPage} / ${totalPages}`;
  location.hash = `page-${currentPage}`;
}

// Hàm xử lý khi gõ vào ô tìm kiếm
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    filteredData = dataList.filter((item) =>
      item.title.toLowerCase().includes(keyword),
    );
    currentPage = 1;
    renderGallery();
  });
}

function checkHashPage() {
  const hash = window.location.hash; // Lấy giá trị ví dụ "#page-3"
  if (hash && hash.includes("page-")) {
    const pageNum = parseInt(hash.replace("#page-", ""));
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Kiểm tra nếu số trang hợp lệ thì mới gán
    if (pageNum > 0 && pageNum <= totalPages) {
      currentPage = pageNum;
    }
  }
  renderGallery();
}

// Chạy hàm kiểm tra khi vừa mở web
checkHashPage();

// Thêm sự kiện này để nếu người dùng nhấn "Back" (Quay lại) trên trình duyệt thì web cũng đổi trang theo
window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  if (hash.includes("page-")) {
    const pageNum = parseInt(hash.replace("#page-", ""));
    if (pageNum !== currentPage) {
      currentPage = pageNum;
      renderGallery();
    }
  }
});

// Xử lý nút bấm chuyển trang
document.getElementById("prevPage").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderGallery();
    window.scrollTo({top: 0, behavior: "smooth"});
  }
};

document.getElementById("nextPage").onclick = () => {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderGallery();
    window.scrollTo({top: 0, behavior: "smooth"});
  }
};

// Gọi hàm để hiện thị dữ liệu lần đầu tiên
renderGallery();

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close-btn");

document.getElementById("gallery").addEventListener("click", function (e) {
  const target = e.target.closest(".media-card");
  if (target) {
    // Thay vì dùng indexOf(target), ta lấy trực tiếp từ data-index đã lưu
    currentIndex = parseInt(target.getAttribute("data-index"));
    showLightbox(currentIndex);
  }
});

function showLightbox(index) {
  const item = dataList[index];
  const lbImg = document.getElementById("lightbox-img");
  const lbVideo = document.getElementById("lightbox-video");
  const lbCaption = document.getElementById("lightbox-caption");

  lightbox.style.display = "flex"; // Kích hoạt Flexbox để căn giữa

  if (item.type === "image") {
    lbImg.style.display = "block";
    lbVideo.style.display = "none";
    lbImg.src = item.url;
  } else {
    lbVideo.style.display = "block";
    lbImg.style.display = "none";
    lbVideo.src = item.url;
    lbVideo.controls = true; // Hiện thanh điều khiển như trong ảnh
    lbVideo.load();
    lbVideo.play();
  }

  lbCaption.innerText = item.title; // Gán tiêu đề nằm dưới
  document.body.style.overflow = "hidden";
}

// Hàm đóng Lightbox (Phải dừng video để tránh chạy ngầm)
function closeLightbox() {
  const lbVideo = document.getElementById("lightbox-video");
  lightbox.style.display = "none";
  lbVideo.pause(); // Dừng phát
  lbVideo.src = ""; // Xóa link để triệt để tiếng kêu ngầm
  document.body.style.overflow = "auto";
}

closeBtn.onclick = closeLightbox;
lightbox.onclick = function (e) {
  if (
    e.target !== document.getElementById("lightbox-img") &&
    e.target !== document.getElementById("lightbox-video")
  ) {
    closeLightbox();
  }
};

// Thêm sự kiện lắng nghe bàn phím (Esc, Space, và Mũi tên)
document.addEventListener("keydown", function (e) {
  const isLightboxOpen =
    lightbox.style.display === "flex" || lightbox.style.display === "block";
  if (!isLightboxOpen) return;

  const lbVideo = document.getElementById("lightbox-video");
  const isVideo = dataList[currentIndex].type === "video";

  // Các phím cần chặn cuộn trang
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
  if (keysToBlock.includes(e.key)) {
    e.preventDefault();
  }

  if (e.key === "Escape") closeLightbox();

  if (isVideo) {
    // Điều khiển Video
    if (e.key === "ArrowRight") lbVideo.currentTime += 5;
    if (e.key === "ArrowLeft") lbVideo.currentTime -= 5;
    if (e.key === "ArrowUp") changeMedia(-1);
    if (e.key === "ArrowDown") changeMedia(1);
    if (e.key === " ") {
      lbVideo.paused ? lbVideo.play() : lbVideo.pause();
    }
  } else {
    // Điều khiển Ảnh
    if (e.key === "ArrowRight" || e.key === "ArrowDown") changeMedia(1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") changeMedia(-1);
  }
});

// Hàm chuyển đổi vị trí
function changeMedia(step) {
  // 1. Dừng video hiện tại ngay lập tức để tránh tiếng vang nền
  const lbVideo = document.getElementById("lightbox-video");
  lbVideo.pause();
  lbVideo.src = "";
  lbVideo.load(); // Reset trạng thái video

  // 2. Tính toán vị trí mới
  currentIndex += step;
  if (currentIndex >= dataList.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = dataList.length - 1;

  // 3. Hiển thị nội dung mới
  showLightbox(currentIndex);
}
