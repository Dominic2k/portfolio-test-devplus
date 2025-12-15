// Cấu hình Username GitHub của bạn
const username = "dominic2k"; // Thay bằng username của bạn

// Fetch GitHub Repos
async function getRepos() {
    const container = document.getElementById("repo-container");

    try {
        // Thêm &per_page=100 để lấy tối đa 100 repo
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`
        );

        if (!response.ok) throw new Error("Không thể kết nối GitHub");

        const repos = await response.json();

        // Xóa loading text
        container.innerHTML = "";

        // Kiểm tra nếu không có repo nào
        if (repos.length === 0) {
            container.innerHTML = "<p>Chưa có dự án nào được công khai.</p>";
            return;
        }

        // Duyệt qua TẤT CẢ repo thay vì chỉ 6 cái
        repos.forEach((repo) => {
            const card = document.createElement("div");
            card.classList.add("project-card");

            const description = repo.description
                ? repo.description
                : "Chưa có mô tả cho dự án này.";

            // Màu sắc cho ngôn ngữ
            let langColor = "#ccc";
            if (repo.language === "JavaScript") langColor = "#f1e05a";
            if (repo.language === "HTML") langColor = "#e34c26";
            if (repo.language === "CSS") langColor = "#563d7c";
            if (repo.language === "TypeScript") langColor = "#2b7489";
            if (repo.language === "Python") langColor = "#3572A5";
            if (repo.language === "Java") langColor = "#b07219";
            if (repo.language === "PHP") langColor = "#4F5D95";

            card.innerHTML = `
                <a href="${repo.html_url}" target="_blank">
                    <h3>${repo.name}</h3>
                    <p>${description}</p>
                    <div class="project-stats">
                        <span><span class="lang-dot" style="background-color: ${langColor}"></span>${
                repo.language || "Code"
            }</span>
                        <span><i class="far fa-star"></i> ${
                            repo.stargazers_count
                        }</span>
                    </div>
                </a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải dữ liệu: ${error.message}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", getRepos);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});
