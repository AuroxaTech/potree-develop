class DashboardLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

                * {
                    box-sizing: border-box;
                    font-family: 'Roboto', sans-serif;
                }

                body {
                    margin: 0;
                    font-family: 'Roboto', sans-serif;
                    background: #f4f7fa;
                    display: flex;
                }

                .sidebar {
                    width: 250px;
                    background: #fff;
                    box-shadow: 1px 0 2px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    height: 100vh;
                    transition: width 0.3s;
                }

                .sidebar h2 {
                    font-size: 22px;
                    margin-bottom: 30px;
                    color: #333;
                }

                .sidebar a {
                    color: #333;
                    text-decoration: none;
                    margin-bottom: 15px;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border-radius: 4px;
                    transition: background 0.3s;
                    position: relative;
                }

                .sidebar a:hover {
                    background: #f0f0f0;
                }

                .sidebar a.active {
                    background: linear-gradient(135deg, #00b5ee, #2575fc);
                    color: #fff;
                    font-weight: bold;
                }

                .sidebar a.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 4px;
                    background: linear-gradient(135deg, #00b5ee, #2575fc);
                }

                .sidebar a svg {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                    fill: #333;
                }

                .sidebar a.active svg {
                    fill: #fff;
                }

                .navbar {
                    height: 60px;
                    background: #fff;
                    color: #333;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                    width: calc(100% - 250px);
                    position: fixed;
                    top: 0;
                    right: 0;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    z-index: 1;
                    transition: width 0.3s;
                }

                .navbar .logo {
                    font-size: 24px;
                    font-weight: bold;
                    color: #00b5ee;
                    font-family: 'Montserrat', sans-serif;
                }

                .navbar .search-bar {
                    flex: 1;
                    margin: 0 20px;
                }

                .navbar .search-bar input {
                    width: 100%;
                    padding: 8px;
                    border: none;
                    border-radius: 4px;
                    background: #f4f7fa;
                }

                .navbar .user-info {
                    display: flex;
                    align-items: center;
                }

                .navbar .user-info .user-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #f4f7fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                }

                .navbar .user-info .user-icon svg {
                    width: 24px;
                    height: 24px;
                    fill: #333;
                }

                .navbar .user-info .user-details {
                    display: flex;
                    flex-direction: column;
                }

                .navbar .user-info .user-details .username {
                    font-weight: bold;
                }

                .navbar .user-info .user-details .role {
                    font-size: 12px;
                    color: #888;
                }

                .navbar .logout-btn {
                    margin-left: 20px;
                    padding: 8px 16px;
                    background: linear-gradient(135deg, #00b5ee, #2575fc);
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .navbar .logout-btn:hover {
                    background: linear-gradient(135deg, #0056b3, #003f7f);
                }

                .navbar .date {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                    font-size: 14px;
                    color: #888;
                }

                .navbar .date svg {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    fill: #888;
                }

                .dashboard-layout {
                    display: flex!important;
                }
                .content {
                    width: 100%;
                    margin-top: 60px;
                    padding: 20px;
                }

                @media (max-width: 768px) {
                    .sidebar {
                        width: 200px;
                    }

                    .navbar {
                        width: calc(100% - 200px);
                    }
                }

                @media (max-width: 480px) {
                    .sidebar {
                        width: 100%;
                        height: auto;
                        position: relative;
                        padding: 10px;
                    }

                    .navbar {
                        width: 100%;
                        position: relative;
                        padding: 10px;
                    }

                    .content {
                        padding: 10px;
                    }
                }

                .auth-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .auth-loader .spinner {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 3px solid rgba(0, 0, 0, 0.1);
                    border-top-color: #2575fc;
                    animation: spin 1s infinite linear;
                }
            </style>
            <div class="dashboard-layout">
                <div class="sidebar">
                    <img src="./images/logo.png" alt="Logo" style="width: 100%; margin-bottom: 30px;">
                    <a href="dashboard.html" class="sidebar-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                        Dashboard
                    </a>
                    <a href="uploadForm.html" class="sidebar-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                        Forms
                    </a>
                    <a href="signup.html" class="sidebar-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        Create User
                    </a>
                    <a href="userList.html" class="sidebar-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                        User Listing
                    </a>
                </div>
                <div class="navbar">
                    <div class="logo">Dashboard</div>
                    <div class="search-bar">
                        <input type="text" placeholder="Search...">
                    </div>
                    <div class="date">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
                        <span id="current-date"></span>
                    </div>
                    <div class="user-info">
                        <div class="user-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                        </div>
                        <div class="user-details">
                            <span class="username"></span>
                            <span class="role">Administrator</span>
                        </div>
                    </div>
                    <button class="logout-btn">Logout</button>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
            <div id="authLoader" class="auth-loader">
                <div class="spinner"></div>
            </div>
        `;

        // Get the current page URL
        const currentPage = window.location.href;

        // Find the sidebar item corresponding to the current page and add the "active" class
        const sidebarItems = this.shadowRoot.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            const href = item.getAttribute('href');
            if (
                (href === 'dashboard.html' && currentPage.includes('dashboard.html')) ||
                (href === 'uploadForm.html' && currentPage.includes('uploadForm.html')) ||
                (href === 'signup.html' && currentPage.includes('signup.html')) ||
                (href === 'userList.html' && currentPage.includes('userList.html'))
            ) {
                item.classList.add('active');
            }
        });

        // Update current date
        const currentDate = new Date().toLocaleDateString();
        this.shadowRoot.getElementById('current-date').textContent = currentDate;

        // Retrieve and display user info
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo) {
            const usernameElement = this.shadowRoot.querySelector('.username');
            usernameElement.textContent = `${userInfo.firstName} ${userInfo.lastName}`;
            
            const roleElement = this.shadowRoot.querySelector('.role');
            roleElement.textContent = `${userInfo.firstName} ${userInfo.lastName}`;
        }

        // Logout functionality
        const logoutBtn = this.shadowRoot.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';
        });

        // Check authentication
        this.checkAuthentication();
    }

    checkAuthentication() {
        const authToken = localStorage.getItem('authToken');
        const authLoader = this.shadowRoot.getElementById('authLoader');
        if (!authToken) {
            window.location.href = 'login.html';
        } else {
            authLoader.style.display = 'none';
        }
    }
}

customElements.define('dashboard-layout', DashboardLayout);
